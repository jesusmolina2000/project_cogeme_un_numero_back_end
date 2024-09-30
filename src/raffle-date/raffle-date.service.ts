import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RaffleDate } from '../models/raffle-date.model';
import { Repository } from 'typeorm';
import { CreateRaffleDateDto } from './dto/create-raffle-date.dto';
import { UpdateRaffleDateDto } from './dto/update-raffle-date.dto';

@Injectable()
export class RaffleDateService {
    constructor(
        @InjectRepository(RaffleDate)
        private raffleDateRepository: Repository<RaffleDate>
    ){}

    async create(createRaffleDateDto: CreateRaffleDateDto): Promise<RaffleDate>{
        const raffleDate = this.raffleDateRepository.create(createRaffleDateDto);
        return await this.raffleDateRepository.save(raffleDate);
    }

    async findAll(): Promise<RaffleDate[]>{
        return await this.raffleDateRepository.find({relations: ['raffle']});
    }

    async findOne(id: number): Promise<RaffleDate>{
        return await this.raffleDateRepository.findOne({ where: {id}, relations: ['raffle']});
    }

    async update(id: number, updateRaffleDateDto: UpdateRaffleDateDto): Promise<RaffleDate> {
        await this.raffleDateRepository.update(id, updateRaffleDateDto);
        return this.findOne(id);
    }

    async delte(id: number): Promise<void>{
        await this.raffleDateRepository.delete(id);
    }
}
