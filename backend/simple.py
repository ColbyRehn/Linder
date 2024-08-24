from deepface import DeepFace
import cv2
img = cv2.imread("img.jpg")
objs = DeepFace.analyze(
  img, 
  actions = ['age', 'gender', 'race', 'emotion'],
  detector_backend = "dlib",
  align = True
)
print(objs)