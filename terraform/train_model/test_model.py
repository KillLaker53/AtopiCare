import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
import os

<<<<<<< HEAD
model = tf.keras.models.load_model("best_model.h5") 

image_path = "test_image.jpg"

class_labels = ["1", "2", "3", "4", "5"] 
=======
model = tf.keras.models.load_model("best_resnet_model.h5") 

image_path = "test_jpg/IMG_5744.jpg"

class_labels = ["1", "2", "3", "4", "5", "6"] 
>>>>>>> dcc418dbe7d0e116c8df53d4177c1786160860cc

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

<<<<<<< HEAD
print(f"🔍 Предсказана категория: {class_labels[predicted_class]} ({confidence * 100:.2f}% увереност)")
=======
print(f"Predicted category: {class_labels[predicted_class]} ({confidence * 100:.2f}% confidence)")
>>>>>>> dcc418dbe7d0e116c8df53d4177c1786160860cc
