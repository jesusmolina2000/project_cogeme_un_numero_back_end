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

    /**
     * creacion de una rifa y relacionada a un usuario.
     * @param createRaffleDto 
     * @param userId 
     * @returns creacion de una rifa asociada a un usuario.
     */
    async create(createRaffleDto: CreateRaffleDto, userId: number): Promise<Raffle> {
        const user = await this.userRepository.findOne({where: {id: userId }});
        const raffle = this.raffleRepository.create({...createRaffleDto, usuario:user});
        return await this.raffleRepository.save(raffle) 
    }

    /**
     * metodo listar todas las rifas.
     * @returns array de rifas creadas.
     */
    async findAll(): Promise<Raffle[]>{
        return await this.raffleRepository.find();
    }

    /**
     * metodo encontrar una rifa por su id
     * @param id 
     * @returns informacion de la rifa. 
     */
    async findOne(id: number): Promise<Raffle>{
        return await this.raffleRepository.findOne({where: { id }, relations:['numerosEscogidos']});
    }

    /**
     * metodo actualizar una rifa por id
     * @param id 
     * @param updateRaffleDto 
     * @returns informacion de la rifa actualizada.
     */
    async update(id: number, updateRaffleDto: UpdateRaffleDto): Promise<Raffle>{
        await this.raffleRepository.update(id, updateRaffleDto);
        return await this.findOne(id);
    }

    /**
     * metodo eliminar una rifa por id, no usar si es necesario
     * @param id 
     */
    async delete(id: number): Promise<void>{
        await this.raffleRepository.delete(id);
    }

}
