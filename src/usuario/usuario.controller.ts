import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { Put, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Usuario[]>{
    return this.usuarioService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/buscar/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe)id: number): Promise<Usuario>{
    return this.usuarioService.findById(id)
  }
  @UseGuards(JwtAuthGuard)
  @Get('/user/:usuario')
  @HttpCode(HttpStatus.OK)
  findByUsuario(@Param('usuario')usuario: string): Promise<Usuario>{
    return this.usuarioService.findByUsuario(usuario)
  }
  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() usuario: Usuario): Promise<Usuario>{
    return this.usuarioService.create(usuario)
  }
  @UseGuards(JwtAuthGuard)
  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  update(@Body() usuario: Usuario): Promise<Usuario>{
    return this.usuarioService.update(usuario);
  }
}
