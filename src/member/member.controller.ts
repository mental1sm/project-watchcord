import { Controller, Get, Post, Param, UseInterceptors } from '@nestjs/common';
import { MemberService } from './member.service';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Member } from './entities/member.entity';
import { BotContextInterceptor } from '../bot/bot.interceptor';


@ApiTags('Member')
@UseInterceptors(BotContextInterceptor)
@Controller('bot/:appId/guilds/:guildId/members')
export class MemberController {
  constructor(
    private readonly memberService: MemberService
  ) {}

  @Get()
  @ApiOperation({summary: 'Fetch all Members from Database'})
  @ApiOkResponse({description: "Found successfully", type: Member, isArray: false})
  @ApiQuery({name: 'fetch', description: 'Fetch from Discord API'})
  findAll(@Param('fetch') fetch: boolean, @Param('guildId') guildId: string) {
    if (fetch) {
      return this.memberService.fetchAll(guildId);
    }
    return this.memberService.findAll(guildId);
  }

  @Get(':memberId')
  @ApiOperation({summary: 'Fetch Member from Database'})
  @ApiOkResponse({description: "Found successfully", type: Member, isArray: false})
  @ApiQuery({name: 'fetch', description: 'Fetch from Discord API'})
  find(@Param('memberId') memberId: string, @Param('guildId') guildId: string, @Param('fetch') fetch: boolean) {
    if (fetch) {
      return this.memberService.fetch(guildId, memberId);
    }
    return this.memberService.findOne(guildId, memberId);
  }
}
