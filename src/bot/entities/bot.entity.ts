import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Guild } from '../../guild/entities/guild.entity';

@Entity()
export class Bot extends BaseEntity {
  @PrimaryColumn({name: 'appId', type: 'integer' })
  appId: number;
  @Column({name: 'token', type: 'text'})
  token: string;
  @Column({name: 'name', type: 'text'})
  name: string;
  @Column({name: 'avatar', type: 'text', nullable: true})
  avatar: string;
  @Column({name: 'status', type: 'text', nullable: true})
  status: string;

  @ManyToMany(() => Guild, (guild) => guild.bots)
  @JoinTable()
  guilds: Guild[];
}
