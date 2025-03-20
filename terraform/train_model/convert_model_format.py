import os
import tarfile

sagemaker_model_dir = "best_resnet_model"

model.save(sagemaker_model_dir)

with tarfile.open("resnet_sagemaker_model.tar.gz", "w:gz") as tar:
    tar.add(sagemaker_model_dir, arcname=os.path.basename(sagemaker_model_dir))

print("Model saved and archived for SageMaker deployment!")
