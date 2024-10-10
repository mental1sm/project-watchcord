// import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
// import { Guild } from '../../guild/entities/guild.entity';
// import { ApiProperty } from '@nestjs/swagger';
// import { ThreadMetadata } from './channel.thread.metadata';
//
// @Entity()
// export class Channel {
//   @PrimaryColumn({ name: 'id', type: 'text', unique: true })
//   @ApiProperty({
//     description: 'Id of the channel',
//     example: '1287831564524454010',
//   })
//   id: string;
//
//   @Column({ name: 'name', type: 'text' })
//   @ApiProperty({ description: 'Channel name', example: 'Flood' })
//   name: string;
//
//   @Column({ name: 'last_message_id', type: 'text', nullable: true })
//   @ApiProperty({
//     description: 'Id of last sent message',
//     example: '1287831564524454010',
//   })
//   last_message_id: string;
//
//   @Column({ name: 'last_read_message_id', type: 'text', nullable: true })
//   @ApiProperty({
//     description: 'Id of last read message',
//     example: '1237831564524454010',
//   })
//   last_read_message_id: string;
//
//   @Column({ name: 'total_message_sent', type: 'integer', nullable: true })
//   @ApiProperty({ description: 'Total message sent', example: '329' })
//   total_message_sent: number;
//
//   @Column({ name: 'position', type: 'integer', nullable: true })
//   @ApiProperty({
//     description:
//       'Position for sorting. Same position sorting is resolved by id sorting',
//     example: '4',
//   })
//   position: number;
//
//   @Column({ name: 'parent_id', type: 'text', nullable: true })
//   @ApiProperty({
//     description:
//       'Id of parent category for channel. Id of parent channel for thread.',
//     example: '1287831564524454010',
//   })
//   parent_id: string;
//
//   /**
//    * GUILD_TEXT 0
//    * DM 1
//    * GUILD_VOICE 2
//    * GROUP_DM 3
//    * GUILD_CATEGORY 4
//    * GUILD_ANNOUNCEMENT 5
//    * ANNOUNCEMENT_THREAD 10
//    * PUBLIC_THREAD 11
//    * PRIVATE_THREAD 12
//    * GUILD_STAGE_VOICE 13
//    * GUILD_DIRECTORY 14
//    * GUILD_FORUM 15
//    * GUILD_MEDIA 16
//    */
//   @Column({ name: 'type', type: 'integer' })
//   @ApiProperty({ description: 'Channel type', example: '0' })
//   type: number;
//
//   @ManyToOne(() => Guild, (guild) => guild.channels)
//   guild: Guild;
// }
