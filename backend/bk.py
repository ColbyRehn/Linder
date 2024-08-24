from flask import Flask, jsonify, request
from deepface import DeepFace
import base64
import cv2
import numpy as np

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify(message="Hello, World!")

@app.route('/analyze', methods=['POST'])
def analyze_image():
    data = request.get_json()
    if 'image' not in data:
        return jsonify(error="No image data provided"), 400
    
    image_data = data['image']
    try:
        # Decode the base64 image data
        image_bytes = base64.b64decode(image_data)
        
        # Convert the image bytes to a 2D array
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Analyze the image using DeepFace
        analysis = DeepFace.analyze(img, actions=['age', 'gender', 'race', 'emotion'])
        return jsonify(analysis)
    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(debug=True)
