import { DefaultValuePipe, MiddlewareConsumer, Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { DiscordClientModule } from '../discord_client/discord.client.module';
import { BotModule } from '../bot/bot.module';
import { GuildModule } from '../guild/guild.module';
import { BotContextMiddleware } from '../bot/bot.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Channel]),
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
