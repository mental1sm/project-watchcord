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

  create(createGuildDto: CreateGuildDto): Promise<Guild> {
    const guild = this.repository.create(createGuildDto);
    return this.repository.save(guild);
  }

  async fetch(guildId: string): Promise<Guild> {
    const guild = (await this.discordClient.fetchGuild(guildId)).data;
    const bot = await this.botService.findOne(this.discordClient.appId);

    bot.guilds = bot.guilds || [];
    guild.bots = guild.bots || [];

    bot.guilds.push(guild);
    guild.bots.push(bot);

    await this.repository.save(guild);
    await this.botService.save(bot);
    return this.findOne(guildId);
  }

  findAll(appId: string): Promise<Guild[]> {
    return this.repository
      .createQueryBuilder('guild')
      .innerJoin('guild.bots', 'bot')
      .where('bot.appId = :appId', {appId})
      .getMany();
  }

  findOne(id: string) {
    return this.repository.findOne({where: {id: id}});
  }

  update(id: string, updateGuildDto: UpdateGuildDto) {
    return this.repository.update(id, updateGuildDto);
  }

  async remove(id: string) {
    const guild = await this.repository.findOne({ where: { id: id } });
    return this.repository.remove(guild);
  }
}
