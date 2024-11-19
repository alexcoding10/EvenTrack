import { PartialType } from '@nestjs/mapped-types';
import { CreateStandEventDto } from './create-stand_event.dto';

export class UpdateStandEventDto extends PartialType(CreateStandEventDto) {}
