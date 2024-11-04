import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
  /**
   * constructor para el proteccion guard de las rutas 
   * @param jwtService 
   */
  constructor (private jwtService: JwtService){}

  /**
   * Metodo para verificar tokens y validar uso de las rutas protegidas 
   * @param context 
   * @returns 
   */
  async canActivate(context: ExecutionContext,): Promise<boolean>{
    const request : Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization; 

    if(!authHeader || !authHeader.startsWith('bearer')){ // revisa que llegue un token
      throw new UnauthorizedException('Token no propoercionado');
    }

    const token = authHeader.split(' ')[1];//extrae el token del header de la peticion  

    try{
      const payload = this.jwtService.verify(token); // vrefica el token 
      (request as any).user=payload; // se hace conversion de tipo request para poder usar el tipo user y luego asocia  el verificado para usarlo despues
      return true; // token valido y permite acceso
    }catch(error){
      throw new UnauthorizedException('token invalido o expirado') 
    }

  }
}
