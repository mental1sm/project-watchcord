import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateGuildDto {
  @IsNotEmpty()
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  icon: string;
}
