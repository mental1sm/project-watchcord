import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { Bot } from './entities/bot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscordClientModule } from '../discord_client/discord.client.module';
import { BotContextInterceptor } from './bot.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([Bot]), DiscordClientModule],
  exports: [BotService, BotContextInterceptor],
  controllers: [BotController],
  providers: [BotService, BotContextInterceptor],
})
export class BotModule {}
