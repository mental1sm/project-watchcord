import { Inject, NotFoundException } from "@nestjs/common";
import { AceBase } from "acebase";
import { Channel } from "src/channel/entities/channel.entity";
import { Guild } from "src/guild/entities/guild.entity";

export class ChannelRepository {
    constructor(@Inject("ACEBASE_DB") private readonly acebase: AceBase) {}

    async saveChannels(botId: string, guildId: string, channels: Channel[]) {
        const channelsRef = this.acebase.ref(`bot/${botId}/guilds/${guildId}/channels`);
        for (const channel of channels) {
            const existingChannelData = (await channelsRef.child(channel.id).get()).val();

            const updatedChannel = {
                ...existingChannelData,  // Сохраняем старые данные
                ...channel               // Обновляем поля
            };

            await channelsRef.child(channel.id).update(updatedChannel);
        }
    }

    async getAllChannels(botId: string, guildId: string) {
        const channelsObj = (await this.acebase.ref<Channel[]>(`bot/${botId}/guilds/${guildId}/channels`).get({exclude: ['*/messages']})).val();
        if (!channelsObj) return [];
        return Object.values(channelsObj);
    }

    async getOneChannel(botId: string, guildId: string, channelId: string) {
        const snapshot = await this.acebase.ref<Channel>(`bot/${botId}/guilds/${guildId}/channels/${channelId}`).get();
        const channel = snapshot.val();
        if (!channel) throw new NotFoundException();
        return channel;
    }
}