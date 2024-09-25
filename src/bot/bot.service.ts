import { Injectable } from '@nestjs/common';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bot } from './entities/bot.entity';
import { Repository, UpdateResult } from 'typeorm';
import { DiscordClientService } from '../discord_client/discord.client.service';
import { response } from 'express';

@Injectable()
export class BotService {
  constructor(
    @InjectRepository(Bot) private readonly repository: Repository<Bot>,
    private readonly discordClient: DiscordClientService,
  ) {}

  async add(createBotDto: CreateBotDto): Promise<Bot> {
    this.discordClient.setToken(createBotDto.token);
    const fetchedBot = (await this.discordClient.fetchBot()).data;
    let bot = this.repository.create(fetchedBot);
    bot.token = createBotDto.token;
    return this.repository.save(bot);
  }

  save(bot: Bot): Promise<Bot> {
    return this.repository.save(bot);
  }

  findAll(): Promise<Bot[]> {
    return this.repository.find();
  }

  findOne(appId: string): Promise<Bot> {
    return this.repository.findOne({ where: { id: appId } });
  }

  update(appId: string, updateBotDto: UpdateBotDto): Promise<UpdateResult> {
    return this.repository.update(appId, updateBotDto);
  }

  async remove(appId: string) {
    const bot = await this.repository.findOne({ where: { id: appId } });
    return this.repository.remove(bot);
  }
}
