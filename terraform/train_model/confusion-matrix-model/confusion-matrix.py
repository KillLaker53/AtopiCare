import os
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
from tensorflow.keras.preprocessing import image
from sklearn.metrics import confusion_matrix, classification_report

model = tf.keras.models.load_model("best_resnet_model.h5")

class_names = ["1 - Little Inflamed", "2 - Moderate Inflamed", "3 - Inflamed with Infections", 
               "4 - Very Inflamed", "5 - Very Dry & Bleeding", "6 - Healthy Skin"]

IMG_SIZE = (224, 224) 

test_dir = "../atopic-dataset" 

test_images = []
true_labels = []

for label in range(1, 7): 
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

cm = confusion_matrix(true_labels, predicted_labels)

cm_df = pd.DataFrame(cm, index=class_names, columns=class_names)

plt.figure(figsize=(8, 6))
sns.heatmap(cm_df, annot=True, fmt='d', cmap="Blues", linewidths=0.5)
plt.xlabel("Predicted Label")
plt.ylabel("Actual Label")
plt.title("Confusion Matrix for Skin Disease Classification")
plt.show()

print("\nClassification Report:\n")
print(classification_report(true_labels, predicted_labels, target_names=class_names))
