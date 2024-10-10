import { Guild } from "src/guild/entities/guild.entity";

export class Bot {
  id: string;
  token: string;
  username: string;
  avatar: string;
  guilds: Guild[];

  static extractToBot(obj: object) {
    const bot = new Bot();
    bot.id = obj['id'];
    bot.token = obj['token'];
    bot.username = obj['username'];
    bot.avatar = obj['avatar'];
    bot.guilds = [];
    return bot;
  }
}
