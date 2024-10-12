import { Channel } from "src/channel/entities/channel.entity";
import { Member } from '../../member/entities/member.entity';

export class Guild {
  id: string;
  name: string;
  icon: string;
  channels: Channel[];
  members: Member[];

  static extractToGuild(obj: object): Guild {
    const guild = new Guild();
    guild.id = obj['id'];
    guild.icon = obj['icon'];
    guild.name = obj['name'];
    return guild;
  }
//   channelsId: string[];
//   membersId: string[];

}
