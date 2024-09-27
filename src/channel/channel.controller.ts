import { Controller, Get, Post, Param, UseInterceptors, Query } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Channel } from './entities/channel.entity';
import { BotContextInterceptor } from '../bot/bot.interceptor';

@ApiTags('Channel')
@UseInterceptors(BotContextInterceptor)
@Controller('bot/:appId/guilds/:guildId/channels')
export class ChannelController {
  constructor(
    private readonly channelService: ChannelService
  ) {}

  @Get()
  @ApiOperation({summary: 'Find all channels from Database'})
  @ApiOkResponse({description: "Found successfully", type: Channel, isArray: true})
  @ApiQuery({name: 'fetch', description: 'Fetch from Discord API'})
  findAll(@Param('guildId') guildId: string, @Query('fetch') fetch: boolean) {
    if (fetch) {
      return this.channelService.fetchAll(guildId);
    }
    return this.channelService.findAll(guildId);
  }

  @Get(':channelId')
  @ApiOperation({summary: 'Find specified Channel from Database'})
  @ApiOkResponse({description: "Found successfully", type: Channel, isArray: false})
  @ApiQuery({name: 'fetch', description: 'Fetch from Discord API'})
  findOne(@Param('channelId') channelId: string, @Query('fetch') fetch: boolean) {
    if (fetch) {
      return this.channelService.fetch(channelId);
    }
    return this.channelService.findOne(channelId);
  }
}
