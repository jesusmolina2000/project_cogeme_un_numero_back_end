import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoosenNumberController } from './choosen-number.controller';
import { ChoosenNumber } from '../models/choosen-number.model';
import { Raffle } from '../models/raffle.model';
import { ChoosenNumberService } from './choosen-number.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChoosenNumber, Raffle])],
  providers: [ChoosenNumberService],
  controllers: [ChoosenNumberController],
})
export class ChosenNumberModule {}
