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
        try{
        const user = await this.userRepository.findOne({where: {id: userId }});
        const raffle = this.raffleRepository.create({...createRaffleDto, usuario:user});
        return await this.raffleRepository.save(raffle) 
        }catch(error){
            throw new error ('no se pudo crear la rifa ' + error.message);
        }
    }

    /**
     * metodo listar todas las rifas.
     * @returns array de rifas creadas.
     */
    async findAll(): Promise<Raffle[]>{
        const raffles = await this.raffleRepository.find({relations: ['usuario']});
        raffles.forEach(raffle => {
            if (raffle.usuario) {
                const { contraseña, ...usuarioSinContraseña } = raffle.usuario; // excluye la contraseña
                raffle.usuario = usuarioSinContraseña as User; // casting del ojetosin la contraseña
            }
        });

        return raffles;
    }

    /**
     * metodo encontrar una rifa por su id
     * @param id 
     * @returns informacion de la rifa. 
     */
    async findOne(id: number): Promise<Raffle>{
        const raffle = await this.raffleRepository.findOne({where: { id }, relations:['numerosEscogidos', 'usuario']});
        if(raffle.usuario){
            const { contraseña, ...usuarioSinContraseña } = raffle.usuario; // excluye la contraseña
            raffle.usuario = usuarioSinContraseña as User; // casting del ojetosin la contraseña
        }
        return raffle;
    }

    /**
     * metodo encontrar rifas por id de usuario
     * @param userId 
     * @returns array de rifas asociadas al usuario
     */
    async findByUserId(userId: number): Promise<Raffle[]> {
        const raffles = await this.raffleRepository.find({ where: { usuario: { id: userId } }, relations: ['usuario'] });
        raffles.forEach(raffle => {
            if (raffle.usuario) {
                raffle.usuario = { id: raffle.usuario.id } as any; // Dejar solo el ID del usuario
            }
        });
        return raffles;
    }


    /**
     * metodo actualizar una rifa por id
     * @param id 
     * @param updateRaffleDto 
     * @returns informacion de la rifa actualizada.
     */
    async update(id: number, updateRaffleDto: UpdateRaffleDto): Promise<Raffle>{
        try{
        await this.raffleRepository.update(id, updateRaffleDto);
        return await this.findOne(id);
        }catch(error){
            throw new error('no se pudo actualizar la rifa ' + error.message);
        }
    }

    /**
     * metodo eliminar una rifa por id, no usar si es necesario
     * @param id 
     */
    async delete(id: number): Promise<void>{
        await this.raffleRepository.delete(id);
    }

}
