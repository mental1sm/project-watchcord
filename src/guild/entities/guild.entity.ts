import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Bot } from '../../bot/entities/bot.entity';
import { Channel } from '../../channel/entities/channel.entity';
import { Member } from 'src/member/entities/member.entity';

@Entity()
export class Guild {
  @PrimaryColumn({name: 'id', type: 'text'})
  id: string;
  @Column({name: 'name', type: 'text', nullable: true})
  name: string;
  @Column({name: 'icon', type: 'text', nullable: true})
  icon: string;

  @Column({name: 'owner', type: 'text', nullable: true})
  owner: string;

  @ManyToMany(() => Bot, (bot) => bot.guilds)
  bots: Bot[];

  @OneToMany(() => Channel, (channel) => channel.guild)
  channels: Channel[];

  @ManyToMany(() => Member, (member) => member.guilds)
  @JoinTable()
  members: Member[];
}
