import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateChannelDto {
  @IsNotEmpty()
  @IsInt()
  channelId: number;
  @IsNotEmpty()
  @IsString()
  channelName: string;
  @IsNotEmpty()
  @IsString()
  channelType: string;
}
