import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChoosenNumber } from '../models/choosen-number.model';
import { Repository } from 'typeorm';
import { CreateChoosenNumberDto } from './dto/create-choosen-number.dto';
import { updateChoosenNumberDto } from './dto/update-choosen-number.dto';

@Injectable()
export class ChoosenNumberService {
    constructor (
        @InjectRepository(ChoosenNumber)
        private choosenNumberRepository: Repository<ChoosenNumber>
    ){}

    async create(createChoosenNumberDto: CreateChoosenNumberDto): Promise<ChoosenNumber>{
        const choosenNumber = this.choosenNumberRepository.create(createChoosenNumberDto);
        return await this.choosenNumberRepository.save(choosenNumber);
    }

    async findAll(): Promise<ChoosenNumber[]>{
        return await this.choosenNumberRepository.find({relations: ['raffle']});
    }

    async findOne(id: number): Promise<ChoosenNumber>{
        return await this.choosenNumberRepository.findOne({where : {id}, relations: ['raffle']})
    }

    async update(id: number, updateChoosenNumberDto: updateChoosenNumberDto): Promise<ChoosenNumber> {
        await this.choosenNumberRepository.update(id, updateChoosenNumberDto);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.choosenNumberRepository.delete(id);
    }
}
