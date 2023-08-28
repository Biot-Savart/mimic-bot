import { BaseCommand, IOptionResponse } from './base.command';

interface PingCommandArguments {
  args: IOptionResponse[];
}

export class PingCommand extends BaseCommand<PingCommandArguments> {
  constructor() {
    super({
      name: 'ping',
      description: 'Ping!',
      options: [
        {
          name: 'name',
          type: 3,
          description: 'Name of the animal',
          required: true,
        },
        {
          name: 'animal',
          type: 3,
          description: 'Name to Ping',
          required: true,
          choices: [
            { name: 'Cat', value: 'cat' },
            { name: 'Dog', value: 'dog' },
          ],
        },
      ],
    });
  }

  async execute(input: PingCommandArguments): Promise<string> {
    return `${input.args[0].value} is a ${input.args[1].value}`;
  }
}
