import os
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
import seaborn as sns
from tensorflow.keras.preprocessing import image
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

model = tf.keras.models.load_model("best_resnet_model.h5") 

class_names = ["Little Inflamed", "Moderate Inflamed", "Inflamed with Infections", 
               "Very Inflamed", "Very Dry & Bleeding", "Healthy Skin"]

IMG_SIZE = (224, 224)  

test_dir = "../atopic-dataset" 
test_images = []
true_labels = []

for label in range(1, 7):  # Folders are named 1, 2, 3, 4, 5, 6
    label_path = os.path.join(test_dir, str(label))

    if os.path.isdir(label_path):
        for img_file in os.listdir(label_path):
            img_path = os.path.join(label_path, img_file)

            img = image.load_img(img_path, target_size=IMG_SIZE)
            img_array = image.img_to_array(img) / 255.0
            test_images.append(img_array)
            true_labels.append(label - 1) 

test_images = np.array(test_images)
true_labels = np.array(true_labels)

predictions = model.predict(test_images)
predicted_labels = np.argmax(predictions, axis=1) 

accuracy = accuracy_score(true_labels, predicted_labels)
precision = precision_score(true_labels, predicted_labels, average=None)
recall = recall_score(true_labels, predicted_labels, average=None)
f1 = f1_score(true_labels, predicted_labels, average=None)

plt.figure(figsize=(10, 6))
plt.bar(class_names, precision * 100, label="Precision", alpha=0.6)
plt.bar(class_names, recall * 100, label="Recall", alpha=0.6)
plt.bar(class_names, f1 * 100, label="F1-Score", alpha=0.6)
plt.axhline(y=accuracy * 100, color="r", linestyle="--", label=f"Overall Accuracy: {accuracy * 100:.2f}%")

plt.ylabel("Percentage (%)")
plt.title("Model Performance Metrics per Category")
plt.legend()
plt.xticks(rotation=20)
plt.show()
