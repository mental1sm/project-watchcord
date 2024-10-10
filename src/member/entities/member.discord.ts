import { User } from '../../user/entities/user.entity';

export class DiscordMember {
  nick: string;
  joined_at: string;
  user: User;

  static extractToMember(obj: object) {
    const member = new DiscordMember();
    member.user = obj['user'];
    member.nick = obj['nick'];
    member.joined_at = obj['joined_at'];
    return member;
  }
}
