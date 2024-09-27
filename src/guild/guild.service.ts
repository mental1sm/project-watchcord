import { Injectable } from '@nestjs/common';
import { CreateGuildDto } from './dto/create-guild.dto';
import { UpdateGuildDto } from './dto/update-guild.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Guild } from './entities/guild.entity';
import { Repository } from 'typeorm';
import { DiscordClientService } from '../discord_client/discord.client.service';
import { BotService } from '../bot/bot.service';

@Injectable()
export class GuildService {
  constructor(
    @InjectRepository(Guild) private readonly repository: Repository<Guild>,
    private readonly discordClient: DiscordClientService,
    private readonly botService: BotService,
  ) {
  }

  /**
   * Create Guild in Database
   * @param createGuildDto Creation data
   * @returns Created Guild object
   */
  create(createGuildDto: CreateGuildDto): Promise<Guild> {
    const guild = this.repository.create(createGuildDto);
    return this.repository.save(guild);
  }

  /**
   * Save Guild in Database
   * @param Guild Guild object
   */
  async save (Guild: Guild): Promise<void> {
    await this.repository.save(Guild);
  }

  /**
   * Fetch Guild with specified ID from Discord API
   * @param guildId Guild identifier
   * @returns Fetched guild
   */
  async fetch(guildId: string): Promise<Guild> {
    const guild = (await this.discordClient.fetchGuild(guildId)).data;
    return this.repository.save(guild);
  }

  /**
   * Fetch all Guilds from Discord Api of specified Bot
   * @return Array of Guild object
   */
  async fetchAll(): Promise<Guild[]> {
    const bot = this.discordClient.getBot();
    const guilds = (await this.discordClient.fetchGuilds()).data;

    bot.guilds = bot.guilds || [];
    guilds.forEach(guild => {
      if (!bot.guilds.includes(guild)) {
        bot.guilds.push(guild);
      }
    });
    await this.botService.save(bot);
    return this.repository.find();
  }


  /**
   * Get all Guilds from Database
   * @param appId Bot Application ID
   * @returns Set of Guild object
   */
  findAll(appId: string): Promise<Guild[]> {
    return this.repository
      .createQueryBuilder('guild')
      .innerJoin('guild.bots', 'bot')
      .where('bot.id = :appId', {appId})
      .getMany();
  }

  /**
   * Find one Guild from Database
   * @param guildId Guild identifier
   * @returns Guild object
   */
  findOne(guildId: string) {
    return this.repository.findOne({where: {id: guildId}});
  }

  /**
   * Update Guild details in Database
   * @param guildId Guild identifier
   * @param updateGuildDto Update data
   * @returns Update Result
   */
  update(guildId: string, updateGuildDto: UpdateGuildDto) {
    return this.repository.update(guildId, updateGuildDto);
  }

  /**
   * Delete Guild from Database
   * @param guildId Guild identifier
   * @returns Guild object
   */
  async remove(guildId: string) {
    const guild = await this.repository.findOne({ where: { id: guildId } });
    return this.repository.remove(guild);
  }
}
