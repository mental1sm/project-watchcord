import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { DiscordClientService } from '../discord_client/discord.client.service';
import { Channel } from '../channel/entities/channel.entity';
import { MemberMapper } from './mappers/member.mapper.member';
import { GuildService } from '../guild/guild.service';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private readonly repository: Repository<Member>,
    private readonly discordClient: DiscordClientService,
    private readonly guildService: GuildService,
    private readonly memberMapper: MemberMapper
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
    guild.members = guild.members || [];
    const newMembers: Member[] = [];

    for (const discordMember of discordMembers) {
      const member = this.memberMapper.discordMemberToMember(discordMember);

      const existingMember = guild.members.find(m => m.id === member.id);
      if (!existingMember) {
        guild.members.push(member);
        newMembers.push(member);
      } else {
        this.repository.update(member.id, member);
      }
    }

    await this.repository.save(newMembers);
    await this.guildService.save(guild);
    return this.repository.find();
  }

  /**
   * Fetch concrete member from specified Guild
   * @param guildId Guild id
   * @param memberId Member id
   */
  async fetch(guildId: string, memberId: string): Promise<Member> {
    const discordMember = (await this.discordClient.fetchMember(guildId, memberId)).data;
    return this.repository.save(this.memberMapper.discordMemberToMember(discordMember));
  }

  findAll(guildId: string) {
    return this.repository.find({where: {guilds: {id: guildId}}});
  }

  findOne(guildId: string, memberId: string): Promise<Member> {
    return this.repository.findOne({where: {guilds: {id: guildId}, id: memberId}});
  }

  async remove(id: string) {
    const member = await this.repository.findOne({where: {id: id}});
    return this.repository.remove(member);
  }
}
