import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateGuildDto {
  @IsNotEmpty()
  @IsInt()
  guildId: number;
  @IsString()
  name: string;
  @IsString()
  avatar: string;
}
