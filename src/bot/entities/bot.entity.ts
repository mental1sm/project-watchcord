import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { Guild } from '../../guild/entities/guild.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Bot extends BaseEntity {
  @PrimaryColumn({ name: 'id', type: 'text' })
  @ApiProperty({ description: 'App ID of Bot', example: '1287831564524454010' })
  id: string;
  @Column({ name: 'token', type: 'text' })
  @ApiProperty({
    description: 'Bot token',
    example:
      'MTA1OTA3MDM0NTgyODY0MjkwOA.GRkeWC.92IvfORJMMf_o-06IuUWC7_mDKROJSEnOsMGvQ',
  })
  token: string;
  @ApiProperty({
    description: 'Bot username',
    example: 'Project WatchCord Servitor',
  })
  @Column({ name: 'name', type: 'text', nullable: true })
  username: string;
  @ApiProperty({
    description: 'ID of avatar in Discord CDN',
    example: '6dacb838c4fa409aae7c1f908ac8c6a1',
  })
  @Column({ name: 'avatar', type: 'text', nullable: true })
  avatar: string;

  @ManyToMany(() => Guild, (guild) => guild.bots, { cascade: true })
  @JoinTable()
  guilds: Guild[];

  public copy(): Bot {
    const newBot = new Bot();
    newBot.avatar = this.avatar;
    newBot.id = this.id;
    newBot.username = this.username;
    newBot.token = this.token;
    newBot.guilds = this.guilds;
    return newBot;
  }
}
