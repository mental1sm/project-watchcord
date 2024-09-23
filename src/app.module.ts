import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { BotModule } from './bot/bot.module';
import * as process from "node:process";
import { BotController } from './bot/bot.controller';
import { GuildModule } from './guild/guild.module';
import { ChannelModule } from './channel/channel.module';


@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot({
          type: 'sqlite',
          database: process.env.DATABASE_NAME,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: (process.env.DB_SYNCHRONIZE === 'true'),
      }),
      BotModule,
      GuildModule,
      ChannelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
