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
  //private conversations: ConversationMessage[] = [];
  private conversations: Record<number, ConversationMessage[]> = {};

  constructor(private readonly configService: ConfigService) {
    const configuration = new Configuration({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
    this.openai = new OpenAIApi(configuration);
  }

  async generateResponse(prompt: string, channelId: string): Promise<string> {
    try {
      if (!this.conversations[channelId]) this.conversations[channelId] = [];

      this.conversations[channelId].push({ role: 'user', content: prompt });
      //this.conversations.push({ role: 'user', content: prompt });
      console.log(this.conversations);
      const completion = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 0.6,
        messages: this.conversations[channelId],
      });

      const result = completion.data.choices[0].message.content.trim();
      //this.conversations.push({ role: 'assistant', content: result });
      this.conversations[channelId].push({
        role: 'assistant',
        content: result,
      });
      this.trimConversation(channelId);
      return result;
    } catch (error) {
      console.error('Error with OpenAI API:', error.message);
      throw error;
    }
  }

  setSystemMessage(channelId: string, message: string): void {
    if (!this.conversations[channelId]) this.conversations[channelId] = [];
    this.conversations[channelId].push({
      role: 'system',
      content: message,
    });
  }

  clearSystemMessages(channelId: string): void {
    if (!this.conversations[channelId]) this.conversations[channelId] = [];
    this.conversations[channelId] = this.conversations[channelId].filter(
      (m) => m.role !== 'system',
    );
  }

  clearConversation(channelId: string): void {
    this.conversations[channelId] = [];
  }

  trimConversation(channelId: string, maxConversationLength = 20): void {
    if (!this.conversations[channelId]) this.conversations[channelId] = [];

    const systemMessages = this.conversations[channelId]
      .filter((m) => m.role === 'system')
      .filter(
        (value, index, self) =>
          self.findIndex((obj) => obj.content === value.content) === index,
      );
    this.conversations[channelId] = [
      ...systemMessages,
      ...this.conversations[channelId].slice(-maxConversationLength),
    ];
  }
}
