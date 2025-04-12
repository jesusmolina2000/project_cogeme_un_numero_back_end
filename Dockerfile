#imagen base usada para el contedor:
FROM node:20-slim
# Definimos el directorio de trabajo dentro del contenedor:
WORKDIR /app
# Copiamos el package.json y package-lock.json al contenedor:
COPY package*.json ./
COPY . .
# Instalamos las dependencias de la aplicación:
RUN npm install
# Exponemos el puerto 3000 para acceder a la aplicación:
EXPOSE 3000
# Comando para iniciar la aplicación:
CMD ["npm", "start"]