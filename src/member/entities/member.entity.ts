import { Guild } from "src/guild/entities/guild.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Member {
    @PrimaryColumn({name: 'userId', type: 'text'})
    userId: string;
    @PrimaryColumn({name: 'guildId', type: 'text'})
    guildId: string;
    @Column({name: 'nick', type: 'text', nullable: true})
    @ApiProperty({description: 'Nickname on server', example: 'Narrator', nullable: true})
    nick: string;
    @Column({name: 'joined_at', type: 'text', nullable: true})
    @ApiProperty({description: 'Time of join to the Guild', example: '2024-07-28T02:54:39.023000+00:00'})
    joined_at: string;

    @ManyToOne(() => User, (user) => user.membership, {eager: true})
    @JoinColumn({name: 'userId'})
    user: User;

    @ManyToOne(() => Guild, (guild) => guild.members)
    @JoinColumn({name: 'guildId'})
    guild: Guild;
}
