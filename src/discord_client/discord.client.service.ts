import { HttpService } from '@nestjs/axios';
import { Injectable, Scope } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Bot } from '../bot/entities/bot.entity';
import { Guild } from '../guild/entities/guild.entity';
import { Channel } from '../channel/entities/channel.entity';
import { Member } from '../member/entities/member.entity';

@Injectable({scope: Scope.REQUEST})
export class DiscordClientService {
    private readonly baseUrl: string = 'https://discord.com/api/v10';
    private headers: object;
    private token: string;
    public appId: string;

    constructor(private readonly httpService: HttpService) {
        this.headers = { "Authorization": `Bot ???` };
    }

    public setToken(token: string): void {
        this.token = token;
        this.headers = { "Authorization": `Bot ${this.token}` }
    }

    private async get<T>(endpoint: string): Promise<AxiosResponse<T>> {
        return this.httpService.axiosRef.get(`${this.baseUrl}${endpoint}`, { headers: this.headers });
    }

    fetchBot(): Promise<AxiosResponse<Bot>> {
        return this.get('/users/@me');
    }

    async fetchGuilds(): Promise<AxiosResponse<Guild[]>> {
        return this.get('/users/@me/guilds');
    }

    async fetchGuild(id: string): Promise<AxiosResponse<Guild>> {
        return this.get(`/guilds/${id}`);
    }

    async fetchChannels(guildId: string): Promise<AxiosResponse<Channel[]>> {
        return this.get(`/guilds/${guildId}/channels`);
    }

    async fetchChannel(channelId: string): Promise<AxiosResponse<Channel>> {
        return this.get(`/channels/${channelId}`);
    }

    async fetchMembers(guildId: string): Promise<AxiosResponse<Member[]>> {
        return this.get(`/guilds/${guildId}/members`);
    }

    async fetchMessages(channelId: string, options: MessageFetchingOptions): Promise<AxiosResponse<any>> {
        const queryOptions = new URLSearchParams();
        if (options.limit !== null) queryOptions.append('limit', options.limit.toString());
        if (options.after !== null) queryOptions.append('after', options.after);
        if (options.before !== null) queryOptions.append('before', options.before);
        if (options.around !== null) queryOptions.append('around', options.around);

        const queryString = queryOptions.toString() ? `?${queryOptions.toString()}` : '';
        return this.get(`/channels/${channelId}/messages${queryString}`);
    }
}