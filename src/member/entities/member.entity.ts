import { Guild } from 'src/guild/entities/guild.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Member {
  @PrimaryColumn({ name: 'userId', type: 'text' })
  userId: string;
  @PrimaryColumn({ name: 'guildId', type: 'text' })
  guildId: string;
  @Column({ name: 'nick', type: 'text', nullable: true })
  nick: string;
  @Column({ name: 'joined_at', type: 'text', nullable: true })
  joined_at: string;

  @ManyToOne(() => User, (user) => user.membership, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Guild, (guild) => guild.members)
  @JoinColumn({ name: 'guildId' })
  guild: Guild;
}
