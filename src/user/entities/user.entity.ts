import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Message } from '../../message/entities/message.entity';
import { Member } from '../../member/entities/member.entity';

@Entity()
export class User {
  @PrimaryColumn({ name: 'id', type: 'text' })
  id: string;
  @Column({ name: 'username', type: 'text' })
  username: string;
  @Column({ name: 'avatar', type: 'text', nullable: true })
  avatar: string;

  @OneToMany(() => Message, (message) => message.author)
  messages: Message[];

  @OneToMany(() => Member, (member) => member.user)
  membership: Member[];
}
