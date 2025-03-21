import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Analysis } from "../entity/analysis.entity";

@Injectable()
export class AnalysisService {
  constructor(
    @InjectRepository(Analysis)
    private readonly analysisRepository: Repository<Analysis>
  ) {}

  async createAnalysis(data: { userId: number; classification: string; tip: string; imageUrl: string }) {
    const newAnalysis = this.analysisRepository.create({
      user: { id: data.userId }, 
      classification: data.classification,
      tip: data.tip,
      imageUrl: data.imageUrl, 
    });
    return await this.analysisRepository.save(newAnalysis);
  }
}
