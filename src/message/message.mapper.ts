import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper, MappingProfile } from '@automapper/core';
import { DiscordMessage } from './entities/message.discord';
import { Message } from './entities/message.entity';
import { MessageDto } from './dto/message.dto';

export class MessageProfile extends AutomapperProfile {
  constructor(@InjectMapper() readonly mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, DiscordMessage, Message, forMember(dest => dest.authorId, mapFrom(src => src.author.id)));
      createMap(mapper, Message, MessageDto)
    }
  }
}