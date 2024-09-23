import { Injectable } from '@nestjs/common';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bot } from './entities/bot.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class BotService {
  constructor(@InjectRepository(Bot) private readonly repository: Repository<Bot>) {}

  create(createBotDto: CreateBotDto): Promise<Bot> {
    const bot = this.repository.create(createBotDto);
    return this.repository.save(bot);
  }

  findAll(): Promise<Bot[]> {
    return this.repository.find();
  }

  findOne(appId: number): Promise<Bot> {
    return this.repository.findOne({ where: { appId: appId } });
  }

  update(appId: number, updateBotDto: UpdateBotDto): Promise<UpdateResult> {
    return this.repository.update(appId, updateBotDto);
  }

  async remove(appId: number) {
    const bot = await this.repository.findOne({ where: { appId: appId } });
    return this.repository.remove(bot);
  }
}
