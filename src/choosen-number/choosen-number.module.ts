import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoosenNumberController } from './choosen-number.controller';
import { ChoosenNumber } from '../models/choosen-number.model';
import { Raffle } from '../models/raffle.model';
import { ChoosenNumberService } from './choosen-number.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChoosenNumber, Raffle]), AuthModule],
  providers: [ChoosenNumberService,],
  controllers: [ChoosenNumberController],
})
export class ChoosenNumberModule {}
