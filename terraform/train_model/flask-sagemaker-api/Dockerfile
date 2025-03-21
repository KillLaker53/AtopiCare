# Use Python 3.9 slim image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy application files
COPY app.py . 

# Copy the converted `.h5` model
COPY best_resnet_model.h5 /app/best_resnet_model.h5

# Set environment variables to suppress TensorFlow warnings
ENV TF_ENABLE_ONEDNN_OPTS=0
ENV CUDA_VISIBLE_DEVICES=-1
ENV FLASK_ENV=production

# Install dependencies
RUN pip install --no-cache-dir flask pillow numpy tensorflow

# Expose port 8081 for Flask
EXPOSE 8080

# Run Flask app directly
ENTRYPOINT ["python", "app.py"]
