import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.model';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

    //constructor del patron repository para el servicio de usuarios
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    //CRUD para servicio de usuario


    //metodo crear usuario
    async create(CreateUserDto: CreateUserDto): Promise<User>{
        const user= this.userRepository.create(CreateUserDto);
        return await this.userRepository.save(user);
    }

    //metodo encontrar todos los usuarios
    async findAll(): Promise<User[]> {
        const users = await this.userRepository.find();
        return users;
    }

    //metodo encontrar un usuario por id
    async findOne(id: number): Promise<User>{
        return await this.userRepository.findOne({where: { id }, relations: ['raffles']})
    }
    
    //metodo actualizar usuario
    async update(id: number, updateUserDto:UpdateUserDto): Promise<User>{
        await this.userRepository.update(id, updateUserDto);
        return await this.findOne(id);
    }

    //metodo eliminar usuario, solo usar si es necesario
    async Delete(id: number): Promise<void>{
        await this.userRepository.delete(id)
    }
}
