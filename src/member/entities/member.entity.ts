import { OmitType } from '@nestjs/mapped-types';
import { DiscordMember } from './member.discord';

export class Member extends OmitType(DiscordMember, ['user'] as const){
  userId: string;

  static discordMemberToMember(discordMember: DiscordMember) {
    const member = new Member();
    member.nick = discordMember.nick;
    member.joined_at = discordMember.joined_at;
    member.userId = discordMember.user.id;

    return member;
  }

}
