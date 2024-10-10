import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { DiscordClientModule } from '../discord_client/discord.client.module';
import { BotModule } from '../bot/bot.module';
import { GuildModule } from '../guild/guild.module';
import { BotContextMiddleware } from '../bot/bot.middleware';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [
    InfrastructureModule.register("main"),
    DiscordClientModule,
    BotModule,
    GuildModule
  ],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BotContextMiddleware).forRoutes(ChannelController);
  }
}
