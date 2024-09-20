import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raffle } from 'src/models/raffle.model';
import { Repository } from 'typeorm';
import { CreateRaffleDto } from './dto/create-raffle.dto';
import { UpdateRaffleDto } from './dto/update-raffle.dto';

@Injectable()
export class RaffleService {
    constructor(
        @InjectRepository(Raffle)
        private raffleRepository: Repository<Raffle>
    ){}

    async create(createRaffleDto: CreateRaffleDto): Promise<Raffle>{
        const raffle = this.raffleRepository.create(createRaffleDto);
        return await this.raffleRepository.save(raffle);
    }

    async findAll(): Promise<Raffle[]>{
        return await this.raffleRepository.find();
    }

    async findOne(id: number): Promise<Raffle>{
        return await this.raffleRepository.findOne({where: { id }});
    }

    async update(id: number, updateRaffleDto: UpdateRaffleDto): Promise<Raffle>{
        await this.raffleRepository.update(id, updateRaffleDto);
        return await this.findOne(id);
    }

    async delete(id: number): Promise<void>{
        await this.raffleRepository.delete(id);
    }




}
