import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateGuildDto } from './create-guild.dto';

export class UpdateGuildDto extends OmitType(CreateGuildDto, ['guildId' as const]) {}
