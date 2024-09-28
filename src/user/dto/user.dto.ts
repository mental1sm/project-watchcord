import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'Id of member', example: '391660784041852929' })
  id: string;
  @ApiProperty({ description: 'Username', example: 'ment09' })
  username: string;
  @ApiProperty({
    description: 'Avatar hash',
    example: '8f8a73caf9753fd186c3c34b200ea076',
    nullable: true,
  })
  avatar: string;
}
