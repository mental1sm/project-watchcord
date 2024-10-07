import { Controller, Get, Param, Query } from '@nestjs/common';
import { GuildService } from './guild.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GuildDto } from './dto/guild.dto';
import { ParseBooleanPipe } from '../pipes/ParseBooleanPipe';

@ApiTags('Guild')
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
  async findAll(@Param('appId') appId: string, @Query('fetch', new ParseBooleanPipe()) fetch: boolean) {
    let guilds: GuildDto[] = [];
    if (fetch === true) {
      guilds = await this.guildService.fetchAll() as unknown as GuildDto[];
    } else {
      guilds = await this.guildService.findAll(appId) as unknown as GuildDto[];
    }
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
  findOne(@Param('guildId') guildId: string, @Query('fetch', new ParseBooleanPipe()) fetch: boolean) {
    if (fetch === true) {
      return this.guildService.fetch(guildId);
    }
    return this.guildService.findOne(guildId);
  }
}
