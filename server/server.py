from io import BytesIO
import base64
import json
from flask import Flask, request, jsonify
import cv2
import torch
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Model
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')

@app.route('/objDetection', methods=['POST'])
def hello_world():
    myFile = request.files.get('image')
    img1 = Image.open(myFile)
    
    imgs = [img1]
    # Inference
    results = model(imgs, size=640)  # includes NMS
    
    # Results
    results.print()  
    results.render()  # updates results.imgs with boxes and labels

    res_img = results.imgs[0]

    buffered = BytesIO()
    img_base64 = Image.fromarray(res_img)
    img_base64.save(buffered, format="JPEG")
    # print(base64.b64encode(buffered.getvalue()).decode('utf-8'))  # base64 encoded image with results

    results.pandas().xyxy[0]  # img1 predictions (pandas)

    return {
        "image": base64.b64encode(buffered.getvalue()).decode('utf-8'),
        "coor": results.pandas().xyxy[0].to_dict()
    }

if __name__ == '__main__':
    app.run()

