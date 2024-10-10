import { DynamicModule, Module } from '@nestjs/common';
import { AceBase } from 'acebase';
import { BotRepository } from './bot.repository';
import { runAcebase } from './acebase.start';
import { UserRepository } from './user.repository';
import { GuildRepository } from './guild.repository';
import { MemberRepository } from './member.repository';
import { ChannelRepository } from './channel.repository';
import { MessageRepository } from './message.repository';

@Module({})
export class InfrastructureModule {
  static register(databaseName: string): DynamicModule {
    const acebaseProvider = {
      provide: 'ACEBASE_DB',
      useFactory: async () =>  {
        return runAcebase(databaseName);
      }
    };

    return {
      module: InfrastructureModule,
      providers: [acebaseProvider, BotRepository, UserRepository, GuildRepository, MemberRepository, ChannelRepository, MessageRepository],
      exports: [acebaseProvider, BotRepository, UserRepository, GuildRepository, MemberRepository, ChannelRepository, MessageRepository]
    }
  }
}