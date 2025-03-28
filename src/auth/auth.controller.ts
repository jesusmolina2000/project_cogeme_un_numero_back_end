import { Body, Controller, HttpException, HttpStatus, Post, Headers, Header } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
//import { RefreshTokenDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {

    /**
     * constructor para el controlador de autenticacion.
     * @param authService 
     * @param jwtService 
     */
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ){}

    /**
     * ruta POST para hacer ingreso de sesion.
     * @param loginDto 
     * @returns token de acceso manejado por JWT.
     */
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<any>{
        const user = await this.authService.validateUser(loginDto.correoElectronico, loginDto.contraseña);

        if(!user){
            throw new HttpException('Credenciales incorrectas', HttpStatus.UNAUTHORIZED);
        }
        
        return this.authService.login(user);
    }

    @Post('refresh')
    async refresh(@Headers('Authorization') authorization: string): Promise<any> {
        // valida que el encabezado sea correcto 
        if (!authorization || !authorization.startsWith('Bearer ')) {
          throw new HttpException('Refresh token is required', HttpStatus.BAD_REQUEST);
        }
    
        // Extraer el refresh token del encabezado
        const refreshToken = authorization.split(' ')[1];
    
        try {
          const newAccessToken = await this.authService.refreshAccessToken(refreshToken);
          return { access_token: newAccessToken };
        } catch (error) {
          throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
        }
    }
}