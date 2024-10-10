import { Inject, Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { DiscordClientService } from '../discord_client/discord.client.service';
import { MessageFetchingOptions } from '../discord_client/types/message.fetching.options.type';
import { MessageRepository } from '../infrastructure/message.repository';

@Injectable()
export class MessageService {
  constructor(
    @Inject() private readonly repository: MessageRepository,
    private readonly discordClient: DiscordClientService,
  ) {}

  // /**
  //  * Fetch message from Discord API
  //  * @param appId Bot id
  //  * @param channelId Channel id
  //  * @param messageId Message id
  //  */
  // async fetch(appId: string, guildId: string, channelId: string, messageId: string): Promise<Message> {
  //   const discordMessage = (await this.discordClient.fetchMessage(channelId, messageId)).data;
  //   const message = Message.discordMessageToMessage(discordMessage);
  //   await this.repository.addToChannel(appId, guildId, channelId, [message]);
  //   return this.repository.
  // }

  /**
   * Fetch all messages from Discord API in specified channel
   * @param channelId channelId
   * @param options Query options
   */
  async fetchAll(
    appId: string,
    guildId: string,
    channelId: string,
    options: MessageFetchingOptions,
  ): Promise<Message[]> {
    const discordMessages = (await this.discordClient.fetchMessages(channelId, options)).data;

    const messages = discordMessages.map(msg => Message.discordMessageToMessage(msg));

    await this.repository.addToChannel(appId, guildId, channelId, messages);
    return this.findAll(appId, guildId, channelId, options);
  }

  /**
   * Find all message from Database in specified channel
   * @param appId Bot id
   * @param guildId Guild id
   * @param channelId Channel id
   * @param options Query options
   */
  findAll(
    appId: string,
    guildId: string,
    channelId: string,
    options: MessageFetchingOptions,
  ): Promise<Message[]> {
    return this.repository.getMany(options, appId, guildId, channelId);
  }

  // /**
  //  * Find message from Database
  //  * @param channelId Channel id
  //  * @param messageId Message id
  //  */
  // findOne(channelId: string, messageId: string): Promise<Message> {
  //   return this.repository.findOne({
  //     where: { channel_id: channelId, id: messageId },
  //   });
  // }
}
