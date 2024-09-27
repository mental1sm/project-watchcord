import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { BotModule } from 'src/bot/bot.module';
import { MemberModule } from 'src/member/member.module';
import { DiscordClientModule } from '../discord_client/discord.client.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), BotModule, MemberModule, DiscordClientModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
