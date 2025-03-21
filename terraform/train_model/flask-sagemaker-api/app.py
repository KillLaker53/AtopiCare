import os
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from PIL import Image
import io

app = Flask(__name__)

MODEL_PATH = "best_resnet_model.h5"
model = tf.keras.models.load_model(MODEL_PATH)

LABELS_PATH = "labels.txt"
if os.path.exists(LABELS_PATH):
    with open(LABELS_PATH, "r") as f:
        CLASS_LABELS = [line.strip() for line in f.readlines()]
else:
    CLASS_LABELS = [str(i) for i in range(10)] 

@app.route('/ping', methods=['GET'])
def ping():
    """Health check endpoint for SageMaker."""
    return jsonify({"status": "Healthy"}), 200

def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((224, 224))  # Resize for ResNet50V2
    image = np.array(image) / 255.0  # Normalize
    image = np.expand_dims(image, axis=0) 
    return image

@app.route("/invocations", methods=["POST"])
def predict():
    try:
        image_bytes = request.get_data() 
        if not image_bytes:
            return jsonify({"error": "No image uploaded"}), 400

        image = preprocess_image(image_bytes)
        predictions = model.predict(image)

        predicted_class_index = np.argmax(predictions)
        predicted_class_label = CLASS_LABELS[predicted_class_index]
        confidence = float(np.max(predictions))

        return jsonify({
            "classification": predicted_class_label,
            "confidence": confidence
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
