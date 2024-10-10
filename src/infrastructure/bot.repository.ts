import { Inject, Injectable } from '@nestjs/common';
import { AceBase } from 'acebase';
import { Bot } from '../bot/entities/bot.entity';

@Injectable()
export class BotRepository {
  constructor(@Inject("ACEBASE_DB") private readonly acebase: AceBase) {}

  async create(bot: Bot) {
    await this.acebase.ref(`bot/${bot.id}`).set(bot);
  }

  async update(bot: Bot) {
    await this.acebase.ref(`bot/${bot.id}`).set(bot);
  }

  async remove(botId: string) {
    await this.acebase.ref(`bot/${botId}`).remove();
  }

  async findOne(botId: string): Promise<Bot | null> {
    const snapshot = await this.acebase.ref(`bot/${botId}`).get();
    return snapshot.exists() ? snapshot.val() : null;
  }

  async findAll(): Promise<Bot[]> {
    const snapshot = await this.acebase.ref<Bot[]>(`bot`).get();
    const bots = snapshot.exists() ? snapshot.val() : {};
    return Object.values(bots)
  }
}