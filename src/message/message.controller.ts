import { Controller, DefaultValuePipe, Get, Param, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { MessageDto } from './dto/message.dto';
import { MessageFetchingOptions } from '../discord_client/types/message.fetching.options.type';

@ApiTags('Message')
@Controller('bot/:appId/guilds/:guildId/channels/:channelId/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all messages in channel' })
  @ApiOkResponse({ type: MessageDto, isArray: true })
  @ApiQuery({ name: 'fetch', description: 'Fetch from Discord API', required: false })
  findAll(
    @Query() queryOptions: MessageFetchingOptions,
    @Query('fetch', new DefaultValuePipe(false)) fetch: boolean,
    @Param('channelId') channelId: string,
  ) {
    if (fetch) {
      return this.messageService.fetchAll(channelId, queryOptions);
    }
    return this.messageService.findAll(channelId, queryOptions);
  }

  @Get(':messageId')
  @ApiOperation({ summary: 'Fetch message' })
  @ApiOkResponse({ type: MessageDto, isArray: false })
  @ApiQuery({ name: 'fetch', description: 'Fetch from Discord API', required: false })
  findOne(
    @Param('messageId') messageId: string,
    @Param('channelId') channelId: string,
    @Query('fetch', new DefaultValuePipe(false)) fetch: boolean,
  ) {
    if (fetch) {
      return this.messageService.fetch(channelId, messageId);
    }
    return this.messageService.findOne(channelId, messageId);
  }
}
