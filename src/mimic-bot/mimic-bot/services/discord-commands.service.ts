// src/discord/commands/commands.service.ts

import { Injectable } from '@nestjs/common';
import {
  Command,
  IOptionResponse,
  PingCommand,
} from 'src/mimic-bot/commands/ping.command';

@Injectable()
export class CommandsService {
  private commands: Command[] = [PingCommand]; // Add more commands here

  async executeCommand(
    commandName: string,
    args: IOptionResponse[],
  ): Promise<string | null> {
    const command = this.commands.find((cmd) => cmd.name === commandName);

    if (command) {
      return await command.execute(args);
    }

    return null;
  }

  getCommandList(): Command[] {
    return this.commands;
  }
}
