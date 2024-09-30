import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RaffleDateService } from './raffle-date.service';
import { CreateRaffleDateDto } from './dto/create-raffle-date.dto';
import { UpdateRaffleDateDto } from './dto/update-raffle-date.dto';

@Controller('raffle-date')
export class RaffleDateController {
    constructor (private readonly raffleDateService: RaffleDateService){}

    @Post()
    async create(@Body() createRaffleDateDto: CreateRaffleDateDto){
        return await this.raffleDateService.create(createRaffleDateDto);
    }

    @Get()
    async findAll(){
        return await this.raffleDateService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number){
        return await this.raffleDateService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateRaffleDateDto:UpdateRaffleDateDto){
        return await this.raffleDateService.update(id, updateRaffleDateDto);
    }

    @Delete(':id')
    async delete(@Param('id')id: number){
        return await this.raffleDateService.delte(id);
    }
}
