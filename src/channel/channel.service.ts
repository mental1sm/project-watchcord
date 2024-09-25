import { Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { Repository } from 'typeorm';
import { DiscordClientService } from '../discord_client/discord.client.service';
import { BotService } from '../bot/bot.service';
import { GuildService } from '../guild/guild.service';
import { Guild } from '../guild/entities/guild.entity';
import { CreateGuildDto } from '../guild/dto/create-guild.dto';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel) private readonly channelRepository: Repository<Channel>,
    private readonly discordClient: DiscordClientService,
    private readonly guildService: GuildService,
    private readonly botService: BotService
  ) {}

  async fetchAll(guildId: string): Promise<Channel[]> {
    let guild = await this.guildService.findOne(guildId);
    if (!guild) {
      guild = await this.guildService.fetch(guildId);
    }
    let channels = (await this.discordClient.fetchChannels(guildId)).data;
    await Promise.allSettled(
      channels.map(channel => {
        channel.guild = guild;
        return this.channelRepository.save(channel)
      }
      ));

    return this.findAll(guildId);
  }

  findAll(guildId: string): Promise<Channel[]> {
    return this.channelRepository.find({
      where: { guild: {
        id: guildId,
        }},
    });
  }

  findOne(id: string) {
    return this.channelRepository.findOne({where: {id: id}});
  }

  update(id: string, updateChannelDto: UpdateChannelDto) {
    return this.channelRepository.update(id, updateChannelDto);
  }

  async remove(id: string) {
    const channel = await this.channelRepository.findOne({where: {id: id}});
    return this.channelRepository.remove(channel);
  }
}
