import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * metodo para validar las credenciales del usuario.
   * @param correoElectronico El correo del usuario
   * @param contraseña contraseña del usuario
   * @returns devuelve el usuario sin la contraseñas, si no, null.
   */
  async validateUser(correoElectronico: string, contraseña: string): Promise<any> {
    const user = await this.userService.findByEmail(correoElectronico);
    if (user && await bcrypt.compare(contraseña, user.contraseña)) { // compara la contraseña encriptada
      const { contraseña, ...result } = user; // excluye la contraseña del resultado
      return result; // Retorna el usuario sin la contraseña
    }
    return null; // Si no coincide, devuelve null
  }

  /**
   * metodo para generar el JWT cuando el usuario inicia sesión
   * @param user usuario autenticado
   * @returns objeto con los tokens de acceso (JWT).
   */
  async login(user: any) {
    const payload = { correoElectronico: user.correoElectronico, sub: user.id }; // Carga útil del JWT
    console.log('payload jwt', payload);

    // genera el token de acceso y el token de actualización
    const accessToken = this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION')});

    const refreshToken = this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION')});

    return {
        access_token: accessToken,
        refresh_token: refreshToken,
    };
  }


  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      // verifica el refresh token
      const payload = this.jwtService.verify(refreshToken);
      // genera nuevo accesstoken 
      const newAccessToken = this.jwtService.sign({sub: payload.sub, correoElectronico: payload.correoElectronico},
        {expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION')});
      return newAccessToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
