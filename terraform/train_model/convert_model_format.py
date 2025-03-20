import os
import tarfile
import tensorflow as tf

model = tf.keras.models.load_model("best_resnet_model.h5")

sagemaker_model_dir = "sagemaker_model"
os.makedirs(sagemaker_model_dir, exist_ok=True)

model.save(sagemaker_model_dir)

tar_path = "resnet_sagemaker_model.tar.gz"
with tarfile.open(tar_path, "w:gz") as tar:
    tar.add(sagemaker_model_dir, arcname=os.path.basename(sagemaker_model_dir))

print(f"✅ Model saved and archived as {tar_path} for SageMaker deployment!")
