import { Controller, Get, Post, Param, UseInterceptors } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Channel } from './entities/channel.entity';
import { BotContextInterceptor } from '../bot/bot.interceptor';

@ApiTags('Channel')
@UseInterceptors(BotContextInterceptor)
@Controller('bot/:appId/guilds/:guildId/channels')
export class ChannelController {
  constructor(
    private readonly channelService: ChannelService
  ) {}

  @Post()
  @ApiOperation({summary: 'Fetch all channels from Discord API' })
  @ApiOkResponse({description: "Fetched successfully", type: Channel, isArray: true})
  async fetchAll(@Param('guildId') guildId: string) {
    return this.channelService.fetchAll(guildId);
  }

  @ApiOperation({summary: 'Fetch channel from Discord API'})
  @ApiOkResponse({description: "Fetched successfully", type: Channel, isArray: false})
  @Post(':channelId')
  async fetch(@Param('channelId') channelId: string) {
    return this.channelService.fetch(channelId);
  }

  @Get()
  @ApiOperation({summary: 'Find all channels from Database'})
  @ApiOkResponse({description: "Found successfully", type: Channel, isArray: true})
  findAll(@Param('guildId') guildId: string) {
    return this.channelService.findAll(guildId);
  }

  @Get(':channelId')
  @ApiOperation({summary: 'Find specified Channel from Database'})
  @ApiOkResponse({description: "Found successfully", type: Channel, isArray: false})
  findOne(@Param('channelId') channelId: string) {
    return this.channelService.findOne(channelId);
  }
}
