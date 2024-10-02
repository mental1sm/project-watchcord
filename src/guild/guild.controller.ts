import { Controller, Get, Param, UseInterceptors, Query, DefaultValuePipe } from '@nestjs/common';
import { GuildService } from './guild.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Guild } from './entities/guild.entity';
import { BotContextInterceptor } from '../bot/bot.interceptor';

@ApiTags('Guild')
@UseInterceptors(BotContextInterceptor)
@Controller('bot/:appId/guilds')
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all Guilds' })
  @ApiResponse({
    status: 200,
    description: 'Successfully found',
    type: Guild,
    isArray: true,
  })
  @ApiQuery({ name: 'fetch', description: 'Fetch from Discord API', required: false })
  findAll(@Param('appId') appId: string, @Query('fetch', new DefaultValuePipe(false)) fetch: boolean) {
    if (fetch) {
      return this.guildService.fetchAll();
    }
    return this.guildService.findAll(appId);
  }

  @Get(':guildId')
  @ApiOperation({ summary: 'Fetch Guild' })
  @ApiResponse({
    status: 200,
    description: 'Successfully found',
    type: Guild,
    isArray: false,
  })
  @ApiQuery({ name: 'fetch', description: 'Fetch from Discord API', required: false })
  findOne(@Param('guildId') guildId: string, @Query('fetch', new DefaultValuePipe(false)) fetch: boolean) {
    if (fetch) {
      return this.guildService.fetch(guildId);
    }
    return this.guildService.findOne(guildId);
  }
}
