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
import { UserModule } from './user/user.module';
import { RaffleDateModule } from './raffle-date/raffle-date.module';
import { ChoosenNumberModule } from './choosen-number/choosen-number.module';
import { AuthModule } from './auth/auth.module';
import { JwtGuard } from './auth/jwt.guard';

@Module({
  imports: [
    //recordatorio: usar variables de entorno
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
    RaffleDateModule,
    ChoosenNumberModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtGuard],
})
export class AppModule {}