import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Guild } from '../../guild/entities/guild.entity';

@Entity()
export class Channel {
  @PrimaryColumn({name: 'id', type: 'text', unique: true})
  id: string;
  @Column({name: 'name', type: 'text'})
  name: string;
  @Column({name: 'type', type: 'integer'})
  type: number;

  @ManyToOne(() => Guild, (guild) => guild.channels)
  guild: Guild;
}
