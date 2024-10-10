import { HttpService } from '@nestjs/axios';
import { Injectable, Scope } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Bot } from '../bot/entities/bot.entity';
import { Guild } from 'src/guild/entities/guild.entity';
import { Channel } from 'src/channel/entities/channel.entity';
import { Member } from '../member/entities/member.entity';
import { DiscordMember } from '../member/entities/member.discord';
import { MessageFetchingOptions } from './types/message.fetching.options.type';
import { DiscordMessage } from '../message/entities/message.discord';


@Injectable({ scope: Scope.REQUEST })
export class DiscordClientService {
  private readonly baseUrl: string = 'https://discord.com/api/v10';
  private headers: object;
  private bot: Bot;

  constructor(private readonly httpService: HttpService) {
    this.headers = { Authorization: `Bot ???` };
  }

  /**
   * Set token for using in http requests for authorization
   * @param bot Discord Bot
   */
  public setBot(bot: Bot): void {
    this.bot = bot;
    this.headers = { Authorization: `Bot ${this.bot.token}` };
  }

  /**
   * Get contained Bot info
   * @returns Copy of Bot instance
   */
  public getBot(): Bot {
    return this.bot;
  }

  /**
   *
   * @param endpoint Partial URL of discord v10 API
   */
  private async get<T>(endpoint: string): Promise<AxiosResponse<T>> {
    return this.httpService.axiosRef.get(`${this.baseUrl}${endpoint}`, {
      headers: this.headers,
    });
  }

  /**
   * Fetch Discord Bot from Discord API
   */
  fetchBot(): Promise<AxiosResponse<Bot>> {
    return this.get('/users/@me');
  }

  /**
   * Fetch all guilds of Bot with specified token
   */
  async fetchGuilds(): Promise<AxiosResponse<Guild[]>> {
    return this.get('/users/@me/guilds');
  }
  
  /**
   *
   * @param guildId Guild identifier
   */
  async fetchGuild(guildId: string): Promise<AxiosResponse<Guild>> {
    return this.get(`/guilds/${guildId}`);
  }
  
  /**
   * Fetch all channels from specified Guild
   * @param guildId Guild identifier
   */
  async fetchChannels(guildId: string): Promise<AxiosResponse<Channel[]>> {
    return this.get(`/guilds/${guildId}/channels`);
  }
  
  /**
   * Fetch all active threads from Guild
   * @param guildId Guild id
   */
  async fetchActiveThreads(guildId: string): Promise<AxiosResponse<Channel[]>> {
    return this.get(`/guilds/${guildId}/threads/active`)
  }
  
  /**
   * Fetch channel with specified ID
   * @param channelId Channel identifier
   */
  async fetchChannel(channelId: string): Promise<AxiosResponse<Channel>> {
    return this.get(`/channels/${channelId}`);
  }
  
  /**
   * Fetch all members from specified Guild
   * @param guildId Guild id
   */
  async fetchMembers(guildId: string): Promise<AxiosResponse<DiscordMember[]>> {
    return this.get(`/guilds/${guildId}/members`);
  }

  /**
   * Fetch member from specified Guild
   * @param guildId Guild id
   * @param memberId Member id
   */
  async fetchMember(
    guildId: string,
    memberId: string,
  ): Promise<AxiosResponse<DiscordMember>>
  {
    return this.get(`/guilds/${guildId}/members/${memberId}`);
  }

  /**
   * Fetch messages from specified channel
   * @param channelId Channel identifier
   * @param options Options for query params
   */
  async fetchMessages(
    channelId: string,
    options: MessageFetchingOptions,
  ): Promise<AxiosResponse<DiscordMessage[]>> {
    const queryOptions = this.parseMessageFetchingOptions(options);
    const queryString = queryOptions.toString()
      ? `?${queryOptions.toString()}`
      : '';
    return this.get(`/channels/${channelId}/messages${queryString}`);
  }

  /**
   * Fetch specified message
   * @param channelId Channel id
   * @param messageId Message id
   */
  async fetchMessage(
    channelId: string,
    messageId: string,
  ): Promise<AxiosResponse<DiscordMessage>> {
    return this.get(`/channels/${channelId}/messages/${messageId}`);
  }

  private parseMessageFetchingOptions(
    options: MessageFetchingOptions,
  ): URLSearchParams {
    const queryOptions = new URLSearchParams();
    if (options.limit !== undefined)
      queryOptions.append('limit', options.limit.toString());
    if (options.after !== undefined)
      queryOptions.append('after', options.after);
    if (options.before !== undefined)
      queryOptions.append('before', options.before);
    if (options.around !== undefined)
      queryOptions.append('around', options.around);
    return queryOptions;
  }
}
