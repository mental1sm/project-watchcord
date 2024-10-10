import { Inject, Injectable } from '@nestjs/common';
import { Channel } from './entities/channel.entity';
import { DiscordClientService } from '../discord_client/discord.client.service';
import { GuildService } from '../guild/guild.service';
import { ChannelRepository } from '../infrastructure/channel.repository';

@Injectable()
export class ChannelService {
  constructor(
    @Inject()
    private readonly repository: ChannelRepository,
    private readonly discordClient: DiscordClientService,
    private readonly guildService: GuildService,
  ) {}

  /**
   * Fetch all Guilds from Discord API
   * @param appId Bot id
   * @param guildId Guild identifier
   */
  async fetchAll(appId: string, guildId: string): Promise<Channel[]> {
    const rawChannels = (await this.discordClient.fetchChannels(guildId)).data;
    const channels = rawChannels.map(ch => Channel.extractToChannel(ch));
    await this.repository.saveChannels(appId, guildId, channels);
    return this.findAll(appId, guildId);
  }

  /**
   * Fetch Guild with specified id from Discord API
   * @param appId Bot id
   * @param guildId Guild id
   * @param channelId Channel id
   */
  async fetch(appId: string, guildId: string, channelId: string): Promise<Channel> {
    const rawChannel = (await this.discordClient.fetchChannel(channelId)).data;
    const channel = Channel.extractToChannel(rawChannel);
    await this.repository.saveChannels(appId, guildId, [channel]);
    return this.repository.getOneChannel(appId, guildId, channelId);
  }

  /**
   * Get all Guilds from Database
   * @param appId Bot id
   * @param guildId Guild identifier
   */
  findAll(appId: string, guildId: string): Promise<Channel[]> {
    return this.repository.getAllChannels(appId, guildId);
  }

  /**
   * Get Guild from Database
   * @param appId Bot id
   * @param guildId Guild id
   * @param channelId Channel id
   */
  findOne(appId: string, guildId: string, channelId: string) {
    return this.repository.getOneChannel(appId, guildId, channelId);
  }
}
