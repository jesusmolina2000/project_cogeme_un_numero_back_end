import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoosenNumberController } from './choosen-number.controller';
import { ChoosenNumber } from '../models/choosen-number.model';
import { Raffle } from '../models/raffle.model';
import { ChoosenNumberService } from './choosen-number.service';
import { JwtGuard } from 'src/auth/jwt.guard';

@Module({
  imports: [TypeOrmModule.forFeature([ChoosenNumber, Raffle])],
  providers: [ChoosenNumberService, JwtGuard],
  controllers: [ChoosenNumberController],
})
export class ChoosenNumberModule {}
