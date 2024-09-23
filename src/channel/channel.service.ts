import { Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelService {
  constructor(@InjectRepository(Channel) private readonly channelRepository: Repository<Channel>) {}

  create(createChannelDto: CreateChannelDto): Promise<CreateChannelDto> {
    const channel = this.channelRepository.create(createChannelDto);
    return this.channelRepository.save(channel);
  }

  findAll(guildId: number): Promise<Channel[]> {
    return this.channelRepository.find({
      where: {guild: {
          guildId: guildId,
        }},
    });
  }

  findOne(channelId: number) {
    return this.channelRepository.findOne({where: {channelId: channelId}});
  }

  update(channelId: number, updateChannelDto: UpdateChannelDto) {
    return this.channelRepository.update(channelId, updateChannelDto);
  }

  async remove(channelId: number) {
    const channel = await this.channelRepository.findOne({where: {channelId: channelId}});
    return this.channelRepository.remove(channel);
  }
}
