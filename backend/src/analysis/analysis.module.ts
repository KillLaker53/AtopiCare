import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Analysis } from "../entity/analysis.entity";
import { AnalysisService } from "./analysis.service";

@Module({
  imports: [TypeOrmModule.forFeature([Analysis])],
  providers: [AnalysisService],
  exports: [AnalysisService],
})
export class AnalysisModule {}
