from flask import Flask, jsonify, request
from deepface import DeepFace
import base64
import cv2
import numpy as np
from llama import llama3
import uuid
import json
from flask_cors import CORS
from PIL import Image
import io
from io import BytesIO
import os

app = Flask(__name__)
CORS(app)


class Employee:
    def __init__(self, name, age, gender, race, emotion):
        self.id = uuid.uuid4()
        self.name = name
        self.age = age
        self.gender = gender
        self.race = race
        self.emotion = emotion


class Boss:
    def __init__(self, name, age, distance, id = None, number = 0, bio = "", emotion="neutral", location="Unknown"):
        if id is not None:
            self.id = id
        else:
            print("new boss id auto gen")
            self.id = uuid.uuid4()
        self.name = name
        self.age = age
        self.distance = distance
        self.number = number
        self.bio = bio
        self.emotion = emotion
        self.location = location


employee_data = []
boss_data = []
@app.route('/')
def home():
    return jsonify(message="Hello, World!")

@app.route('/bosses')
def get_boss_all():
    rtv = []
    # open the file at resource/{boss.id}/image.jpg for image
    
    for boss in boss_data:
        image_path = f"resource/{boss.id}/image.png"
        # open image and encode 64
        # check if the file exists
        if not os.path.exists(image_path):
            continue
        with open(image_path, "rb") as f:
            encoded_image = base64.b64encode(f.read()).decode("utf-8")

        rtv.append({
            "id": boss.id,
            "name": boss.name,
            "age": boss.age,
            "distance": boss.distance,
            "number": boss.number,
            "bio": boss.bio,
            "emotion": boss.emotion,
            "location": boss.location,
            "image": f"data:image/jpeg;base64,{encoded_image}"
        })
    return jsonify(rtv)
@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()


    if 'image' not in data:
        return jsonify(error="No image data provided"), 400
    # this is a base64 encoded image
    name = data['name']
    role = data['role']
    image_data = data['image'].split(",")[1]
    
    # convert the base64 encoded image to a numpy array then to opencv image
    file = open("temp_image.jpg", "wb")
    file.write(base64.b64decode(image_data))
    file.close()

    try:
        analysis = DeepFace.analyze(img_path="temp_image.jpg", actions=['age', 'gender', 'race', 'emotion'], enforce_detection=False)
        race = analysis[0]["dominant_race"]
        age = analysis[0]["age"]
        emotion = analysis[0]["dominant_emotion"]
        gender = analysis[0]['dominant_gender']
        prompt = f"My name is {name}. I am {age} years old. My emotion is {emotion}. My job is {role}. I am {race} {gender}. make up me a short around 20 words funny bio. Just give me the bio without any other sentences."
        x = llama3(prompt) 
        json_data = {
            "bio": x,
            "emotion": emotion
        }
        return jsonify(json_data)
    except Exception as e:
        print(e)
        return jsonify(error=str(e)), 500


@app.route('/add_boss', methods=['POST'])
def add_boss():
    data = request.get_json()

    if 'image' not in data:
        return jsonify(error="No image data provided"), 400

    name = data['name']
    age = data['age']
    distance = data['distance']
    bio = data['bio']
    location = data['location']
    image_data = data['image'].split(",")[1]

    # id gen based on the biggest id + 1 in resource

    for x in os.listdir("resource"):
        if not os.path.isdir(f"resource/{x}"):
            continue
        id = max(id, int(x))
    id += 1

    # create the folder
    os.makedirs(f"resource/{id}")
    # save the image
    file = open(f"resource/{id}/image.png", "wb")
    file.write(base64.b64decode(image_data))
    file.close()


    # emotion analysis
    try:
        analysis = DeepFace.analyze(img_path=f"resource/{id}/image.png", actions =['emotion'], enforce_detection=False)
        emotion = analysis[0]["emotion"]
    except Exception as e:
        print(e)
        emotion = "neutral"
        
    # write the json file
    with open(f"resource/{id}/profile.json", "w") as f:
        json.dump({
            "name": name,
            "age": age,
            "distance": distance,
            "bio": bio,
            "id": id,
            "emotion": emotion,
            "number" : 0,
            "location": location
        }, f)
    # create a new boss object
    boss = Boss(name=name, age=age, distance=distance, bio=bio, id=id, location=location, emotion=emotion)
    boss_data.append(boss)



@app.route('/swipe_boss', methods=['POST'])
def swipe_boss():
    data = request.get_json()
    if 'boss_id' not in data:
        return jsonify(error="No boss_id provided"), 400
    boss_id = data['boss_id']
    direction = data["direction"]
    if direction == "left":
        return jsonify(success=False), 200
    
    for boss in boss_data:
        if str(boss.id) == str(boss_id):
            boss.number += 1
            # save the number to the file, open resource/{boss_id}/profile.json and update the number
            with open(f"resource/{boss_id}/profile.json", "r") as f:
                data = json.load(f)
                data["number"] = boss.number
            with open(f"resource/{boss_id}/profile.json", "w") as f:
                json.dump(data, f)
    # 50% 50% chance to success. Always 200, but json will return a boolean
    if np.random.rand() > 0.5:
        return jsonify(success=True), 200
    else:
        return jsonify(success=False), 200


@app.route('/scoreboard_boss')
def scoreboard_boss():
    rtv = []
    for boss in boss_data:
        image_path = f"resource/{boss.id}/image.png"
        # open image and encode 64
        # check if the file exists
        if not os.path.exists(image_path):
            continue
        with open(image_path, "rb") as f:
            encoded_image = base64.b64encode(f.read()).decode("utf-8")

        rtv.append({
            "name": boss.name,
            "number": boss.number,
            "image": f"data:image/jpeg;base64,{encoded_image}"

        })
        # sort the list by number
        rtv = sorted(rtv, key=lambda x: x["number"], reverse=True)
    return jsonify(rtv)
if __name__ == '__main__':
    # loads up the boss data
    # list all dir in resource
    for boss_id in os.listdir("resource"):
        if not os.path.isdir(f"resource/{boss_id}"):
            continue
        
        with open(f"resource/{boss_id}/profile.json", "r") as f:
            data = json.load(f)

            boss_data.append(Boss(name=data["name"], age=data["age"], distance=data["distance"], id=boss_id, bio=data["bio"], emotion=data.get("emotion", "neutral"), location=data.get("location"), number=data.get("number", 0)))

    app.run(debug=True, port = 3456)



