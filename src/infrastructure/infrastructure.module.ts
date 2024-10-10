import { DynamicModule, Module } from '@nestjs/common';
import { AceBase } from 'acebase';
import { BotRepository } from './bot.repository';

@Module({})
export class InfrastructureModule {
  static register(databaseName: string): DynamicModule {
    const acebaseProvider = {
      provide: 'ACEBASE_DB',
      useFactory: async () =>  {
        const db = new AceBase(databaseName);
        await db.ready();
        return db;
      }
    };

    return {
      module: InfrastructureModule,
      providers: [acebaseProvider, BotRepository],
      exports: [acebaseProvider, BotRepository]
    }
  }
}