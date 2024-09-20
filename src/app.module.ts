import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { User } from './models/user.model';
import { Raffle } from './models/raffle.model';
import { RaffleDate } from './models/raffle-date.model';
import { ChoosenNumber } from './models/choosen-number.model';
import { RaffleModule } from './raffle/raffle.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { RaffleController } from './raffle/raffle.controller';
import { RaffleService } from './raffle/raffle.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'cogeme-un-numero',
      entities: [join(__dirname, '**', '*.model.{js,ts}')],
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Raffle, RaffleDate, ChoosenNumber]),
    UserModule,
    RaffleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}