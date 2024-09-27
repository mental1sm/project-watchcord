import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { DiscordClientService } from '../discord_client/discord.client.service';
import { GuildService } from '../guild/guild.service';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private readonly repository: Repository<Member>,
    private readonly discordClient: DiscordClientService,
    private readonly guildService: GuildService,
    private readonly userService: UserService
  ) {
  }

  save(members: Member[]) {
    console.log(members)
    return this.repository.save(members);
  }

  /**
   * Fetch guild members from Discord API
   * @param guildId Guild id
   */
  async fetchAll(guildId: string): Promise<Member[]> {
    const discordMembers = (await this.discordClient.fetchMembers(guildId)).data;
    const guild = await this.guildService.findOne(guildId);

    discordMembers.forEach(member => member.guildId = guild.id);
    await this.repository.save(discordMembers);

    return this.repository.find();
  }

  /**
   * Fetch concrete member from specified Guild
   * @param guildId Guild id
   * @param memberId Member id
   */
  async fetch(guildId: string, memberId: string): Promise<Member> {
    const member = (await this.discordClient.fetchMember(guildId, memberId)).data;
    return this.repository.save(member);
  }

  async findAll(guildId: string) {
    return this.repository.find({where: {guild: {id: guildId}}});
  }

  findOne(guildId: string, memberId: string): Promise<Member> {
    return this.repository.findOne({where: {guild: {id: guildId}, user: {id: memberId}}});
  }
}
