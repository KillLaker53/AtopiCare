import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Analysis } from '../entity/analysis.entity';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectRepository(Analysis)
    private readonly analysisRepository: Repository<Analysis>
  ) {}

  async createAnalysis(data: {
    userId: number;
    classification: string;
    tip: string;
    imageUrl: string;
  }) {
    const analysis = this.analysisRepository.create({
      classification: data.classification,
      tip: data.tip,
      imageUrl: data.imageUrl,
      user: { id: data.userId },
    });

    return await this.analysisRepository.save(analysis);
  }

  async getLastAnalysis() {
    return await this.analysisRepository.findOne({
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });
  }

  async getAllByUser(userId: number) {
    return await this.analysisRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      relations: ['user'],
      select: ['id', 'classification', 'tip', 'imageUrl', 'createdAt'],
    });
  }
}
