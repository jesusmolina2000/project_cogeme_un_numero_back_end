#imagen base usada para el contedor:
FROM node:20-slim
#directorio de trabajo dentro del contenedor:
WORKDIR /app
#copia el package.json y package-lock.json al contenedor:
COPY package*.json ./
#instala las dependencias de la aplicación:
RUN npm install
COPY . .
#puerto 3000 para acceder a la aplicación:
EXPOSE 3000
#iniciar la aplicación:
CMD ["npm", "start"]