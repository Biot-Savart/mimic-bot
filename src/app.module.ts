import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MimicBotModule } from './mimic-bot/mimic-bot.module';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { WebSocketIoAdapter } from './websocket/websocket.io.adapter';

@Module({
  imports: [ConfigModule.forRoot(), MimicBotModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'WS_PORT', // Use a token to specify the WebSocket port
      useValue: 3011, // Specify the port number you want to use
    },
    WebSocketIoAdapter,
    WebsocketGateway,
  ],
})
export class AppModule {}
