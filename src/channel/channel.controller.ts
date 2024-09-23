import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Controller('bot/:appId/guild/:guildId')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  findAll(@Param(':guildId') guildId: string) {
    return this.channelService.findAll(+guildId);
  }

  @Get(':channelId')
  findOne(@Param('channelId') channelId: string) {
    return this.channelService.findOne(+channelId);
  }
}
