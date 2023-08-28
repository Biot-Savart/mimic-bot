/* eslint-disable @typescript-eslint/no-unused-vars */

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

interface CommandOptions<T> {
  name: string;
  description: string;
  options: IOptionRequest[];
}

export abstract class BaseCommand<T> {
  name: string;
  description: string;
  options: IOptionRequest[];

  constructor(options: CommandOptions<T>) {
    this.name = options.name;
    this.description = options.description;
    this.options = options.options.map((option) => ({ ...option }));
  }

  async execute(input: T): Promise<string> {
    throw new Error('execute method must be overridden in subclasses');
  }
}
