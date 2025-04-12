import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.model';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {

    /**
     * constructor del patron repository para el servicio de usuarios
     * @param userRepository 
     */
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    //CRUD para servicio de usuario


    /**
     * metodo crear usuario
     * @param CreateUserDto 
     * @returns usuario creado guardado en la base de datos
     */
    async create(CreateUserDto: CreateUserDto): Promise<User>{
    //busca si el correo ya esta registrado
    const existingUser = await this.findByEmail(CreateUserDto.correoElectronico);
    if (existingUser) {
        throw new Error('Este correo electrónico ya está registrado.');
    }
        const user= this.userRepository.create(CreateUserDto);
        const salt = await bcrypt.genSalt();
        user.contraseña= await bcrypt.hash(user.contraseña, salt);

        try{
            await this.userRepository.save(user);
            delete user.contraseña;
            return user;
        }catch(error){
            throw new error ('Error al crear el usuario ' + error.message);
        }
    }

    /**
     * listar usuarios
     * @returns array de los usuarios
     */
    async findAll(): Promise<User[]> {
        const users = await this.userRepository.find();
        users.forEach(user => delete user.contraseña);
        return users;
    }

    /**
     * metodo encontrar usuario por id
     * @param id 
     * @returns usuario con un array con sus rifas
     */
    async findOne(id: number): Promise<User>{
        const user = await this.userRepository.findOne({where: { id }, relations: ['rifas']});
        if(user){
            delete user.contraseña;
        }
        try{
            return user;
        }catch(error){
            throw new error ('no se puede encopntrar usuario  ' + error.message);
        }
    }

    /**
     * metodo encontrar usuario por email si existe
     * @param correoElectronico 
     * @returns informacion del usuario 
     */
    async findByEmail(correoElectronico: string): Promise<User | undefined> {
        try{
            return await this.userRepository.findOne({ where: { correoElectronico } });
        }catch(error){
            throw new error ('no se pudo encontrar usuario con este email ' + error.message);
        }
      }
    
    
      /**
       * actualizar usuario por id
       * @param id 
       * @param updateUserDto 
       * @returns usuario actualizado
       */
    async update(id: number, updateUserDto:UpdateUserDto): Promise<User>{
        try{
            await this.userRepository.update(id, updateUserDto);
            return await this.findOne(id);
        }catch(error){
            throw new error ('no se pudo actualizar la informacion del usuario' + error.message);
        }
    }

    /**
     * eliminar usuario, no usar en caso necesario
     * @param id 
     */
    async Delete(id: number): Promise<void>{
        await this.userRepository.delete(id)
    }
}
