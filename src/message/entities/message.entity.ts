import { OmitType } from '@nestjs/mapped-types';
import { DiscordMessage } from './message.discord';
import { MessageAttachment } from './message.attachment';

export class Message extends OmitType(DiscordMessage, ['author']){
  authorId: string;
  attachments: MessageAttachment[];

  static discordMessageToMessage(msg: DiscordMessage) {
    const message = new Message();
    message.id = msg.id;
    message.authorId = msg.author.id;
    message.type = msg.type;
    message.content = msg.content;
    message.timestamp = msg.timestamp;
    message.channel_id = msg.channel_id;
    message.attachments = msg.attachments;
    return message;
  }
}
