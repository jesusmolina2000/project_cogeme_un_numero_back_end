import { PartialType } from '@nestjs/mapped-types';
import { CreateRaffleDateDto } from './create-raffle-date.dto';

export class UpdateRaffleDateDto extends PartialType(CreateRaffleDateDto) {}