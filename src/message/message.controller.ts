import { Controller, Get, Param, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { MessageDto } from './dto/message.dto';
import { MessageFetchingOptions } from '../discord_client/types/message.fetching.options.type';
import { ParseBooleanPipe } from '../pipes/ParseBooleanPipe';

@ApiTags('Message')
@Controller('bot/:appId/guilds/:guildId/channels/:channelId/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all messages in channel' })
  @ApiOkResponse({ type: MessageDto, isArray: true })
  @ApiQuery({ name: 'fetch', description: 'Fetch from Discord API', required: false })
  async findAll(
    @Query() queryOptions: MessageFetchingOptions,
    @Query('fetch', new ParseBooleanPipe()) fetch: boolean,
    @Param('appId') appId: string,
    @Param('guildId') guildId: string,
    @Param('channelId') channelId: string,
  ) {
    if (fetch === true) {
      if (queryOptions.before) {
        const oldMessages = await this.messageService.findAll(appId, guildId, channelId, queryOptions);
        return oldMessages.length < queryOptions.limit ? this.messageService.fetchAll(appId, guildId, channelId, queryOptions) : oldMessages;
      }
      return this.messageService.fetchAll(appId, guildId, channelId, queryOptions);
    }
    return this.messageService.findAll(appId, guildId, channelId, queryOptions);
  }

  // @Get(':messageId')
  // @ApiOperation({ summary: 'Fetch message' })
  // @ApiOkResponse({ type: MessageDto, isArray: false })
  // @ApiQuery({ name: 'fetch', description: 'Fetch from Discord API', required: false })
  // findOne(
  //   @Param('messageId') messageId: string,
  //   @Param('channelId') channelId: string,
  //   @Query('fetch', new ParseBooleanPipe()) fetch: boolean,
  // ) {
  //   if (fetch === true) {
  //     return this.messageService.fetch(channelId, messageId);
  //   }
  //   return this.messageService.findOne(channelId, messageId);
  // }
}
