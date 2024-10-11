import { Inject, Injectable } from '@nestjs/common';
import { AceBase } from 'acebase';
import { Message } from '../message/entities/message.entity';
import { MessageFetchingOptions } from '../discord_client/types/message.fetching.options.type';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MessageRepository {
  constructor(@Inject("ACEBASE_DB") private readonly acebase: AceBase) {}

  async addToChannel(botId: string, guildId: string, channelId: string, messages: Message[]) {
    const messageRef = this.acebase.ref(`/bot/${botId}/guilds/${guildId}/channels/${channelId}/messages`);
    const updates = messages.reduce((acc, message) => {
      acc[message.id] = message;
      return acc;
    }, {});

    await messageRef.update(updates);
  }

  async getMany(options: MessageFetchingOptions, botId: string, guildId: string, channelId: string) {
    const query = this.acebase.ref<Message[]>(`/bot/${botId}/guilds/${guildId}/channels/${channelId}/messages`).query();

    if (options.limit && !options.around) query.take(options.limit);
    if (options.after) query.filter('id', '>', options.after);
    if (options.before) query.filter('id', '<', options.before);
    query.sort('id', false);

    const messagesSnapshot = await query.get();
    const messagesObject = messagesSnapshot.getValues();

    if (messagesSnapshot.length === 0) return [] as Message[];
    const messages: Message[] = Object.values(messagesObject);
    return messages;
  }
}