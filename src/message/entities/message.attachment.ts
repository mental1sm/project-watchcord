import { AutoMap } from '@automapper/classes';

export class MessageAttachment {
  @AutoMap()
  id: string;
  @AutoMap()
  filename: string;
  @AutoMap()
  title: string;
  @AutoMap()
  url: string;
  @AutoMap()
  height?: number;
  @AutoMap()
  width?: number;
}