import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RaffleDateService } from './raffle-date.service';
import { CreateRaffleDateDto } from './dto/create-raffle-date.dto';
import { UpdateRaffleDateDto } from './dto/update-raffle-date.dto';
import { RaffleDate } from 'src/models/raffle-date.model';

@Controller('raffle-date')
export class RaffleDateController {

    /**
    * controlador para manejar las operaciones CRUD relacionada con las fechas de rifas.
    * este controlador ofrece endpoints  para crear, buscar, listar, actualizar y eliminar fecha de rifas.
    * @class raffleDateController.
    */
    constructor (private readonly raffleDateService: RaffleDateService){}

    /**
     * ruta POST para crear un usuario 
     * @param createRaffleDateDto objeto con los datos necesarios para crear un usuario.
     * @returns usuario creado.
     */
    @Post()
    //@UseGuards(JwtGuard)
    async create(@Body() createRaffleDateDto: CreateRaffleDateDto): Promise<RaffleDate>{
        return await this.raffleDateService.create(createRaffleDateDto);
    }

    /**
     * ruta GET para listar informacion de todas las fechas de rifas.
     * @returns lista de fechas de rifas.
     */
    @Get()
    async findAll(): Promise<RaffleDate[]>{
        return await this.raffleDateService.findAll();
    }

    /**
     * ruta GET para buscar una fecha de rifa por id.
     * @param id 
     * @returns la fecha si es encontrada.
     */
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<RaffleDate>{
        return await this.raffleDateService.findOne(id);
    }

    /**
     * ruta PATCH para actualizar la informacion de la fecha de la rifa.
     * @param id 
     * @param updateRaffleDateDto 
     * @returns la rifa con la informacion actualizada.
     */
    @Patch(':id')
    //@UseGuards(JwtGuard)
    async update(@Param('id') id: number, @Body() updateRaffleDateDto:UpdateRaffleDateDto): Promise<RaffleDate>{
        return await this.raffleDateService.update(id, updateRaffleDateDto);
    }

    /**
     * ruta DELETE para eliminar una fecha de rifa por id, no usar si es necesario.
     * @param id 
     * @returns mensaje que ha sido eliminada.
     */
    @Delete(':id')
    //@UseGuards(JwtGuard)
    async delete(@Param('id')id: number){
        await this.raffleDateService.delte(id);
        return { message: 'Fecha de rifa eliminada correctamente.' };
    }
}
