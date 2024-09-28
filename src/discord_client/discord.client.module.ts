import { Module } from '@nestjs/common';
import { DiscordClientService } from './discord.client.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [DiscordClientService],
  exports: [DiscordClientService],
})
export class DiscordClientModule {}
