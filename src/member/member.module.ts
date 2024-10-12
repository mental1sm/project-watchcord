import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { DiscordClientModule } from '../discord_client/discord.client.module';
import { BotModule } from '../bot/bot.module';
import { BotContextMiddleware } from '../bot/bot.middleware';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { MemberRepository } from '../infrastructure/member.repository';

@Module({
  imports: [
    InfrastructureModule.register("default"),
    DiscordClientModule,
    BotModule
  ],
  exports: [MemberService],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
})
export class MemberModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BotContextMiddleware).forRoutes(MemberController);
  }
}
