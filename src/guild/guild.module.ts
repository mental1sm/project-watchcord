import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GuildService } from './guild.service';
import { GuildController } from './guild.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guild } from './entities/guild.entity';
import { DiscordClientModule } from '../discord_client/discord.client.module';
import { BotModule } from '../bot/bot.module';
import { BotContextMiddleware } from '../bot/bot.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Guild]), DiscordClientModule, BotModule],
  exports: [GuildService],
  controllers: [GuildController],
  providers: [GuildService],
})
export class GuildModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BotContextMiddleware).forRoutes(GuildController);
  }
}
