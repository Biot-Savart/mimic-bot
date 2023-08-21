import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommandsService } from './mimic-bot/services/discord-commands.service';
import { DiscordClientService } from './mimic-bot/services/discordClient.service';
import { OpenAiClientService } from './mimic-bot/services/openAiClient.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [DiscordClientService, OpenAiClientService, CommandsService],
  exports: [DiscordClientService, OpenAiClientService, CommandsService],
})
export class MimicBotModule {}
