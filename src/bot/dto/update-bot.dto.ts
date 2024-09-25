import {OmitType} from '@nestjs/swagger';
import { CreateBotDto } from './create-bot.dto';

export class UpdateBotDto extends OmitType(CreateBotDto, ['id'] as const) {
}
