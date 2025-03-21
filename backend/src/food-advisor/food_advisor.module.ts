import { Module } from '@nestjs/common';
import { Food_advisorController } from './food_advisor.controller';
import { FoodAdvisorService } from './food_advisor.service';

@Module({
    controllers: [Food_advisorController],
    providers: [FoodAdvisorService],
})
export class FoodAdvisorModule {}
