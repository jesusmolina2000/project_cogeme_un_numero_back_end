import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RaffleService } from './raffle.service';
import { Raffle } from 'src/models/raffle.model';
import { CreateRaffleDto } from './dto/create-raffle.dto';
import { UpdateRaffleDto } from './dto/update-raffle.dto';

@Controller('raffle')
export class RaffleController {
    constructor(private readonly raffleService: RaffleService){}

    @Post()
    async create(@Body() createRaffleDto: CreateRaffleDto): Promise<Raffle>{
        return await this.raffleService.create(createRaffleDto);
    }

    @Get()
    async findAll(): Promise<Raffle[]>{
        return this.raffleService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Raffle>{
        return await this.raffleService.findOne(id);
    }

    @Patch('id')
    async update(@Param('id') id: number, @Body() updateRaffleDto: UpdateRaffleDto): Promise<Raffle>{
        return await this.raffleService.update(id, updateRaffleDto);
    }

    @Delete('id')
    async delete(@Param('id') id: number){
        await this.raffleService.delete(id)
        return { message: 'User deleted successfully' };
    }


}
