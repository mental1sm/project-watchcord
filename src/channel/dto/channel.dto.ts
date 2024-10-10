import { ApiProperty } from '@nestjs/swagger';

export class Channel {
  @ApiProperty({
    description: 'Id of the channel',
    example: '1287831564524454010',
  })
  id: string;

  @ApiProperty({ description: 'Channel name', example: 'Flood' })
  name: string;

  @ApiProperty({
    description: 'Id of last sent message',
    example: '1287831564524454010',
  })
  last_message_id: string;

  @ApiProperty({
    description: 'Id of last read message',
    example: '1237831564524454010',
  })
  last_read_message_id: string;


  @ApiProperty({ description: 'Total message sent', example: '329' })
  total_message_sent: number;

  @ApiProperty({
    description:
      'Position for sorting. Same position sorting is resolved by id sorting',
    example: '4',
  })
  position: number;

  @ApiProperty({
    description:
      'Id of parent category for channel. Id of parent channel for thread.',
    example: '1287831564524454010',
  })
  parent_id: string;

  /**
   * GUILD_TEXT 0
   * DM 1
   * GUILD_VOICE 2
   * GROUP_DM 3
   * GUILD_CATEGORY 4
   * GUILD_ANNOUNCEMENT 5
   * ANNOUNCEMENT_THREAD 10
   * PUBLIC_THREAD 11
   * PRIVATE_THREAD 12
   * GUILD_STAGE_VOICE 13
   * GUILD_DIRECTORY 14
   * GUILD_FORUM 15
   * GUILD_MEDIA 16
   */
  @ApiProperty({ description: 'Channel type', example: '0' })
  type: number;
}
