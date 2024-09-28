import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID of the channel',
    example: '1265709282679066689',
  })
  id: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Channel name', example: 'Flood' })
  name: string;
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ description: 'Type of the channel', example: 0 })
  type: number;
}
