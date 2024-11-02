import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaffleService } from './raffle.service';
import { RaffleController } from './raffle.controller';
import { Raffle } from '../models/raffle.model';
import { User } from '../models/user.model';
import { JwtGuard } from 'src/auth/jwt.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Raffle, User])],
  providers: [RaffleService, JwtGuard],
  controllers: [RaffleController],
})
export class RaffleModule {}