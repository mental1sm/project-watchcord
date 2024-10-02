import { ApiProperty } from '@nestjs/swagger';

export class GetBotDto{
  @ApiProperty({ description: 'App ID of Bot', example: '1287831564524454010' })
  id: string;

  @ApiProperty({
    description: 'Bot token',
    example:
      'MTA1OTA3MDM0NTgyODY0MjkwOA.GRkeWC.92IvfORJMMf_o-06IuUWC7_mDKROJSEnOsMGvQ',
  })
  token: string;

  @ApiProperty({
    description: 'Bot username',
    example: 'Project WatchCord Servitor',
  })
  username: string;

  @ApiProperty({
    description: 'ID of avatar in Discord CDN',
    example: '6dacb838c4fa409aae7c1f908ac8c6a1',
  })
  avatar: string;

  @ApiProperty({
    description: 'Count of Guilds where Bot has membership',
    example: 1
  })
  guilds_count: number;
}