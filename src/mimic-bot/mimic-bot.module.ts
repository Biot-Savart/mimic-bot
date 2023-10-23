import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { CommandsService } from './mimic-bot/services/discord-commands.service';
import { DiscordClientService } from './mimic-bot/services/discordClient.service';
import { OpenAiClientService } from './mimic-bot/services/openAiClient.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    DiscordClientService,
    OpenAiClientService,
    CommandsService,
    WebsocketGateway,
    {
      provide: 'WS_PORT', // Use a token to specify the WebSocket port
      useValue: 3010, // Specify the port number you want to use
    },
  ],
  exports: [
    DiscordClientService,
    OpenAiClientService,
    CommandsService,
    WebsocketGateway,
  ],
})
export class MimicBotModule {}
