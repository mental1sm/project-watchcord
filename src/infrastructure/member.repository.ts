import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AceBase } from 'acebase';
import { Member } from '../member/entities/member.entity';

@Injectable()
export class MemberRepository {
  constructor(@Inject("ACEBASE_DB") private readonly acebase: AceBase) {}

  async addToGuild(botId: string, guildId: string, members: Member[]) {
    const guildMembersRef = this.acebase.ref(`/bot/${botId}/guilds/${guildId}/members`);
    const updates = members.reduce((acc, member) => {
      acc[member.userId] = member;
      return acc;
    }, {});

    await guildMembersRef.set(updates);
  }

  async getOne(botId: string, guildId: string, userId) {
    const snapshot = await this.acebase.ref<Member>(`/bot/${botId}/guilds/${guildId}/members/${userId}`).get();
    const member = snapshot.val();
    if (!member) throw new NotFoundException();
    return member;
  }

  async getAll(botId: string, guildId: string) {
    const snapshot = await this.acebase.ref<Member[]>(`/bot/${botId}/guilds/${guildId}/members}`).get();
    return snapshot.val();
  }
}