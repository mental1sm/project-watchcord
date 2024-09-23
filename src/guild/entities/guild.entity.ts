import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Bot } from '../../bot/entities/bot.entity';
import { Channel } from '../../channel/entities/channel.entity';

@Entity()
export class Guild {
  @PrimaryColumn({name: 'guildId', type: 'integer'})
  guildId: number;
  @Column({name: 'name', type: 'text', nullable: true})
  name: string;
  @Column({name: 'avatar', type: 'text', nullable: true})
  avatar: string;

  @ManyToMany(() => Bot, (bot) => bot.guilds)
  bots: Bot[];

  @OneToMany(() => Channel, (channel) => channel.guild)
  channels: Channel[];
}
