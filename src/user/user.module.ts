import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../models/user.model';
import { Raffle } from '../models/raffle.model';

@Module({
  imports: [TypeOrmModule.forFeature([User, Raffle])],
  providers: [UserService,],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
