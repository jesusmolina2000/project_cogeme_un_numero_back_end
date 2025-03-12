import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { RaffleService } from './raffle.service';
import { Raffle } from 'src/models/raffle.model';
import { CreateRaffleDto } from './dto/create-raffle.dto';
import { UpdateRaffleDto } from './dto/update-raffle.dto';
import { JwtGuard } from '../auth/jwt.guard';

//@UseGuards(JwtGuard)
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
    @UseGuards(JwtGuard)
    async create(@Body() createRaffleDto: CreateRaffleDto, @Req() req): Promise<Raffle>{
        console.log('req.user', req.user);
        if (!req.user || !req.user.sub){
            throw new Error('User not authenticated');
        }
          const userID = req.user.sub; // Asegúrate de que req.user siempre esté definido
          return await this.raffleService.create(createRaffleDto, userID);
    }

    /**
     * ruta GET para listar las rifas creadas.
     * @returns rifas creadas.
     */
    @Get()
    @UseGuards(JwtGuard)
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
     * ruta GET para buscar rifas por id de usuario.
     * @param userId 
     * @returns array de rifas asociadas al usuario.
     */
    @Get('user/:userId')
    //@UseGuards(JwtGuard)
    async findByUserId(@Param('userId') userId: number): Promise<Raffle[]> {
        return await this.raffleService.findByUserId(userId);
    }

    /**
     * ruta PATCH para actualizar una rifa por id.
     * @param id 
     * @param updateRaffleDto 
     * @returns rifa actualizada.
     */
    @Patch(':id')
    @UseGuards(JwtGuard)
    async update(@Param('id') id: number, @Body() updateRaffleDto: UpdateRaffleDto): Promise<Raffle>{
        return await this.raffleService.update(id, updateRaffleDto);
    }

    /**
     * ruta DELETE para eliminar una rifa, no usar si es necesario.
     * @param id 
     * @returns mensaje que ha sido eliminado.
     */
    @Delete(':id')
    @UseGuards(JwtGuard)
    async delete(@Param('id') id: number){
        await this.raffleService.delete(id)
        return { message: 'User deleted successfully' };
    }


}
