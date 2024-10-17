import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChoosenNumber } from '../models/choosen-number.model';
import { Repository } from 'typeorm';
import { CreateChoosenNumberDto } from './dto/create-choosen-number.dto';
import { updateChoosenNumberDto } from './dto/update-choosen-number.dto';

@Injectable()
export class ChoosenNumberService {

    /**
     * constructor del patron repository.
     * @param choosenNumberRepository 
     */
    constructor (
        @InjectRepository(ChoosenNumber)
        private choosenNumberRepository: Repository<ChoosenNumber>
    ){}

    /**
     * metodo crear numero escogido.
     * @param createChoosenNumberDto 
     * @returns informacion de un numero escogido.
     */
    async create(createChoosenNumberDto: CreateChoosenNumberDto): Promise<ChoosenNumber>{
        const choosenNumber = this.choosenNumberRepository.create(createChoosenNumberDto);
        return await this.choosenNumberRepository.save(choosenNumber);
    }

    /**
     * metodo listar todos los numeros escogidos
     * @returns array con los numeros.
     */
    async findAll(): Promise<ChoosenNumber[]>{
        return await this.choosenNumberRepository.find({relations: ['raffle']});
    }

    /**
     * metodo encontar numero por id.
     * @param id 
     * @returns informacion del numero escogido por id.
     */
    async findOne(id: number): Promise<ChoosenNumber>{
        return await this.choosenNumberRepository.findOne({where : {id}, relations: ['raffle']})
    }

    /**
     * metodo actualizar numero escogido por id.
     * @param id 
     * @param updateChoosenNumberDto 
     * @returns informacion del numero escogido actualizado.
     */
    async update(id: number, updateChoosenNumberDto: updateChoosenNumberDto): Promise<ChoosenNumber> {
        await this.choosenNumberRepository.update(id, updateChoosenNumberDto);
        return this.findOne(id);
    }

    /**
     * metodo eliminar numero escogido.
     * @param id 
     */
    async delete(id: number): Promise<void> {
        await this.choosenNumberRepository.delete(id);
    }
}
