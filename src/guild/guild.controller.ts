import { Controller, Get, Post, Param, UseInterceptors } from '@nestjs/common';
import { GuildService } from './guild.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Guild } from './entities/guild.entity';
import { DiscordClientService } from 'src/discord_client/discord.client.service';
import { BotService } from 'src/bot/bot.service';
import { BotContextInterceptor } from '../bot/bot.interceptor';

@ApiTags('Guild')
@UseInterceptors(BotContextInterceptor)
@Controller('bot/:appId/guilds')
export class GuildController {
  constructor(
    private readonly guildService: GuildService
  ) {}

  @Post()
  @ApiOperation({summary: 'Fetch all Guilds from Discord API'})
  @ApiResponse({status: 200, description: 'Fetched successfully', type: Guild, isArray: true})
  async fetchAll() {
    return this.guildService.fetchAll();
  }

  @Post(':guildId')
  @ApiOperation({summary: 'Fetch Guild from Discord API'})
  @ApiResponse({status: 200, description: 'Fetched successfully', type: Guild, isArray: false})
  async fetch(@Param('guildId') guildId: string) {
    return this.guildService.fetch(guildId);
  }

  @Get()
  @ApiOperation({summary: "Get all Guilds from Database"})
  @ApiResponse({status: 200, description: "Successfully found", type: Guild, isArray: true})
  findAll(@Param('appId') appId: string) {
    return this.guildService.findAll(appId);
  }
  
  @Get(':guildId')
  @ApiOperation({summary: "Get specified Guild from Database"})
  @ApiResponse({status: 200, description: "Successfully found", type: Guild, isArray: false})
  findOne(@Param('appId') appId: string, @Param('guildId') guildId: string) {
    return this.guildService.findOne(guildId);
  }
}
