import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
import os

model = tf.keras.models.load_model("best_resnet_model.h5") 

image_path = "test_jpg/IMG_5744.jpg"

class_labels = ["1", "2", "3", "4", "5", "6"] 

def preprocess_image(image_path):
    img = image.load_img(image_path, target_size=(224, 224)) 
    img_array = image.img_to_array(img) 
    img_array = np.expand_dims(img_array, axis=0)  
    img_array = img_array / 255.0 
    return img_array

img_array = preprocess_image(image_path)
predictions = model.predict(img_array)

predicted_class = np.argmax(predictions) 
confidence = np.max(predictions) 

print(f"Predicted category: {class_labels[predicted_class]} ({confidence * 100:.2f}% confidence)")
