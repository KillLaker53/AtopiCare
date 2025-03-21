import os
import cv2
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator

dataset_dir = "atopic-dataset"

datagen = ImageDataGenerator(
    rotation_range=40, 
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,  
    zoom_range=0.2, 
    horizontal_flip=True,
    brightness_range=[0.7, 1.3], 
    fill_mode="nearest"  
)


for category in sorted(os.listdir(dataset_dir)):
    category_path = os.path.join(dataset_dir, category)
    if not os.path.isdir(category_path):
        continue  

    print(f"Maintain categories: {category}")


    for filename in os.listdir(category_path):
        file_path = os.path.join(category_path, filename)
        if not filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            continue  

   
        image = cv2.imread(file_path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB) 
        image = np.expand_dims(image, axis=0)  

    
        i = 0
        for batch in datagen.flow(image, batch_size=1):
            new_filename = f"{filename.split('.')[0]}_aug{i}.jpg"
            new_filepath = os.path.join(category_path, new_filename)
            cv2.imwrite(new_filepath, cv2.cvtColor(batch[0], cv2.COLOR_RGB2BGR)) 
            i += 1
            if i >= 5:  
                break

    print(f"Completed for {category}!\n")

print("Dataset succesfully expanded.")
