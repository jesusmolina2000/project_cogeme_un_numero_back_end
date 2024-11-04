import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtGuard } from './jwt.guard';


@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: 'miClaveJWTSecreta123',  // Aquí usas la misma clave
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtGuard],
  exports: [AuthService, JwtGuard, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
