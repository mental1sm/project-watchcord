import { OmitType } from '@nestjs/mapped-types';
import { CreateChannelDto } from './create-channel.dto';

export class UpdateChannelDto extends OmitType(CreateChannelDto, ['id'] as const) {}
