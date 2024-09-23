import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BotService } from './bot.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post()
  create(@Body() createBotDto: CreateBotDto) {
    return this.botService.create(createBotDto);
  }

  @Get()
  findAll() {
    return this.botService.findAll();
  }

  @Get(':appId')
  findOne(@Param('appId') appId: string) {
    return this.botService.findOne(+appId);
  }

  @Patch(':appId')
  update(@Param('appId') appId: string, @Body() updateBotDto: UpdateBotDto) {
    return this.botService.update(+appId, updateBotDto);
  }

  @Delete(':appId')
  remove(@Param('appId') appId: string) {
    return this.botService.remove(+appId);
  }
}
