import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.model';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

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
        const user= this.userRepository.create(CreateUserDto);
        const salt = await bcrypt.genSalt();
        user.contraseña= await bcrypt.hash(user.contraseña, salt)
        return await this.userRepository.save(user);
    }

    /**
     * listar usuarios
     * @returns array de los usuarios
     */
    async findAll(): Promise<User[]> {
        const users = await this.userRepository.find();
        return users;
    }

    /**
     * metodo encontrar usuario por id
     * @param id 
     * @returns usuario con un array con sus rifas
     */
    async findOne(id: number): Promise<User>{
        return await this.userRepository.findOne({where: { id }, relations: ['raffles']})
    }

    /**
     * metodo encontrar usuario por email si existe
     * @param correoElectronico 
     * @returns informacion del usuario 
     */
    async findByEmail(correoElectronico: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { correoElectronico } });
      }
    
    
      /**
       * actualizar usuario por id
       * @param id 
       * @param updateUserDto 
       * @returns usuario actualizado
       */
    async update(id: number, updateUserDto:UpdateUserDto): Promise<User>{
        await this.userRepository.update(id, updateUserDto);
        return await this.findOne(id);
    }

    /**
     * eliminar usuario, no usar en caso necesario
     * @param id 
     */
    async Delete(id: number): Promise<void>{
        await this.userRepository.delete(id)
    }
}
