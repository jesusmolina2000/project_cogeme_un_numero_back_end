import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaffleService } from './raffle.service';
import { RaffleController } from './raffle.controller';
import { Raffle } from '../models/raffle.model';
import { User } from '../models/user.model';
import { JwtGuard } from '../auth/jwt.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Raffle, User]), AuthModule],
  providers: [RaffleService, JwtGuard],
  controllers: [RaffleController],
})
export class RaffleModule {}