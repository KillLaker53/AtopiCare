import { Injectable } from '@nestjs/common';
import axios from 'axios';

export class FoodAdvisorService {
  async analyzeData(meal: string, stressLevel: string): Promise<any> {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: `Analyze the following meal and stress level for potential triggers, provide suggestions, and calculate trigger scores:\nMeal: ${meal}\nStress Level: ${stressLevel}\nInclude alternatives and categorize trigger scores as: no chance to trigger, very low, low, medium, risky, very risky, and definitely don't eat.`,
      max_tokens: 300,
      n: 1,
      stop: null,
      temperature: 0.5,
    }, {
      headers: {
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`
      }
    });

    const analysis = response.data.choices[0].text.trim();
    return this.parseAnalysis(analysis);
  }

  parseAnalysis(analysis: string): any {
    const triggers: string[] = [];
    const suggestions: string[] = [];
    const triggerScores: { trigger: string; score: string }[] = [];

    const lines = analysis.split('\n');
    for (const line of lines) {
        if (line.startsWith('Trigger:')) {
            const [trigger, score] = line.replace('Trigger:', '').split('Score:').map(part => part.trim());
            triggers.push(trigger);
            triggerScores.push({ trigger, score });
        } else if (line.startsWith('Suggestion:')) {
            suggestions.push(line.replace('Suggestion:', '').trim());
        }
    }

    return { triggers, suggestions, triggerScores };
  }

  async getRealTimeSuggestions(meal: string, stressLevel: string) {
    const analysis = await this.analyzeData(meal, stressLevel);
    return analysis;
  }
}