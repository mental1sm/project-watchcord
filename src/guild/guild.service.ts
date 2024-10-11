import { Inject, Injectable } from '@nestjs/common';
import { Guild } from './entities/guild.entity';
import { DiscordClientService } from '../discord_client/discord.client.service';
import { GuildRepository } from 'src/infrastructure/guild.repository';

@Injectable()
export class GuildService {
  constructor(
    @Inject() private readonly repository: GuildRepository,
    private readonly discordClient: DiscordClientService
  ) {}

  /**
   * Fetch Guild with specified ID from Discord API
   * @param guildId Guild identifier
   */
  async fetch(guildId: string): Promise<Guild> {
    const bot = this.discordClient.getBot();
    const rawGuild = (await this.discordClient.fetchGuild(guildId)).data;
    const guild = Guild.extractToGuild(rawGuild);
    await this.repository.addToBot(bot.id, [guild]);
    return this.repository.getOneGuild(bot.id, guild.id);
  }

  /**
   * Fetch all Guilds from Discord Api of specified Bot
   */
  async fetchAll(): Promise<Guild[]> {
    const bot = this.discordClient.getBot();
    const rawGuilds = (await this.discordClient.fetchGuilds()).data;
    const guilds = rawGuilds.map(raw => Guild.extractToGuild(raw));
    await this.repository.addToBot(bot.id, guilds);
    return this.repository.getAllGuilds(bot.id);
  }

  /**
   * Get all Guilds from Database
   * @param appId Bot Application ID
   */
  async findAll(appId: string): Promise<Guild[]> {
    return this.repository.getAllGuilds(appId);
  }

  /**
   * Find one Guild from Database
   * @param appId Bot id
   * @param guildId Guild identifier
   */
  findOne(appId: string, guildId: string) {
    return this.repository.getOneGuild(appId, guildId);
  }

  /**
   * Get statistics of all guilds
   * @param appId Bot id
   */
  async getGuildStatistics(appId: string): Promise<{ guildId: string, channelCount: number, memberCount: number }[]> {
    const guilds = await this.repository.getAllGuilds(appId);
      
    return Promise.all(guilds.map(async (guild) => (
        {
          guildId: guild.id,
          channelCount: await this.repository.channelsCount(appId, guild.id),
          memberCount: await this.repository.membersCount(appId, guild.id),
        }
    )));
  }
}
