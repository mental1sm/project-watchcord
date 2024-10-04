import { Controller, Get, Param, UseInterceptors, Query, DefaultValuePipe } from '@nestjs/common';
import { GuildService } from './guild.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Guild } from './entities/guild.entity';
import { BotContextInterceptor } from '../bot/bot.interceptor';
import { GuildDto } from './dto/guild.dto';

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
    type: GuildDto,
    isArray: true,
  })
  @ApiQuery({ name: 'fetch', description: 'Fetch from Discord API', required: false })
  async findAll(@Param('appId') appId: string, @Query('fetch', new DefaultValuePipe(false)) fetch: boolean) {
    if (fetch) {
      return this.guildService.fetchAll();
    }

    const guilds = await this.guildService.findAll(appId) as unknown as GuildDto[];
    const guildStatistics = await this.guildService.getGuildStatistics();

    return guilds.map((guild) => {
      const guildData = guildStatistics.find((data) => data.guildId === guild.id);

      return {
        ...guild,
        channelsCount: guildData ? guildData.channelCount : 0,
        membersCount: guildData ? guildData.memberCount : 0,
      };
    });
  }

  @Get(':guildId')
  @ApiOperation({ summary: 'Fetch Guild' })
  @ApiResponse({
    status: 200,
    description: 'Successfully found',
    type: GuildDto,
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
