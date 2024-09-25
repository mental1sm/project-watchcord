import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Guild } from '../../guild/entities/guild.entity';

@Entity()
export class Bot extends BaseEntity {
  @PrimaryColumn({name: 'id', type: 'text' })
  id: string;
  @Column({name: 'token', type: 'text'})
  token: string;
  @Column({name: 'name', type: 'text', nullable: true})
  username: string;
  @Column({name: 'avatar', type: 'text', nullable: true})
  avatar: string;
  @Column({name: 'status', type: 'text', nullable: true})
  status: string;

  @ManyToMany(() => Guild, (guild) => guild.bots, {cascade: true})
  @JoinTable()
  guilds: Guild[];
}
