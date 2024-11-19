import { PartialType } from '@nestjs/mapped-types';
import { CreateStandDto } from './create-stand.dto';

export class UpdateStandDto extends PartialType(CreateStandDto) {}
