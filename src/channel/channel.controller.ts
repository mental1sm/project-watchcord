import {
  Controller,
  Get,
  Param,
  Query
} from '@nestjs/common';
import { ChannelService } from './channel.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Channel } from './entities/channel.entity';
import { ParseBooleanPipe } from '../pipes/ParseBooleanPipe';

@ApiTags('Channel')
@Controller('bot/:appId/guilds/:guildId/channels')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  @ApiOperation({ summary: 'Find all channels from Database' })
  @ApiOkResponse({
    description: 'Found successfully',
    type: Channel,
    isArray: true,
  })
  @ApiQuery({ name: 'fetch', description: 'Fetch from Discord API', required: false })
  findAll(
    @Param('appId') appId: string,
    @Param('guildId') guildId: string,
    @Query('fetch', new ParseBooleanPipe()) fetch: boolean
  ) {
    if (fetch === true) {
      return this.channelService.fetchAll(appId, guildId);
    }
    return this.channelService.findAll(appId, guildId);
  }

  @Get(':channelId')
  @ApiOperation({ summary: 'Find specified Channel from Database' })
  @ApiOkResponse({
    description: 'Found successfully',
    type: Channel,
    isArray: false,
  })
  @ApiQuery({ name: 'fetch', description: 'Fetch from Discord API', required: false })
  findOne(
    @Param('appId') appId: string,
    @Param('guildId') guildId: string,
    @Param('channelId') channelId: string,
    @Query('fetch', new ParseBooleanPipe()) fetch: boolean,
  ) {
    if (fetch === true) {
      return this.channelService.fetch(appId, guildId,channelId);
    }
    return this.channelService.findOne(appId, guildId, channelId);
  }
}
