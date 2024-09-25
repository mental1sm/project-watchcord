import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { DiscordClientService } from '../discord_client/discord.client.service';
import { BotService } from '../bot/bot.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('bot/:appId/guilds/:guildId/channels')
export class ChannelController {
  constructor(
    private readonly channelService: ChannelService,
    private readonly discordClient: DiscordClientService,
    private readonly botService: BotService
  ) {}

  @Post()
  @ApiOperation({summary: 'Fetch all channels from Discord API' })
  @ApiResponse({status: 200, description: 'Fetched' })
  async fetchAll(@Param('appId') appId: string, @Param('guildId') guildId: string) {
    const bot = await this.botService.findOne(appId);
    this.discordClient.setToken(bot.token);
    this.discordClient.appId = bot.id;
    return this.channelService.fetchAll(guildId);
  }

  // @Get()
  // findAll(@Param('guildId') guildId: string) {
  //   return this.channelService.findAll(guildId);
  // }
  //
  // @Get(':channelId')
  // findOne(@Param('channelId') channelId: string) {
  //   return this.channelService.findOne(channelId);
  // }
}
