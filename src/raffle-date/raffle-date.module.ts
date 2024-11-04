import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaffleDateService } from './raffle-date.service';
import { RaffleDateController } from './raffle-date.controller';
import { RaffleDate } from '../models/raffle-date.model';
import { Raffle } from '../models/raffle.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([RaffleDate, Raffle]), AuthModule],
  providers: [RaffleDateService, ],
  controllers: [RaffleDateController],
})
export class RaffleDateModule {}
