import cv2
import torch
from PIL import Image

# Model
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')

# Images
img1 = Image.open('dog.jpg')  # PIL image

imgs = [img1]
# Inference
results = model(imgs, size=640)  # includes NMS

# Results
results.print()  
results.save()  # or .show()

results.xyxy[0]  # img1 predictions (tensor)
results.pandas().xyxy[0]  # img1 predictions (pandas)

