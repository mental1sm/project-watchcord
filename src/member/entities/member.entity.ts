import { Guild } from "src/guild/entities/guild.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Member {
    @PrimaryColumn({name: "userId", type: "text"})
    userId: number;
    @Column({name: "username", type: "text"})
    username: string;
    @Column({name: "memberSinceDate", type: "text"})
    memberSinceDate: Date;
    @Column({name: "status", type: "text"})
    status: string;

    @ManyToMany(() => Guild, (guild) => guild.members)
    guilds: Guild[];
}
