import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ChoosenNumberService } from './choosen-number.service';
import { CreateChoosenNumberDto } from './dto/create-choosen-number.dto';
import { ChoosenNumber } from 'src/models/choosen-number.model';

@Controller('choosen-number')
export class ChoosenNumberController {

    /**
    * controlador para manejar las operaciones CRUD relacionada con los numeros escogidos.
    * este controlador ofrece endpoints  para crear, buscar, listar, actualizar y eliminar los numeros escogidos.
    * @class ChoosenNumberController.
    */
    constructor(private readonly choosenNumberService: ChoosenNumberService){}

    /**
     * ruta POST para crear un numero escogido.
     * @param createChoosenNumberDto 
     * @returns numero escogido de rifa creado.
     */
    @Post()
    async create(@Body() createChoosenNumberDto: CreateChoosenNumberDto): Promise<ChoosenNumber>{
        return this.choosenNumberService.create(createChoosenNumberDto);
    }

    /**
     * ruta GET para listar numeros escogidos.
     * @returns numeros escogidos.
     */
    @Get()
    async findAll(): Promise<ChoosenNumber[]>{
        return this.choosenNumberService.findAll();
    }

    /**
     * ruta GET para buscar un numero escogido por id.
     * @param id 
     * @returns numero escogido.
     */
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ChoosenNumber> {
        return this.choosenNumberService.findOne(id);
    }

    /**
     * ruta PATCH para actualizar un numero escogido por id.
     * @param id 
     * @param updateChoosenNumberDto 
     * @returns numero escogido actualizado
     */
    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateChoosenNumberDto: CreateChoosenNumberDto): Promise<ChoosenNumber> {
        return this.choosenNumberService.update(id, updateChoosenNumberDto);
    }

    /**
     * ruta DELETE para eliminar un numero escogido por id, no usar si es necesario.
     * @param id 
     * @returns mensaje que ha sido eliminado.
     */
    @Delete(':id')
    async delete(@Param('id') id: number){
        await this.choosenNumberService.delete(id);
        return { message: 'User deleted successfully' };
    }
}
