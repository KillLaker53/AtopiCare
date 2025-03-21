import tarfile
import os

source_dir = "sagemaker_model"
tar_path = "resnet_sagemaker_model_fixed.tar.gz"

if os.path.exists(tar_path):
    os.remove(tar_path)

with tarfile.open(tar_path, "w:gz") as tar:
    for item in os.listdir(source_dir):
        tar.add(os.path.join(source_dir, item), arcname=item)