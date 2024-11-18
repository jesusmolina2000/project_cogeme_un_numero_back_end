import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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
   * @returns objeto con el token de acceso (JWT).
   */
  async login(user: any) {
    const payload = { correoElectronico: user.correoElectronico, sub: user.id }; // Carga útil del JWT
    console.log('payload jwt', payload);
    return {
      access_token: this.jwtService.sign(payload), // Genera el token usando el payload
    };
  }
}
