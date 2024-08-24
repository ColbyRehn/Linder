from flask import Flask, jsonify, request
from deepface import DeepFace
import base64
import cv2
import numpy as np
from llama import llama3
import uuid
import json

app = Flask(__name__)


employee_data = []
boss_data = []
@app.route('/')
def home():
    return jsonify(message="Hello, World!")

@app.route('/analyze', methods=['POST'])
def analyze_image():
    data = request.get_json()
    if 'image' not in data:
        return jsonify(error="No image data provided"), 400
    
    
    image_data = data['image']
    name = data.get('name')
    role = data.get('role')
    try:
        # Decode the base64 image data
        image_bytes = base64.b64decode(image_data)
        
        # Convert the image bytes to a 2D array
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Analyze the image using DeepFace
        analysis = DeepFace.analyze(img, actions=['age', 'gender', 'race', 'emotion'])
        race = analysis[0]["race"]
        age = analysis[0]["age"]
        emotion = analysis[0]["emotion"]
        gender = analysis[0]['gender']
        prompt = f"My name is {name}. I am {age} years old. My emotion is {emotion}. My job is {role}. I am {race} {gender}. make up me a short around 20 words funny bio. Just give me the bio without any other information."
        return llama3(prompt)
    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(debug=True)


class Employee:
    def __init__(self, name, age, gender, race, emotion):
        self.id = uuid.uuid4()
        self.name = name
        self.age = age
        self.gender = gender
        self.race = race
        self.emotion = emotion


class boss:
    def __init__(self, name, age, distance,image, id = None):
        if id is not None:
            self.id = id
        else:
            self.id = uuid.uuid4()
        self.name = name
        self.age = age
        self.distance = distance
        self.image = image
        self.number = 0



