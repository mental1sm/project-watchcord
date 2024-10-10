import { Inject, Injectable } from '@nestjs/common';
import { Member } from './entities/member.entity';
import { DiscordClientService } from '../discord_client/discord.client.service';
import { MemberRepository } from '../infrastructure/member.repository';
import { UserRepository } from '../infrastructure/user.repository';
import { DiscordMember } from './entities/member.discord';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MemberService {
  constructor(
    @Inject() private readonly repository: MemberRepository,
    @Inject() private readonly userRepository: UserRepository,
    private readonly discordClient: DiscordClientService,
  ) {}


  /**
   * Fetch guild members from Discord API
   * @param appId Bot id
   * @param guildId Guild id
   */
  async fetchAll(appId: string, guildId: string): Promise<Member[]> {
    const rawMembers = (await this.discordClient.fetchMembers(guildId)).data;
    const discordMembers = rawMembers.map(raw => DiscordMember.extractToMember(raw));
    const users: User[] = [];
    const plainMembers = discordMembers.map(member => {
      if (!users.some(u => u.id === member.user.id)) {
        users.push(member.user);
      }
      return Member.discordMemberToMember(member);
    })
    await this.userRepository.add(users);
    await this.repository.addToGuild(appId, guildId, plainMembers);
    return this.repository.getAll(appId, guildId);
  }

  /**
   * Fetch concrete member from specified Guild
   * @param appId Bot id
   * @param guildId Guild id
   * @param memberId Member id
   */
  async fetch(appId: string, guildId: string, memberId: string): Promise<Member> {
    const discordMember = DiscordMember.extractToMember((await this.discordClient.fetchMember(guildId, memberId)).data);
    const plainMember = Member.discordMemberToMember(discordMember);
    await this.userRepository.add([discordMember.user]);
    await this.repository.addToGuild(appId, guildId, [plainMember]);
    return this.repository.getOne(appId, guildId, memberId);
  }

  /**
   * Find all members in Guild
   * @param appId Bot id
   * @param guildId Guild id
   */
  async findAll(appId: string, guildId: string) {
    return this.repository.getAll(appId, guildId);
  }

  /**
   * Find member in Guild
   * @param appId Bot id
   * @param guildId Guild id
   * @param memberId Member id
   */
  findOne(appId: string, guildId: string, memberId: string): Promise<Member> {
    return this.repository.getOne(appId, guildId, memberId);
  }
}
