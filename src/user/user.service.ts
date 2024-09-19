import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.model';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async create(CreateUserDto: CreateUserDto): Promise<User>{
        const user= this.userRepository.create(CreateUserDto);
        return await this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        const users = await this.userRepository.find();
        return users;
    }

    async findOne(id: number): Promise<User>{
        return await this.userRepository.findOne({where: { id }})
    }
    
    async update(id: number, updateUserDto:UpdateUserDto): Promise<User>{
        await this.userRepository.update(id, updateUserDto);
        return await this.findOne(id);
    }

    async Delete(id: number): Promise<void>{
        await this.userRepository.delete(id)
    }

    /*
    newMetod(s: any): Promise<any>{
        return s;
    }
    */

}
