import { User } from '../../user/entities/user.entity';
import { MessageAttachment } from './message.attachment';
import { AutoMap } from '@automapper/classes';

export class DiscordMessage {
  @AutoMap()
  id: string;
  @AutoMap()
  channel_id: string;
  @AutoMap()
  timestamp: string;
  @AutoMap()
  type: number;
  @AutoMap()
  content: string;

  @AutoMap(() => User)
  author: User;
  @AutoMap(() => MessageAttachment)
  attachments: MessageAttachment[];
}