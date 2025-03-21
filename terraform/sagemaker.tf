resource "aws_iam_role" "sagemaker_role" {
  name = "SageMakerExecutionRoleNew"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "sagemaker.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "sagemaker_full_access" {
  role       = aws_iam_role.sagemaker_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSageMakerFullAccess"
}

resource "aws_iam_role_policy_attachment" "sagemaker_cloudwatch_logging" {
  role       = aws_iam_role.sagemaker_role.name
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchLogsFullAccess"
}

resource "aws_sagemaker_model" "flask_model" {
  name               = "Flask-Sagemaker-Model"
  execution_role_arn = aws_iam_role.sagemaker_role.arn

  primary_container {
    image = "722377226063.dkr.ecr.eu-central-1.amazonaws.com/flask-sagemaker-model:latest"
    mode  = "SingleModel"

    environment = {
      SAGEMAKER_CONTAINER_PORT = "8081"
    }
  }
}

resource "aws_sagemaker_endpoint_configuration" "flask_endpoint_config" {
  name = "Flask-Sagemaker-Endpoint-Config"

  production_variants {
    variant_name           = "PrimaryVariant"
    model_name             = aws_sagemaker_model.flask_model.name
    instance_type          = "ml.m5.large"
    initial_instance_count = 1
  }

  data_capture_config {
    enable_capture  = true
    destination_s3_uri = "s3://your-sagemaker-logs-bucket/"
    initial_sampling_percentage = 100

    capture_options {
      capture_mode = "Input"
    }

    capture_options {
      capture_mode = "Output"
    }
  }
}

resource "aws_sagemaker_endpoint" "flask_endpoint" {
  name = "Flask-Sagemaker-Endpoint"
  endpoint_config_name = aws_sagemaker_endpoint_configuration.flask_endpoint_config.name
}
