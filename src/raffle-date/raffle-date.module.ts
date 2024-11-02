import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaffleDateService } from './raffle-date.service';
import { RaffleDateController } from './raffle-date.controller';
import { RaffleDate } from '../models/raffle-date.model';
import { Raffle } from '../models/raffle.model';
import { JwtGuard } from 'src/auth/jwt.guard';

@Module({
  imports: [TypeOrmModule.forFeature([RaffleDate, Raffle])],
  providers: [RaffleDateService, JwtGuard],
  controllers: [RaffleDateController],
})
export class RaffleDateModule {}
