import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { RaffleService } from './raffle.service';
import { Raffle } from 'src/models/raffle.model';
import { CreateRaffleDto } from './dto/create-raffle.dto';
import { UpdateRaffleDto } from './dto/update-raffle.dto';

@Controller('raffle')
export class RaffleController {

    /**
    * controlador para manejar las operaciones CRUD relacionada con las rifas.
    * este controlador ofrece endpoints  para crear, buscar, listar, actualizar y eliminar rifas.
    * @class raffleController.
    */
    constructor(private readonly raffleService: RaffleService){}

    /**
     * ruta POST para crear un rifa.
     * @param createRaffleDto 
     * @param req 
     * @returns rifa creada.
     */
    @Post()
    async create(@Body() createRaffleDto: CreateRaffleDto, @Req() req): Promise<Raffle>{
        const userID = req.user?.id || 1; 
        return await this.raffleService.create(createRaffleDto, userID);
    }

    /**
     * ruta GET para listar las rifas creadas.
     * @returns rifas creadas.
     */
    @Get()
    async findAll(): Promise<Raffle[]>{
        return this.raffleService.findAll();
    }

    /**
     * ruta GET para buscar una rifa por id.
     * @param id 
     * @returns rifa.
     */
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Raffle>{
        return await this.raffleService.findOne(id);
    }

    /**
     * ruta PATCH para actualizar una rifa por id.
     * @param id 
     * @param updateRaffleDto 
     * @returns rifa actualizada.
     */
    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateRaffleDto: UpdateRaffleDto): Promise<Raffle>{
        return await this.raffleService.update(id, updateRaffleDto);
    }

    /**
     * ruta DELETE para eliminar una rifa, no usar si es necesario.
     * @param id 
     * @returns mensaje que ha sido eliminado.
     */
    @Delete(':id')
    async delete(@Param('id') id: number){
        await this.raffleService.delete(id)
        return { message: 'User deleted successfully' };
    }


}
