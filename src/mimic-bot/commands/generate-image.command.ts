// import { OpenAiClientService } from '../mimic-bot/services/openAiClient.service';

import { OpenAiClientService } from '../mimic-bot/services/openAiClient.service';
import { BaseCommand, IOptionResponse } from './base.command';

interface GenerateImageCommandArguments {
  args: IOptionResponse[];
  client: OpenAiClientService;
}

export class GenerateImageCommand extends BaseCommand<GenerateImageCommandArguments> {
  constructor() {
    super({
      name: 'generate_image',
      description: 'Generates and image',
      options: [
        {
          name: 'prompt',
          type: 3,
          description: `The image prompt`,
          required: true,
        },
      ],
    });
  }

  async execute(input: GenerateImageCommandArguments): Promise<string> {
    const imageUrl = await input.client.generateImage(
      input.args[0].value as string,
    );
    return imageUrl;
  }
}
