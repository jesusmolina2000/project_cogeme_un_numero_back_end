import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


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
