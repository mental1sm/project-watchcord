import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { DiscordClientService } from '../discord_client/discord.client.service';
import { MessageFetchingOptions } from '../discord_client/types/message.fetching.options.type';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private readonly repository: Repository<Message>,
    private readonly userService: UserService,
    private readonly discordClient: DiscordClientService,
  ) {}

  /**
   * Fetch message from Discord API
   * @param channelId Channel id
   * @param messageId Message id
   */
  async fetch(channelId: string, messageId: string): Promise<Message> {
    const message = (
      await this.discordClient.fetchMessage(channelId, messageId)
    ).data;
    return this.repository.save(message);
  }

  /**
   * Fetch all messages from Discord API in specified channel
   * @param channelId channelId
   * @param options Query options
   */
  async fetchAll(
    channelId: string,
    options: MessageFetchingOptions,
  ): Promise<Message[]> {
    const messages = (
      await this.discordClient.fetchMessages(channelId, options)
    ).data;

    const uniqueAuthors = new Map<string, User>();

    messages.forEach((m) => {
      if (!uniqueAuthors.has(m.author.id)) {
        uniqueAuthors.set(m.author.id, m.author);
      }
    });

    const authors = Array.from(uniqueAuthors.values());
    if (authors.length > 0) {
      await this.userService.save(authors);
    }

    await this.repository.save(messages);
    return this.findAll(channelId, options);
  }

  /**
   * Find all message from Database in specified channel
   * @param channelId Channel id
   * @param options Query options
   */
  findAll(
    channelId: string,
    options: MessageFetchingOptions,
  ): Promise<Message[]> {
    const queryBuilder = this.repository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.author', 'user')
      .leftJoinAndSelect('user.membership', 'member')
      .where('message.channel_id = :channelId', { channelId })
      .orderBy('message.id', 'ASC');

    if (options.limit) {
      queryBuilder.limit(options.limit);
    }
    if (options.after) {
      queryBuilder.andWhere('message.id >= :after', { after: options.after });
    }
    if (options.before) {
      queryBuilder.andWhere('message.id <= :before', {
        before: options.before,
      });
    }
    return queryBuilder.getMany();
  }

  /**
   * Find message from Database
   * @param channelId Channel id
   * @param messageId Message id
   */
  findOne(channelId: string, messageId: string): Promise<Message> {
    return this.repository.findOne({
      where: { channel_id: channelId, id: messageId },
    });
  }
}
