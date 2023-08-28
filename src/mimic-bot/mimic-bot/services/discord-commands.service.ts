// src/discord/commands/commands.service.ts

import { Injectable } from '@nestjs/common';
import {
  BaseCommand,
  IOptionResponse,
} from 'src/mimic-bot/commands/base.command';
import { PingCommand } from 'src/mimic-bot/commands/ping.command';
import { SetBehaviorCommand } from 'src/mimic-bot/commands/set-bot-role.command';
import { OpenAiClientService } from './openAiClient.service';

@Injectable()
export class CommandsService {
  private commands: BaseCommand<any>[] = [
    new PingCommand(),
    new SetBehaviorCommand(),
  ]; // Add more commands here

  constructor(private readonly openAiClientService: OpenAiClientService) {}

  async executeCommand(
    commandName: string,
    args: IOptionResponse[],
  ): Promise<string | null> {
    const command = this.commands.find((cmd) => cmd.name === commandName);

    if (command) {
      return await command.execute({ args, client: this.openAiClientService });
    }

    return null;
  }

  getCommandList(): BaseCommand<any>[] {
    return this.commands;
  }
}
