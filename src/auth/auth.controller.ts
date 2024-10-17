import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

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
            return { message : 'credenciales incorrectas'};
        }
        
        return this.authService.login(user);
    }
}
