import { Controller, Post, Body } from '@nestjs/common';
import { FoodAdvisorService } from './food_advisor.service';

@Controller('food-advisor')
export class FoodAdvisorController {
  constructor(private readonly foodAdvisorService: FoodAdvisorService) {}

  @Post('/analyze')
  async analyzeData(@Body() body: { meal: string, stressLevel: string }) {
    const { meal, stressLevel } = body;
    const analysis = await this.foodAdvisorService.getRealTimeSuggestions(meal, stressLevel);
    return analysis;
  }
}