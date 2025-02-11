import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/models/user.model';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('user')
export class UserController {

    /**
     * controlador para manejar las operaciones CRUD relacionadas con los usuarios.
     * este controlador ofrece los endpoint para crear, buscar, listar, actualizar y eliminar a los usuarios.
     * @class UserController
     */
    constructor(private readonly userService: UserService){}

    /**
     * ruta POST para crear un usuario.
     * @param createUserDto 
     * @returns usuario creado.
     */
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.create(createUserDto);
    }

    /**
     * ruta GET para listar todos los usuarios.
     * @returns array de usuarios existentes.
     */
    @Get()
    async findAll(): Promise<User[]>{
        return await this.userService.findAll();
    }

    /**
     * ruta GET para buscar un usuario por id.
     * @param id 
     * @returns usuario existente por id.
     */
    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.userService.findOne(id);
    }

    /**
     * ruta PATCH para actualizar la informacion de un usuario.
     * @param id 
     * @param updateUserDto 
     * @returns informacion del usuario actualizado.
     */
    @Patch(':id')
    @UseGuards(JwtGuard)
    async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.update(id, updateUserDto);
    }

    /**
     * ruta DELETE para eliminar usuarios, no usar solo si es necesario.
     * @param id 
     * @returns mensaje de eliminacion.
     */
    @Delete(':id')
    @UseGuards(JwtGuard)
    async delete(@Param('id') id: number) {
        await this.userService.Delete(id)
        return { message: 'Usuario eliminado correctamente.' };
    }

}