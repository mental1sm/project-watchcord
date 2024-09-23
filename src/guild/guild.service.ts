import { Injectable } from '@nestjs/common';
import { CreateGuildDto } from './dto/create-guild.dto';
import { UpdateGuildDto } from './dto/update-guild.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Guild } from './entities/guild.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GuildService {
  constructor(@InjectRepository(Guild) private readonly repository: Repository<Guild>) {
  }

  create(createGuildDto: CreateGuildDto): Promise<Guild> {
    const guild = this.repository.create(createGuildDto);
    return this.repository.save(guild);
  }

  findAll(appId: number): Promise<Guild[]> {
    return this.repository
      .createQueryBuilder('guild')
      .innerJoin('guild.bots', 'bot')
      .where('bot.appId = :appId', {appId})
      .getMany();
  }

  findOne(guildId: number) {
    return this.repository.findOne({where: {guildId: guildId}});
  }

  update(guildId: number, updateGuildDto: UpdateGuildDto) {
    return this.repository.update(guildId, updateGuildDto);
  }

  async remove(guildId: number) {
    const guild = await this.repository.findOne({ where: { guildId: guildId } });
    return this.repository.remove(guild);
  }
}
