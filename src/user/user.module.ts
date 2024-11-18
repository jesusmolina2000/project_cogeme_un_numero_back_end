import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../models/user.model';
import { Raffle } from '../models/raffle.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Raffle]),forwardRef(()=> AuthModule)], //con forward ref se elimina la dependencia circular entre modulos
  providers: [UserService,],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
