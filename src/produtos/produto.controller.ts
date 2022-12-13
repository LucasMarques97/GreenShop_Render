import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { HttpStatus } from '@nestjs/common/enums';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Produto } from './entities/produto.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Produtos')
@ApiBearerAuth()
@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) { }

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get('/:id_produto')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id_produto', ParseIntPipe) id_produto: number): Promise<Produto> {
    return this.produtoService.findById(id_produto);
  }
  @Get('/buscar/:nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Param('nome') nome: string): Promise<Produto[]> {
    return this.produtoService.findByNome(nome);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() Produto: Produto): Promise<Produto> {
    return this.produtoService.create(Produto)
  }
  @UseGuards(JwtAuthGuard)
  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  update(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.update(produto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/deletar/:id_produto')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id_produto', ParseIntPipe) id_produto: number) {
    return this.produtoService.delete(id_produto);
  }
}
