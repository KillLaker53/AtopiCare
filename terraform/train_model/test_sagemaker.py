import boto3
import json

ENDPOINT_NAME = "Flask-Sagemaker-Endpoint"
REGION = "eu-central-1"
IMAGE_PATH = "test_jpg/4ta.jpg" 

sagemaker_runtime = boto3.client("sagemaker-runtime", region_name=REGION)

def invoke_sagemaker(image_path):
    """Send an image to SageMaker Endpoint for inference."""
    try:
        with open(image_path, "rb") as image_file:
            image_bytes = image_file.read()

        response = sagemaker_runtime.invoke_endpoint(
            EndpointName=ENDPOINT_NAME,
            ContentType="application/octet-stream",
            Body=image_bytes
        )

        result = json.loads(response["Body"].read().decode("utf-8"))
        print("Prediction:", result)

    except Exception as e:
        print("Error:", str(e))

if __name__ == "__main__":
    invoke_sagemaker(IMAGE_PATH)
