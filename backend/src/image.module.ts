import { Module } from "@nestjs/common";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";
import { MulterModule } from "@nestjs/platform-express";
import { AnalysisModule } from "./analysis.module"; // ✅ Import RecordModule

@Module({
  imports: [
    AnalysisModule, // ✅ Import RecordModule so ImageModule can use RecordService
    MulterModule.register({
      dest: "./uploads",
    }),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
