import { AutoMap } from '@automapper/classes';
import { MessageAttachment } from './message.attachment';

export class Message {
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

  @AutoMap(() => MessageAttachment)
  attachments: MessageAttachment[];

  @AutoMap()
  authorId: string;
}
