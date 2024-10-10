import { User } from '../../user/entities/user.entity';
import { MessageAttachment } from './message.attachment';

export class DiscordMessage {
  id: string;
  channel_id: string;
  timestamp: string;
  type: number;
  content: string;

  author: User;
  attachments: MessageAttachment[];
}