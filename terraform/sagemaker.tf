data "aws_caller_identity" "current" {}

# 🎯 S3 Bucket for SageMaker Training Data
resource "aws_s3_bucket" "sagemaker_data_bucket" {
  bucket = "skin-analysis-dataset-bucket"
}

# 🎯 IAM Role for SageMaker
resource "aws_iam_role" "sagemaker_role" {
  name = "SageMakerExecutionRole"

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

# 📌 Attach Permissions for SageMaker
resource "aws_iam_role_policy_attachment" "sagemaker_full_access" {
  role       = aws_iam_role.sagemaker_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSageMakerFullAccess"
}

# 🎯 SageMaker Training Job
resource "aws_sagemaker_training_job" "skin_analysis_training" {
  training_job_name = "skin-analysis-training-job"

  algorithm_specification {
    training_image = "123456789012.dkr.ecr.us-east-1.amazonaws.com/my-image" # Change this to your actual training image
    training_input_mode = "File"
  }

  role_arn = aws_iam_role.sagemaker_role.arn

  input_data_config {
    channel_name = "training"
    data_source {
      s3_data_source {
        s3_uri                  = "s3://${aws_s3_bucket.sagemaker_data_bucket.id}/training-data"
        s3_data_type            = "S3Prefix"
        s3_data_distribution_type = "FullyReplicated"
      }
    }
  }

  output_data_config {
    s3_output_path = "s3://${aws_s3_bucket.sagemaker_data_bucket.id}/output"
  }

  resource_config {
    instance_type  = "ml.m5.large"
    instance_count = 1
    volume_size_in_gb = 10
  }

  stopping_condition {
    max_runtime_in_seconds = 3600
  }

  depends_on = [aws_s3_bucket.sagemaker_data_bucket, aws_iam_role.sagemaker_role]
}
