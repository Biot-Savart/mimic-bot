// src/discord/commands/commands.service.ts

import { Injectable } from '@nestjs/common';
import {
  BaseCommand,
  IOptionResponse,
} from 'src/mimic-bot/commands/base.command';
import { ClearBehaviorCommand } from 'src/mimic-bot/commands/clear-behavior.command';
import { ClearCommand } from 'src/mimic-bot/commands/clear.command';
import { PingCommand } from 'src/mimic-bot/commands/ping.command';
import { SetBehaviorCommand } from 'src/mimic-bot/commands/set-behavior.command';
import { OpenAiClientService } from './openAiClient.service';

@Injectable()
export class CommandsService {
  private commands: BaseCommand<any>[] = [
    new PingCommand(),
    new SetBehaviorCommand(),
    new ClearCommand(),
    new ClearBehaviorCommand(),
  ]; // Add more commands here

  constructor(private readonly openAiClientService: OpenAiClientService) {}

  async executeCommand(
    channelId: string,
    commandName: string,
    args: IOptionResponse[],
  ): Promise<string | null> {
    const command = this.commands.find((cmd) => cmd.name === commandName);

    if (command) {
      return await command.execute({
        channelId,
        args,
        client: this.openAiClientService,
      });
    }

    return null;
  }

  getCommandList(): BaseCommand<any>[] {
    return this.commands;
  }
}
