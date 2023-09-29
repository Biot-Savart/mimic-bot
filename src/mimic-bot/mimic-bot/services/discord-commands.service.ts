import { Injectable } from '@nestjs/common';
import {
  BaseCommand,
  IOptionResponse,
} from 'src/mimic-bot/commands/base.command';
import { ClearBehaviorCommand } from 'src/mimic-bot/commands/clear-behavior.command';
import { ClearCommand } from 'src/mimic-bot/commands/clear.command';
import { JokeCommand } from 'src/mimic-bot/commands/joke.command';
import { PingCommand } from 'src/mimic-bot/commands/ping.command';
import { QuoteCommand } from 'src/mimic-bot/commands/quote.command';
import { SetBehaviorCommand } from 'src/mimic-bot/commands/set-behavior.command';
import { TriviaCommand } from 'src/mimic-bot/commands/trivia.command';
import { OpenAiClientService } from './openAiClient.service';

@Injectable()
export class CommandsService {
  private commands: BaseCommand<any>[] = [
    new PingCommand(),
    new SetBehaviorCommand(),
    new ClearCommand(),
    new ClearBehaviorCommand(),
    new TriviaCommand(),
    new JokeCommand(),
    new QuoteCommand(),
  ];

  constructor(private readonly openAiClientService: OpenAiClientService) {}

  async executeCommand(
    channelId: string,
    commandName: string,
    args: IOptionResponse[],
    user: string,
  ): Promise<string | null> {
    try {
      const command = this.commands.find((cmd) => cmd.name === commandName);

      if (command) {
        return await command.execute({
          channelId,
          args,
          client: this.openAiClientService,
          user,
        });
      }
    } catch (error) {
      console.error(error);
      return 'An error occurred while executing the command: ' + error.message;
    }

    return null;
  }

  getCommandList(): BaseCommand<any>[] {
    return this.commands;
  }
}
