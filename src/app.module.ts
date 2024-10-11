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
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';


@Module({
  imports: [
    ConfigModule.forRoot(),
    AutomapperModule.forRoot({
      strategyInitializer: classes()
    }),
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
