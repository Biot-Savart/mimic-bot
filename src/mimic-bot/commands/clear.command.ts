// import { OpenAiClientService } from '../mimic-bot/services/openAiClient.service';

import { OpenAiClientService } from '../mimic-bot/services/openAiClient.service';
import { BaseCommand, IOptionResponse } from './base.command';

interface ClearCommandArguments {
  args: IOptionResponse[];
  client: OpenAiClientService;
  channelId: string;
}

export class ClearCommand extends BaseCommand<ClearCommandArguments> {
  constructor() {
    super({
      name: 'clear_all',
      description: 'Clear All commands',
      options: [],
    });
  }

  async execute(input: ClearCommandArguments): Promise<string> {
    input.client.clearConversation(input.channelId);
    return `Commands cleared`;
  }
}
