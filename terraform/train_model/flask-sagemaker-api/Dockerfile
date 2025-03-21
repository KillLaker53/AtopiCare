FROM python:3.9-slim

WORKDIR /app

COPY app.py . 

COPY best_resnet_model.h5 /app/best_resnet_model.h5

# Set environment variables to suppress TensorFlow warnings
ENV TF_ENABLE_ONEDNN_OPTS=0
ENV CUDA_VISIBLE_DEVICES=-1
ENV FLASK_ENV=production

RUN pip install --no-cache-dir flask pillow numpy tensorflow

EXPOSE 8080

ENTRYPOINT ["python", "app.py"]
