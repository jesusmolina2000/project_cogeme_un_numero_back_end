import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../models/user.model';
import { Raffle } from '../models/raffle.model';
import { JwtGuard } from 'src/auth/jwt.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User, Raffle])],
  providers: [UserService, JwtGuard],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
