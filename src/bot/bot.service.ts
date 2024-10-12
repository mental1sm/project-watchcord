import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { Bot } from './entities/bot.entity';
import { DiscordClientService } from '../discord_client/discord.client.service';
import { BotRepository } from '../infrastructure/bot.repository';

@Injectable()
export class BotService {
  constructor(
    @Inject() private readonly repository: BotRepository,
    private readonly discordClient: DiscordClientService,
  ) {}

  /**
   * Fetch bot information from Discord API through token
   * @param createBotDto bundled token and app ID
   * @returns Fetched bot info if it exists
   */
  async add(createBotDto: CreateBotDto): Promise<void> {
    const b: Bot = new Bot();
    b.token = createBotDto.token;
    this.discordClient.setBot(b);

    const fetchedBot = (await this.discordClient.fetchBot()).data;
    fetchedBot.token = createBotDto.token;
    return this.repository.create(Bot.extractToBot(fetchedBot));
  }

  /**
   * Updates Bot at database
   * @param appId Bot id
   * @param updateData Update dto
   * @returns Bot object with updated info
   */
  async update(appId: string, updateData: UpdateBotDto): Promise<void> {
    const bot = await this.repository.findOne(appId);
    if (bot) {
      bot.token = updateData.token;
      return this.repository.update(bot);
    }
    throw new NotFoundException();
  }

  /**
   * Get all saved Bots
   * @returns Array of Bot objects
   */
  findAll(): Promise<Bot[]> {
    return this.repository.findAll();
  }

  /**
   *
   * @param appId Application ID of Bot
   * @returns Bot object
   */
  findOne(appId: string): Promise<Bot> {
    return this.repository.findOne(appId);
  }

  /**
   *
   * @param appId Application ID of Bot
   * @returns Bot object
   */
  async remove(appId: string) {
    return this.repository.remove(appId);
  }

  /**
   * Count Guilds of Bot
   * @param botId Bot id
   */
  async countGuildsForBot(botId: string): Promise<number> {
    return this.repository.guildCount(botId);
  }
}
