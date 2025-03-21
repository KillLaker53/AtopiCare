import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FoodAdvisorService {
    async analyzeData(meal: string, stressLevel: string): Promise<any> {
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant."
                    },
                    {
                        role: "user",
                        content: `Analyze the following meal and stress level for potential triggers, provide a risk score from 0 to 100 for potential health impacts for atopic dermatitis based on this combination:\nMeal: ${meal}\nStress Level: ${stressLevel}.Give only one number as percantage.`
                    }
                ],
                max_tokens: 300,
                temperature: 0.5
            }, {
                headers: {
                    'Authorization': `Bearer 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`
                }
            });

            console.log('OpenAI Response Message:', response.data.choices[0].message);

            const choices = response.data?.choices;
            if (choices && choices.length > 0 && choices[0]?.message?.content) {
                const analysis = choices[0].message.content.trim();
                return this.parseAnalysis(analysis);
            } else {
                throw new Error('Invalid response structure or missing content');
            }

        } catch (error) {
            console.error('Error while analyzing data:', error);
            throw error;
        }
    }

    parseAnalysis(analysis: string): any {
        const riskPercentageMatch = analysis.match(/(\d{1,3})\%/);
        let riskPercentage = 0;

        if (riskPercentageMatch && riskPercentageMatch[1]) {
            riskPercentage = parseInt(riskPercentageMatch[1], 10);
        }

        console.log('Parsed Risk Percentage:', riskPercentage);
        return { riskPercentage };
    }

    async getRealTimeSuggestions(meal: string, stressLevel: string) {
        const analysis = await this.analyzeData(meal, stressLevel);
        return analysis;
    }
}
