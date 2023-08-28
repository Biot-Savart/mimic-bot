// import { OpenAiClientService } from '../mimic-bot/services/openAiClient.service';

import { OpenAiClientService } from '../mimic-bot/services/openAiClient.service';
import { BaseCommand, IOptionResponse } from './base.command';

interface ClearBehaviorCommandArguments {
  args: IOptionResponse[];
  client: OpenAiClientService;
  channelId: string;
}

export class ClearBehaviorCommand extends BaseCommand<ClearBehaviorCommandArguments> {
  constructor() {
    super({
      name: 'clear_behavior',
      description: 'Clear Behavior of bot',
      options: [],
    });
  }

  async execute(input: ClearBehaviorCommandArguments): Promise<string> {
    input.client.clearSystemMessages(input.channelId);
    return `Behavior cleared`;
  }
}
