import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { BotService } from './bot.service';
import { DiscordClientService } from '../discord_client/discord.client.service';

@Injectable()
export class BotContextInterceptor implements NestInterceptor {
  constructor(
    private readonly botService: BotService,
    private readonly discordClient: DiscordClientService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const bot = await this.botService.findOne(request.query['appId']);
    this.discordClient.setBot(bot);
    return next.handle();
  }
}
