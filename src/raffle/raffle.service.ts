import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raffle } from '../models/raffle.model';
import { Repository } from 'typeorm';
import { CreateRaffleDto } from './dto/create-raffle.dto';
import { UpdateRaffleDto } from './dto/update-raffle.dto';
import { User } from '../models/user.model';

@Injectable()
export class RaffleService {
    constructor(
        @InjectRepository(Raffle)
        private raffleRepository: Repository<Raffle>,

        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async create(createRaffleDto: CreateRaffleDto, userId: number): Promise<Raffle> {
        const user = await this.userRepository.findOne({where: {id: userId }});
        const raffle = this.raffleRepository.create({...createRaffleDto, usuario:user});
        return await this.raffleRepository.save(raffle) 
    }

    async findAll(): Promise<Raffle[]>{
        return await this.raffleRepository.find();
    }

    async findOne(id: number): Promise<Raffle>{
        return await this.raffleRepository.findOne({where: { id }, relations:['numerosEscogidos']});
    }

    async update(id: number, updateRaffleDto: UpdateRaffleDto): Promise<Raffle>{
        await this.raffleRepository.update(id, updateRaffleDto);
        return await this.findOne(id);
    }

    async delete(id: number): Promise<void>{
        await this.raffleRepository.delete(id);
    }

}
