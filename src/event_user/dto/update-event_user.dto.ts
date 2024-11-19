import { PartialType } from '@nestjs/mapped-types';
import { CreateEventUserDto } from './create-event_user.dto';

export class UpdateEventUserDto extends PartialType(CreateEventUserDto) {
    exitDate:Date
}
