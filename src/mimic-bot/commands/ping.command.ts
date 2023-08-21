export interface IOptionRequest {
  name: string;
  type: number;
  description: string;
  required?: boolean;
  choices?: { name: string; value: string }[];
}

export interface IOptionResponse {
  name: string;
  type: number;
  value?: string | number | boolean;
}

export interface Command {
  name: string;
  description: string;
  options: IOptionRequest[];
  execute: (args: IOptionResponse[]) => Promise<string>;
}

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
