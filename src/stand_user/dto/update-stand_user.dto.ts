import { PartialType } from '@nestjs/mapped-types';
import { CreateStandUserDto } from './create-stand_user.dto';

export class UpdateStandUserDto extends PartialType(CreateStandUserDto) {
    exitDate:Date
}
