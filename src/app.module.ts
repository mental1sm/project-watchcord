import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { GuildModule } from './guild/guild.module';
import { UserModule } from './user/user.module';
import { MemberModule } from './member/member.module';
import { MessageModule } from './message/message.module';
import { ChannelModule } from './channel/channel.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    BotModule,
    GuildModule,
    MemberModule,
    UserModule,
    ChannelModule,
    MessageModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
