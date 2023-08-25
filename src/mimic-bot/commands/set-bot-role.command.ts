import { OpenAiClientService } from '../mimic-bot/services/openAiClient.service';

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
  execute: (
    args: IOptionResponse[],
    client?: OpenAiClientService,
  ) => Promise<string>;
}

export const SetBotRoleCommand: Command = {
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
  execute: async (args: IOptionResponse[], client: OpenAiClientService) => {
    client.setSystemMessage(args[0].value as string);
    return `${args[0].value} is set`;
  },
};
