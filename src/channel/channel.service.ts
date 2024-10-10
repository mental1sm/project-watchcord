// import { Injectable } from '@nestjs/common';
// import { UpdateChannelDto } from './dto/update-channel.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Channel } from './entities/channel.entity';
// import { Repository } from 'typeorm';
// import { DiscordClientService } from '../discord_client/discord.client.service';
// import { GuildService } from '../guild/guild.service';
//
// @Injectable()
// export class ChannelService {
//   constructor(
//     @InjectRepository(Channel)
//     private readonly channelRepository: Repository<Channel>,
//     private readonly discordClient: DiscordClientService,
//     private readonly guildService: GuildService,
//   ) {}
//
//   /**
//    * Fetch all Guilds from Discord API
//    * @param guildId Guild identifier
//    */
//   async fetchAll(guildId: string): Promise<Channel[]> {
//     const guild = await this.guildService.findOne(guildId);
//     const channels = (await this.discordClient.fetchChannels(guildId)).data;
//     const threads = (await this.discordClient.fetchActiveThreads(guildId)).data['threads'];
//     threads.forEach(t => {
//       channels.push(t);
//     })
//     await Promise.allSettled(
//       channels.map((channel) => {
//         channel.guild = guild;
//         return this.channelRepository.save(channel);
//       }),
//     );
//
//     return this.findAll(guildId);
//   }
//
//   /**
//    * Fetch Guild with specified id from Discord API
//    * @param channelId Channel identifier
//    */
//   async fetch(channelId: string): Promise<Channel> {
//     const channel = (await this.discordClient.fetchChannel(channelId)).data;
//     return this.channelRepository.save(channel);
//   }
//
//   /**
//    * Get all Guilds from Database
//    * @param guildId Guild identifier
//    */
//   findAll(guildId: string): Promise<Channel[]> {
//     return this.channelRepository.find({
//       where: {
//         guild: {
//           id: guildId,
//         },
//       }
//     });
//   }
//
//   /**
//    * Get Guild from Database
//    * @param id Guild identifier
//    */
//   findOne(id: string) {
//     return this.channelRepository.findOne({ where: { id: id } });
//   }
//
//   /**
//    * Update Guild
//    * @param id Guild id
//    * @param updateChannelDto Update data
//    */
//   update(id: string, updateChannelDto: UpdateChannelDto) {
//     return this.channelRepository.update(id, updateChannelDto);
//   }
//
//   /**
//    * Remove Guild from Database
//    * @param id Guild id
//    */
//   async remove(id: string) {
//     const channel = await this.channelRepository.findOne({ where: { id: id } });
//     return this.channelRepository.remove(channel);
//   }
// }
