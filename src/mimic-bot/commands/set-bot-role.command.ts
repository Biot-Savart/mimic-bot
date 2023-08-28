// import { OpenAiClientService } from '../mimic-bot/services/openAiClient.service';

import { OpenAiClientService } from '../mimic-bot/services/openAiClient.service';
import { BaseCommand, IOptionResponse } from './base.command';

interface SetBehaviorCommandArguments {
  args: IOptionResponse[];
  client: OpenAiClientService;
}

export class SetBehaviorCommand extends BaseCommand<SetBehaviorCommandArguments> {
  constructor() {
    super({
      name: 'behavior',
      description:
        'Used to provide high-level instructions or context-setting messages to the Bot',
      options: [
        {
          name: 'behavior',
          type: 3,
          description: `Help guide the assistant's behavior in the conversation`,
          required: true,
        },
      ],
    });
  }

  async execute(input: SetBehaviorCommandArguments): Promise<string> {
    input.client.setSystemMessage(input.args[0].value as string);
    return `Behavior set: ${input.args[0].value}`;
  }
}
