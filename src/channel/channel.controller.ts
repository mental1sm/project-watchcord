import {
  Controller,
  Get,
  Param,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { ChannelService } from './channel.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Channel } from './entities/channel.entity';

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
  findAll(@Param('guildId') guildId: string, @Query('fetch', new DefaultValuePipe(false)) fetch: boolean) {
    if (fetch) {
      return this.channelService.fetchAll(guildId);
    }
    return this.channelService.findAll(guildId);
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
    @Param('channelId') channelId: string,
    @Query('fetch', new DefaultValuePipe(false)) fetch: boolean,
  ) {
    if (fetch) {
      return this.channelService.fetch(channelId);
    }
    return this.channelService.findOne(channelId);
  }
}
