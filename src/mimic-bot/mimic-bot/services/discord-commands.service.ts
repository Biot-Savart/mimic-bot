// src/discord/commands/commands.service.ts

import { Injectable } from '@nestjs/common';
import { PingCommand } from 'src/mimic-bot/commands/ping.command';
import {
  Command,
  IOptionResponse,
  SetBotRoleCommand,
} from 'src/mimic-bot/commands/set-bot-role.command';
import { OpenAiClientService } from './openAiClient.service';

@Injectable()
export class CommandsService {
  private commands: Command[] = [PingCommand, SetBotRoleCommand]; // Add more commands here

  constructor(private readonly openAiClientService: OpenAiClientService) {}

  async executeCommand(
    commandName: string,
    args: IOptionResponse[],
  ): Promise<string | null> {
    const command = this.commands.find((cmd) => cmd.name === commandName);

    if (command) {
      return await command.execute(args, this.openAiClientService);
    }

    return null;
  }

  getCommandList(): Command[] {
    return this.commands;
  }
}
