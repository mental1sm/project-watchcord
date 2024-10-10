export class Bot {
  id: string;
  token: string;
  username: string;
  avatar: string;
  guildsId: string[];

  static extractToBot(obj: object) {
    const bot = new Bot();
    bot.id = obj['id'];
    bot.token = obj['token'];
    bot.username = obj['username'];
    bot.avatar = obj['avatar'];
    bot.guildsId = [];
    return bot;
  }
}
