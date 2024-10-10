// import { Controller, Get, Param, Query } from '@nestjs/common';
// import { MemberService } from './member.service';
// import {
//   ApiOkResponse,
//   ApiOperation,
//   ApiQuery,
//   ApiTags,
// } from '@nestjs/swagger';
// import { MemberDto } from './dto/member.dto';
// import { ParseBooleanPipe } from '../pipes/ParseBooleanPipe';
//
// @ApiTags('Member')
// @Controller('bot/:appId/guilds/:guildId/members')
// export class MemberController {
//   constructor(private readonly memberService: MemberService) {}
//
//   @Get()
//   @ApiOperation({ summary: 'Fetch all Members from Guild' })
//   @ApiOkResponse({
//     description: 'Found successfully',
//     type: MemberDto,
//     isArray: false,
//   })
//   @ApiQuery({ name: 'fetch', description: 'Fetch from Discord API', required: false })
//   findAll(@Query('fetch', new ParseBooleanPipe()) fetch: boolean, @Param('guildId') guildId: string) {
//     if (fetch === true) {
//       return this.memberService.fetchAll(guildId);
//     }
//     return this.memberService.findAll(guildId);
//   }
//
//   @Get(':userId')
//   @ApiOperation({ summary: 'Fetch Member' })
//   @ApiOkResponse({
//     description: 'Found successfully',
//     type: MemberDto,
//     isArray: false,
//   })
//   @ApiQuery({ name: 'fetch', description: 'Fetch from Discord API', required: false })
//   find(
//     @Param('userId') userId: string,
//     @Param('guildId') guildId: string,
//     @Query('fetch', new ParseBooleanPipe()) fetch: boolean,
//   ) {
//     if (fetch === true) {
//       return this.memberService.fetch(guildId, userId);
//     }
//     return this.memberService.findOne(guildId, userId);
//   }
// }
