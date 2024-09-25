import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BotService } from './bot.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Bot } from './entities/bot.entity';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post()
  @ApiOperation({summary: "Add new bot and init it"})
  @ApiResponse({status: 201, description: 'Successfully added'})
  create(@Body() createBotDto: CreateBotDto) {
    return this.botService.add(createBotDto);
  }

  @Get()
  @ApiOperation({summary: "Get all bots"})
  @ApiResponse({status: 200, description: 'Successful request'})
  findAll() {
    return this.botService.findAll();
  }

  @Get(':appId')
  @ApiOperation({summary: "Get bot information"})
  @ApiResponse({status: 200, description: 'Successful request'})
  findOne(@Param('appId') appId: string) {
    return this.botService.findOne(appId);
  }

  @Patch(':appId')
  @ApiOperation({summary: "Update bot"})
  @ApiResponse({status: 200, description: 'Successfully updated'})
  update(@Param('appId') appId: string, @Body() updateBotDto: UpdateBotDto) {
    return this.botService.update(appId, updateBotDto);
  }

  @Delete(':appId')
  @ApiOperation({summary: "Remove bot"})
  @ApiResponse({status: 200, description: 'Successfully removed'})
  remove(@Param('appId') appId: string) {
    return this.botService.remove(appId);
  }
}
