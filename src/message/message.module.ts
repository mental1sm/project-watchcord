import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { BotModule } from 'src/bot/bot.module';
import { DiscordClientModule } from '../discord_client/discord.client.module';
import { BotContextMiddleware } from '../bot/bot.middleware';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { MessageRepository } from '../infrastructure/message.repository';
import { UserRepository } from '../infrastructure/user.repository';
import { AutomapperModule } from '@automapper/nestjs';
import { MessageProfile } from './message.mapper';

@Module({
  imports: [
    InfrastructureModule.register("default"),
    BotModule,
    DiscordClientModule,
    AutomapperModule
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository, UserRepository, MessageProfile],
})
export class MessageModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BotContextMiddleware).forRoutes(MessageController);
  }
}
