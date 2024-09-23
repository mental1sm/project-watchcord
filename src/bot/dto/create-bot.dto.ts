import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateBotDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsInt()
  appId: number;
  @IsNotEmpty()
  @IsString()
  token: string;
}
