import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AceBase } from 'acebase';
import { Guild } from 'src/guild/entities/guild.entity';

@Injectable()
export class GuildRepository {
    constructor(@Inject("ACEBASE_DB") private readonly acebase: AceBase) {}
    async addToBot(botId: string, guilds: Guild[]) {
        const guildsRef = this.acebase.ref(`bot/${botId}/guilds`);

        for (const guild of guilds) {
            const guildRef = guildsRef.child(guild.id);

            const existingGuild = (await guildRef.get()).val();

            const updatedGuild = {
                ...existingGuild,
                ...guild
            };

            await guildRef.update(updatedGuild);
        }
    }

    async getAllGuilds(botId: string): Promise<Guild[]> {
        const snapshot = await this.acebase.ref(`bot/${botId}/guilds`).get({exclude: ['*/channels']});
        const guildsObj = snapshot.val();

        if (!guildsObj) {
            return [];
        }

        return Object.values(guildsObj);
    }

    async getOneGuild(botId: string, guildId: string): Promise<Guild> {
        const snapshot = this.acebase.ref(`bot/${botId}/guilds/${guildId}`).get();
        const guild = (await snapshot).val();
        if (!guild) {throw new NotFoundException();}
        return guild;
    }

    async channelsCount(botId: string, guildId: string) {
        return await this.acebase.ref<Guild>(`bot/${botId}/guilds/${guildId}/channels`).count();
    }

    async membersCount(botId: string, guildId: string) {
        return await this.acebase.ref<Guild>(`bot/${botId}/guilds/${guildId}/members`).count();
    }
}