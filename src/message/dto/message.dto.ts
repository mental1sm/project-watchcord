import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { MessageAttachment } from '../entities/message.attachment';
import { AutoMap } from '@automapper/classes';
import { Message } from '../entities/message.entity';

export class MessageDto{
  @ApiProperty({ description: 'Message id', example: '391660784041852929' })
  @AutoMap()
  id: string;
  @ApiProperty({ description: 'Channel id', example: '391660784041852929' })
  @AutoMap()
  channel_id: string;
  @ApiProperty({
    description: 'Message create timestamp',
    example: '2024-07-28T02:54:39.023000+00:00',
  })
  @AutoMap()
  timestamp: string;
  @ApiProperty({ description: 'Message type', example: 0 })
  @AutoMap()
  type: number;
  @ApiProperty({ name: 'Content of message', example: 'Hi @everyone!' })
  @AutoMap()
  content: string;

  @ApiProperty({ type: User, description: 'Author of message' })
  @AutoMap(() => User)
  author: User;

  @ApiProperty({type: MessageAttachment, description: 'Attachments'})
  @AutoMap(() => MessageAttachment)
  attachments: MessageAttachment[];
}
