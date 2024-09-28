import { Injectable } from '@nestjs/common';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bot } from './entities/bot.entity';
import { Repository, UpdateResult } from 'typeorm';
import { DiscordClientService } from '../discord_client/discord.client.service';

@Injectable()
export class BotService {
  constructor(
    @InjectRepository(Bot) private readonly repository: Repository<Bot>,
    private readonly discordClient: DiscordClientService,
  ) {}

  /**
   * Fetch bot information from Discord API through token
   * @param createBotDto bundled token and app ID
   * @returns Fetched bot info if it exists
   */
  async add(createBotDto: CreateBotDto): Promise<Bot> {
    const b = new Bot();
    b.token = createBotDto.token;
    this.discordClient.setBot(b);

    const fetchedBot = (await this.discordClient.fetchBot()).data;
    const bot = this.repository.create(fetchedBot);
    bot.token = createBotDto.token;

    return this.repository.save(bot);
  }

  /**
   * Saves Bot at database
   * @param bot
   * @returns Bot object with updated info
   */
  save(bot: Bot): Promise<Bot> {
    return this.repository.save(bot);
  }

  /**
   * Get all saved Bots
   * @returns Array of Bot objects
   */
  findAll(): Promise<Bot[]> {
    return this.repository.find();
  }

  /**
   *
   * @param appId Application ID of Bot
   * @returns Bot object
   */
  findOne(appId: string): Promise<Bot> {
    return this.repository.findOne({ where: { id: appId } });
  }

  /**
   *
   * @param appId Application ID of Bot
   * @param updateBotDto Updation data
   * @returns Update result
   */
  update(appId: string, updateBotDto: UpdateBotDto): Promise<UpdateResult> {
    return this.repository.update(appId, updateBotDto);
  }

  /**
   *
   * @param appId Application ID of Bot
   * @returns Bot object
   */
  async remove(appId: string) {
    const bot = await this.repository.findOne({ where: { id: appId } });
    return this.repository.remove(bot);
  }
}
