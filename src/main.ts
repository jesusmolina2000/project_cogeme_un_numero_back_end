import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //configuracion global de paquetes de validacion
  app.useGlobalPipes(new ValidationPipe());

   // Configuración cors, añadir origen de url de dominio mas adelante
   app.enableCors({
    //origin: 'http://cogemeunnumero.com',  // Permitir solo este origen
    methods: 'GET,POST,PUT,DELETE,PATCH, HEAD',  // Métodos permitidos
    allowedHeaders: 'Content-Type, Authorization', // Cabeceras permitidas
    credentials: true, // Permitir cookies o credenciales
  });

  //app escuchando en el puerto definido
  await app.listen(3000);
}
bootstrap();
