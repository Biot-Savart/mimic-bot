// src/discord/discord.service.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CacheType,
  Client,
  GatewayIntentBits,
  Interaction,
  Message,
  REST,
  Routes,
} from 'discord.js';
import { CommandsService } from './discord-commands.service';
import { OpenAiClientService } from './openAiClient.service';

@Injectable()
export class DiscordClientService {
  private readonly client: Client;
  private commands = [
    // Define your bot commands here
  ];

  constructor(
    private readonly configService: ConfigService,
    private readonly openAiClientService: OpenAiClientService,
    private readonly commandsService: CommandsService,
  ) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.init();
  }

  private async init() {
    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}!`);
      this.loadCommands();
    });

    this.client.login(this.configService.get<string>('MIMICBOT_TOKEN'));

    this.client.on('messageCreate', async (message) => {
      this.handleMessage(message);
    });

    this.commands = this.commandsService.getCommandList();
    this.loadCommands();

    this.client.on('interactionCreate', async (interaction) => {
      this.handleCommand(interaction);
    });
  }

  private async loadCommands() {
    try {
      const rest = new REST({ version: '10' }).setToken(
        this.configService.get<string>('MIMICBOT_TOKEN'),
      );
      console.log('Started refreshing application (/) commands.');

      rest.put(Routes.applicationCommands('1127924161763885217'), {
        body: this.commands,
      });

      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  }

  private async handleMessage(message: Message<boolean>) {
    try {
      // Check if the message author is a bot to avoid infinite loops
      if (message.author.bot) return;

      // Check for specific commands or triggers
      if (message.content.startsWith('!')) {
        // Extract the user input from the message
        const userInput = message.content.slice('!'.length).trim();
        // Make the API call to generate a response

        const response = await this.openAiClientService.generateResponse(
          userInput,
          message.channelId,
        );

        // Send the generated reply back to the Discord channel
        message.channel.send(response);
      }
    } catch (error) {
      console.error(error);
      await message.channel.send(
        'An error occurred while generating the response: ' + error.message,
      );
    }
  }

  private async handleCommand(interaction: Interaction<CacheType>) {
    if (!interaction.isChatInputCommand() || !interaction.isCommand()) return;

    try {
      const response = await this.commandsService.executeCommand(
        interaction.channelId,
        interaction.commandName,
        [...interaction.options.data],
        interaction.user.username,
      );

      interaction.reply(response);
    } catch (error) {
      console.error(error);
      await interaction.reply(
        'An error occurred while executing the command: ' + error.message,
      );
    }
  }
}
