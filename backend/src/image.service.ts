import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as fs from "fs";
import * as AWS from "aws-sdk";

@Injectable()
export class ImageService {
  private readonly endpointName = "Flask-Sagemaker-Endpoint"; // ✅ Change to your actual SageMaker endpoint
  private readonly region = "eu-central-1"; // ✅ Change to your AWS region

  constructor() {
    AWS.config.update({ region: this.region });
  }

  async classifyImage(imagePath: string): Promise<any> {
    try {
      const sagemakerRuntime = new AWS.SageMakerRuntime();
      const imageBytes = fs.readFileSync(imagePath); // Read image as bytes

      console.log(`📤 Sending image ${imagePath} to SageMaker...`);

      const params = {
        EndpointName: this.endpointName,
        ContentType: "application/octet-stream",
        Body: imageBytes,
      };

      const response = await sagemakerRuntime.invokeEndpoint(params).promise();
      const result = JSON.parse(response.Body.toString("utf-8")); // 🔄 Parse response

      console.log("📥 SageMaker Response:", result);
      return result; // Return classification result
    } catch (error) {
      console.error("❌ Error sending image to SageMaker:", error);
      throw new InternalServerErrorException("SageMaker invocation failed");
    }
  }
}
