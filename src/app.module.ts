import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MimicBotModule } from './mimic-bot/mimic-bot.module';

@Module({
  imports: [ConfigModule.forRoot(), MimicBotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
