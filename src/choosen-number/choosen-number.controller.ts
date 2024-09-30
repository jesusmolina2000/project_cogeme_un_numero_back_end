import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ChoosenNumberService } from './choosen-number.service';
import { CreateChoosenNumberDto } from './dto/create-choosen-number.dto';

@Controller('choosen-number')
export class ChoosenNumberController {
    constructor(private readonly choosenNumberService: ChoosenNumberService) {}

    @Post()
    async create(@Body() createChoosenNumberDto: CreateChoosenNumberDto) {
        return this.choosenNumberService.create(createChoosenNumberDto);
    }

    @Get()
    async findAll() {
        return this.choosenNumberService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.choosenNumberService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateChoosenNumberDto: CreateChoosenNumberDto) {
        return this.choosenNumberService.update(id, updateChoosenNumberDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.choosenNumberService.delete(id);
    }
}
