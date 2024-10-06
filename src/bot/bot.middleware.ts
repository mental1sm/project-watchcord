import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { BotService } from './bot.service';
import { DiscordClientService } from '../discord_client/discord.client.service';

@Injectable()
export class BotContextMiddleware implements NestMiddleware {

  constructor(private readonly botService: BotService,
              private readonly discordClient: DiscordClientService)
  {}

  async use(req: Request, res: Response, next: Function) {
    const appId = req.params.appId;
    const bot = await this.botService.findOne(appId);
    this.discordClient.setBot(bot);
    next();
  }
}
