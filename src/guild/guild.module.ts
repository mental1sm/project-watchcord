import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GuildService } from './guild.service';
import { GuildController } from './guild.controller';
import { DiscordClientModule } from '../discord_client/discord.client.module';
import { BotModule } from '../bot/bot.module';
import { BotContextMiddleware } from '../bot/bot.middleware';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { BotRepository } from 'src/infrastructure/bot.repository';
import { GuildRepository } from 'src/infrastructure/guild.repository';

@Module({
  imports: [InfrastructureModule.register("default"), DiscordClientModule, BotModule],
  exports: [GuildService],
  controllers: [GuildController],
  providers: [GuildService, BotRepository, GuildRepository],
})
export class GuildModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BotContextMiddleware).forRoutes(GuildController);
  }
}
