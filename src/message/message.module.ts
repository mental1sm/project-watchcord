import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { BotModule } from 'src/bot/bot.module';
import { DiscordClientModule } from '../discord_client/discord.client.module';
import { BotContextMiddleware } from '../bot/bot.middleware';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { MessageRepository } from '../infrastructure/message.repository';
import { UserRepository } from '../infrastructure/user.repository';

@Module({
  imports: [
    InfrastructureModule.register("main"),
    BotModule,
    DiscordClientModule
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository, UserRepository],
})
export class MessageModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BotContextMiddleware).forRoutes(MessageController);
  }
}
