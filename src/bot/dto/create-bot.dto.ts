import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBotDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Bot token',
    example:
      'MTA1OTA3MDM0NTgyODY0MjkwOA.GRkeWC.92IvfORJMMf_o-06IuUWC7_mDKROJSEnOsMGvQ',
  })
  token: string;
}
