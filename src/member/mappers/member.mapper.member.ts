import { Member } from '../entities/member.entity';

export class MemberMapper {
  discordMemberToMember(discordMember: DiscordMemberType): Member {
    return {
      id: discordMember.user.id,
      username: discordMember.user.username,
      avatar: discordMember.user.avatar,
      joined_at: discordMember.joined_at,
      nick: discordMember.nick,
      guilds: undefined,
      messages: undefined
    };
  }
}