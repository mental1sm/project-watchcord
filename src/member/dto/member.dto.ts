import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/dto/user.dto';

export class MemberDto {
  @ApiProperty({
    description: 'Nickname on server',
    example: 'Narrator',
    nullable: true,
  })
  nick: string;
  @ApiProperty({
    description: 'Time of join to the Guild',
    example: '2024-07-28T02:54:39.023000+00:00',
  })
  joined_at: string;

  @ApiProperty({ description: 'User object' })
  user: UserDto;
}
