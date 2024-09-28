import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Bot } from '../../bot/entities/bot.entity';
import { Channel } from '../../channel/entities/channel.entity';
import { Member } from 'src/member/entities/member.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Guild {
  @PrimaryColumn({ name: 'id', type: 'text' })
  @ApiProperty({ description: 'Guild id', example: '1287831564524454010' })
  id: string;
  @Column({ name: 'name', type: 'text', nullable: true })
  @ApiProperty({ description: 'Guild title', example: 'My Server' })
  name: string;
  @ApiProperty({
    description: 'Discord icon file name',
    example: '6dacb838c4fa409aae7c1f908ac8c6a1',
  })
  @Column({ name: 'icon', type: 'text', nullable: true })
  icon: string;

  @Column({ name: 'owner_id', type: 'text', nullable: true })
  @ApiProperty({
    description: 'Owner member id',
    example: '1287831564524454010',
  })
  owner_id: string;

  @ManyToMany(() => Bot, (bot) => bot.guilds)
  bots: Bot[];

  @OneToMany(() => Channel, (channel) => channel.guild)
  channels: Channel[];

  @OneToMany(() => Member, (member) => member.guild)
  members: Member[];
}
