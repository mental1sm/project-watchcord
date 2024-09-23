import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GuildService } from './guild.service';
import { CreateGuildDto } from './dto/create-guild.dto';
import { UpdateGuildDto } from './dto/update-guild.dto';

@Controller('bot/:appId/guild')
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  @Get()
  findAll(@Param('appId') appId: string) {
    return this.guildService.findAll(+appId);
  }

  @Get(':id')
  findOne(@Param('appId') appId: string, @Param('id') id: string) {
    return this.guildService.findOne(+id);
  }
}
