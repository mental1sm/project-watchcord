import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { Bot } from './entities/bot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscordClientModule } from '../discord_client/discord.client.module';
import { BotContextInterceptor } from './bot.interceptor';
import { BotContextMiddleware } from './bot.middleware';
import { BotRepository } from '../infrastructure/bot.repository';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@Module({
  imports: [DiscordClientModule, InfrastructureModule.register("default")],
  exports: [BotService, BotContextMiddleware],
  controllers: [BotController],
  providers: [BotService, BotContextMiddleware, BotRepository],
})
export class BotModule {}
