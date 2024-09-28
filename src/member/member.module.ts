import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { DiscordClientModule } from '../discord_client/discord.client.module';
import { BotModule } from '../bot/bot.module';
import { GuildModule } from '../guild/guild.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    DiscordClientModule,
    BotModule,
    GuildModule,
    UserModule,
  ],
  exports: [MemberService],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
