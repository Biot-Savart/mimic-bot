// src/openai/openai.service.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';

interface ConversationMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}
@Injectable()
export class OpenAiClientService {
  private readonly openai: OpenAIApi;
  private conversation: ConversationMessage[] = [];

  constructor(private readonly configService: ConfigService) {
    const configuration = new Configuration({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
    this.openai = new OpenAIApi(configuration);
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      this.conversation.push({ role: 'user', content: prompt });
      console.log(this.conversation);
      const completion = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 0.6,
        messages: this.conversation,
      });

      const result = completion.data.choices[0].message.content.trim();
      this.conversation.push({ role: 'assistant', content: result });
      this.trimConversation();
      return result;
    } catch (error) {
      console.error('Error with OpenAI API:', error.message);
      throw error;
    }
  }

  setSystemMessage(message: string): void {
    this.conversation.push({
      role: 'system',
      content: message,
    });
  }

  clearConversation(): void {
    this.conversation = [];
  }

  trimConversation(maxConversationLength = 20): void {
    const systemMessages = this.conversation
      .filter((m) => m.role === 'system')
      .filter(
        (value, index, self) =>
          self.findIndex((obj) => obj.content === value.content) === index,
      );
    this.conversation = [
      ...systemMessages,
      ...this.conversation.slice(-maxConversationLength),
    ];
  }
}
