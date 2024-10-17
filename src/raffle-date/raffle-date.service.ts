import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RaffleDate } from '../models/raffle-date.model';
import { Repository } from 'typeorm';
import { CreateRaffleDateDto } from './dto/create-raffle-date.dto';
import { UpdateRaffleDateDto } from './dto/update-raffle-date.dto';

@Injectable()
export class RaffleDateService {

    /**
     * constructor del patron repository para las fechas de rifas
     * @param raffleDateRepository 
     */
    constructor(
        @InjectRepository(RaffleDate)
        private raffleDateRepository: Repository<RaffleDate>
    ){}

    /**
     * metodo para crear una fecha de una rifa.
     * @param createRaffleDateDto 
     * @returns fecha de rifa creada.
     */
    async create(createRaffleDateDto: CreateRaffleDateDto): Promise<RaffleDate>{
        const raffleDate = this.raffleDateRepository.create(createRaffleDateDto);
        return await this.raffleDateRepository.save(raffleDate);
    }

    /**
     * metodo para listar todas las fechas existentes.
     * @returns array de las fechas de rifas creadas.
     */
    async findAll(): Promise<RaffleDate[]>{
        return await this.raffleDateRepository.find({relations: ['raffle']});
    }

    /**
     * metodo para encontrar fecha por su id.
     * @param id 
     * @returns fecha buscada por su id.
     */
    async findOne(id: number): Promise<RaffleDate>{
        return await this.raffleDateRepository.findOne({ where: {id}, relations: ['raffle']});
    }

    /**
     * metodo para actualizar fecha de una rifa.
     * @param id 
     * @param updateRaffleDateDto 
     * @returns fecha de rifa actualizada.
     */
    async update(id: number, updateRaffleDateDto: UpdateRaffleDateDto): Promise<RaffleDate> {
        await this.raffleDateRepository.update(id, updateRaffleDateDto);
        return this.findOne(id);
    }

    /**
     * metodo para eliminar fecha de rifa, no usar si es necesario.
     * @param id
     */
    async delte(id: number): Promise<void>{
        await this.raffleDateRepository.delete(id);
    }
}
