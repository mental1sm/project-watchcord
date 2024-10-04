import { ApiProperty } from '@nestjs/swagger';

export class GuildDto {
  @ApiProperty({ description: 'Guild id', example: '1287831564524454010' })
  id: string;
  @ApiProperty({ description: 'Guild title', example: 'My Server' })
  name: string;
  @ApiProperty({
    description: 'Discord icon file name',
    example: '6dacb838c4fa409aae7c1f908ac8c6a1',
  })
  icon: string;
  @ApiProperty({
    description: 'Number of channels in Guild',
    example: 5
  })
  channelsCount: number;
  @ApiProperty({
    description: 'Number of members in Guild',
    example: 3
  })
  membersCount: number;
}