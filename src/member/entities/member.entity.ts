import { Guild } from "src/guild/entities/guild.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Message } from "src/message/entities/message.entity";

@Entity()
export class Member {
    @PrimaryColumn({name: "id", type: "text"})
    @ApiProperty({description: 'Id of member', example: '391660784041852929'})
    id: string;
    @Column({name: "username", type: "text"})
    @ApiProperty({description: 'Username', example: 'ment09'})
    username: string;
    @Column({name: "avatar", type: "text", nullable: true})
    @ApiProperty({description: 'Avatar hash', example: '8f8a73caf9753fd186c3c34b200ea076', nullable: true})
    avatar: string;
    @Column({name: 'nick', type: 'text', nullable: true})
    @ApiProperty({description: 'Nickname on server', example: 'Narrator', nullable: true})
    nick: string;
    @Column({name: 'joined_at', type: 'text', nullable: true})
    @ApiProperty({description: 'Time of join to the Guild', example: '2024-07-28T02:54:39.023000+00:00'})
    joined_at: string;

    @ManyToMany(() => Guild, (guild) => guild.members)
    guilds: Guild[];

    @OneToMany(() => Message, (message) => message.author)
    messages: Message[];
}
