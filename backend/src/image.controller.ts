import { Controller, Post, UseInterceptors, UploadedFile, Body, BadRequestException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { ImageService } from "./image.service";
import { AnalysisService } from "./analysis.service";
import { classificationDescriptions } from "./constants/classification-descriptions"; // Import classification data


@Controller("image")
export class ImageController {
  constructor(
    private readonly imageService: ImageService,
    private readonly analysisService: AnalysisService
  ) {}

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, callback) => {
          const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "");
          callback(null, `${timestamp}${extname(file.originalname)}`);
        },
      }),
    })
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { userId: number }
  ) {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }

    console.log("📂 Received file:", file.filename);

    // Send image to SageMaker for classification
    const result = await this.imageService.classifyImage(file.path);
    const classificationData = classificationDescriptions[result.classification] || {
      name: "Unknown",
      tip: "Consult a doctor for accurate diagnosis.",
    };


    // Save analysis in PostgreSQL
    const analysis = await this.analysisService.createAnalysis(
      body.userId,
      classificationData.name, // Classification Name
      classificationData.tip, // Detailed Tip
    );

    return { filename: file.filename, classification: result, analysis };
  }
}
