import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Guild } from '../../guild/entities/guild.entity';

@Entity()
export class Channel {
  @PrimaryColumn({name: 'channelId', type: 'integer', unique: true})
  channelId: number;
  @Column({name: 'name', type: 'text'})
  name: string;
  @Column({name: 'type', type: 'text'})
  type: string;

  @ManyToOne(() => Guild, (guild) => guild.channels)
  guild: Guild;
}
