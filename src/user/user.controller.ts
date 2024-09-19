import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/models/user.model';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.create(createUserDto); // Devuelve el usuario creado
    }

    @Get()
    async findAll(): Promise<User[]>{
        return await this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.userService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.update(id, updateUserDto);
  }


    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.userService.Delete(id)
        return { message: 'User deleted successfully' };
    }



}
