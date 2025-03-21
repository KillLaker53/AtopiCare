import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Body,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { ImageService } from "./image.service";
import { AnalysisService } from "./analysis/analysis.service";
import { classificationDescriptions } from "./constants/classification-descriptions"; 


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
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Body() body: { userId: number }) {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }
    body.userId = 1; 

    console.log("Received file:", file.filename);

    const result = await this.imageService.classifyImage(`uploads/${file.filename}`);

    const classificationDescriptions: { [key: string]: { name: string; tip: string } } = {
      "1": {
        name: "Little Inflamed Skin",
        tip: "Use fragrance-free moisturizer and avoid harsh soaps.",
      },
      "2": {
        name: "Moderate Inflamed Skin",
        tip: "Apply hypoallergenic moisturizer and use cold compresses.",
      },
      "3": {
        name: "Inflamed Skin with Little Infections",
        tip: "Use antiseptic creams, avoid scratching, and keep skin dry.",
      },
      "4": {
        name: "Very Inflamed Skin with Infections and Dryness",
        tip: "Use medicated creams, deep hydrating balms, and seek medical advice.",
      },
      "5": {
        name: "Very Dry Skin with Wounds and Bleeding",
        tip: "Apply thick emollient creams, hydrate, and see a dermatologist.",
      },
      "6": {
        name: "Healthy Skin",
        tip: "Maintain a balanced skincare routine and avoid irritants.",
      },
    };

    const classificationData = classificationDescriptions[result.classification] || {
      name: "Unknown",
      tip: "Consult a doctor for an accurate diagnosis.",
    };

    const imageUrl = `/uploads/${file.filename}`;

    const newAnalysis = await this.analysisService.createAnalysis({
      userId: body.userId,
      classification: classificationData.name, 
      tip: classificationData.tip, 
      imageUrl, 
    });

    return {
      filename: file.filename,
      classification: result,
      analysis: newAnalysis,
    };
  }
}
