// import { MiddlewareConsumer, Module } from '@nestjs/common';
// import { MessageService } from './message.service';
// import { MessageController } from './message.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Message } from './entities/message.entity';
// import { BotModule } from 'src/bot/bot.module';
// import { DiscordClientModule } from '../discord_client/discord.client.module';
// import { UserModule } from '../user/user.module';
// import { BotContextMiddleware } from '../bot/bot.middleware';
//
// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Message]),
//     BotModule,
//     DiscordClientModule,
//     UserModule,
//   ],
//   controllers: [MessageController],
//   providers: [MessageService],
// })
// export class MessageModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(BotContextMiddleware).forRoutes(MessageController);
//   }
// }
