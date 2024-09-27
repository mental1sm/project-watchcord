import { ApiProperty } from "@nestjs/swagger";
import { Member } from "src/member/entities/member.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Message {
    @PrimaryColumn({name: 'id', type: 'text'})
    @ApiProperty({description: 'Message id', example: '391660784041852929'})
    id: string;
    @Column({name: 'channel_id', type: 'text'})
    @ApiProperty({description: 'Channel id', example: '391660784041852929'})
    channel_id: string;
    @Column({name: 'timestamp', type: 'text'})
    @ApiProperty({description: 'Message create timestamp', example: '2024-07-28T02:54:39.023000+00:00'})
    timestamp: string;
    @Column({name: 'type', type: 'integer'})
    @ApiProperty({description: 'Message type', example: 0})
    type: number;
    @Column({name: 'content', type: 'text', nullable: true})
    @ApiProperty({name: 'Content of message', example: "Hi @everyone!", nullable: true})
    content: string;

    @ManyToOne(() => Member, (member) => member.messages)
    @ApiProperty({type: Member, description: 'Author of message'})
    author: Member;
}
