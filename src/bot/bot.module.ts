import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { Bot } from './entities/bot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscordClientModule } from '../discord_client/discord.client.module';
import { BotContextInterceptor } from './bot.interceptor';
import { BotContextMiddleware } from './bot.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Bot]), DiscordClientModule],
  exports: [BotService, BotContextMiddleware],
  controllers: [BotController],
  providers: [BotService, BotContextMiddleware],
})
export class BotModule {}
