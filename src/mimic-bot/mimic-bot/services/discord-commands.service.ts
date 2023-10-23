import { Injectable } from '@nestjs/common';
import {
  BaseCommand,
  IOptionResponse,
} from 'src/mimic-bot/commands/base.command';
import { ClearBehaviorCommand } from 'src/mimic-bot/commands/clear-behavior.command';
import { ClearCommand } from 'src/mimic-bot/commands/clear.command';
import { GenerateImageCommand } from 'src/mimic-bot/commands/generate-image.command';
import { JokeCommand } from 'src/mimic-bot/commands/joke.command';
import { PingCommand } from 'src/mimic-bot/commands/ping.command';
import { QuoteCommand } from 'src/mimic-bot/commands/quote.command';
import { SetBehaviorCommand } from 'src/mimic-bot/commands/set-behavior.command';
import { TriviaCommand } from 'src/mimic-bot/commands/trivia.command';
import { WebsocketGateway } from '../../../websocket/websocket.gateway';
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
    new GenerateImageCommand(),
  ];

  constructor(
    private readonly openAiClientService: OpenAiClientService,
    private websocketGateway: WebsocketGateway,
  ) {}

  async executeCommand(
    channelId: string,
    commandName: string,
    args: IOptionResponse[],
    user: string,
  ): Promise<string | null> {
    try {
      const command = this.commands.find((cmd) => cmd.name === commandName);

      if (command) {
        const result = await command.execute({
          channelId,
          args,
          client: this.openAiClientService,
          user,
        });

        this.websocketGateway.emitMessage('command', {
          request: `Command: ${commandName} with args: ${JSON.stringify(
            args,
          )} received from ${user}`,
          response: result,
        });

        return result;
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
