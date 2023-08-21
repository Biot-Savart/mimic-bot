// src/openai/openai.service.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenAiClientService {
  private readonly openai: OpenAIApi;

  constructor(private readonly configService: ConfigService) {
    const configuration = new Configuration({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
    this.openai = new OpenAIApi(configuration);
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const completion = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 0.6,
        messages: [{ role: 'user', content: prompt }],
      });

      return completion.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error with OpenAI API:', error.message);
      throw error;
    }
  }
}
