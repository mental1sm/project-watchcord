import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete, HttpCode, Put,
} from '@nestjs/common';
import { BotService } from './bot.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Bot } from './entities/bot.entity';
import { GetBotDto } from './dto/get-bot.dto';

@ApiTags('Bot')
@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post()
  @ApiOperation({ summary: 'Add new bot and init it' })
  @ApiResponse({
    status: 201,
    description: 'Successfully fetched'
  })
  @HttpCode(201)
  async fetch(@Body() createBotDto: CreateBotDto) {
    console.log(createBotDto.token);
    await this.botService.add(createBotDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bots' })
  @ApiOkResponse({
    description: 'All your Bots details',
    type: GetBotDto,
    isArray: true,
  })
  async findAll() {
    const bots = await this.botService.findAll();
    return Promise.all(bots.map(async (bot) => {
      const guildCount = await this.botService.countGuildsForBot(bot.id);
      return {
        ...bot,
        guilds_count: guildCount
      };
    }))
  }

  @Get(':appId')
  @ApiOperation({ summary: 'Get bot information' })
  @ApiResponse({
    status: 200,
    description: 'Successful request',
    type: Bot,
    isArray: false,
  })
  findOne(@Param('appId') appId: string) {
    return this.botService.findOne(appId);
  }

  @Put(':appId')
  @ApiOperation({ summary: 'Update bot' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated'
  })
  async update(@Param('appId') appId: string, @Body() updateBotDto: UpdateBotDto) {
    await this.botService.update(appId, updateBotDto);
  }

  @Delete(':appId')
  @ApiOperation({ summary: 'Remove bot' })
  @ApiResponse({
    status: 200,
    description: 'Successfully removed'
  })
  async remove(@Param('appId') appId: string) {
    await this.botService.remove(appId);
  }
}
