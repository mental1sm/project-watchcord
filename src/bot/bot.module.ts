import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { Bot } from './entities/bot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscordClientModule } from '../discord_client/discord.client.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bot]), DiscordClientModule],
  exports: [BotService],
  controllers: [BotController],
  providers: [BotService],
})
export class BotModule {}
