import { Command, IOptionResponse } from './set-bot-role.command';

export const PingCommand: Command = {
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
  execute: async (args: IOptionResponse[]) => {
    return `${args[0].value} is a ${args[1].value}`;
  },
};
