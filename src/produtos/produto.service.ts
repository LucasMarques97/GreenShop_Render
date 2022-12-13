import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Repository, ILike, DeleteResult } from 'typeorm'

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>){}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find();
  }

  async findById (id_produto: number): Promise<Produto> {
    let produto = await this.produtoRepository.findOne({
      where:{
        id_produto
      }
    });
    if (!produto) {
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    }
      return produto;
  }

  async findByNome(nome: string): Promise<Produto[]>{
    return await this.produtoRepository.find({
        where:{
          nome: ILike(`%${nome}%`)
        }
    })
  }

  async create(produto: Produto): Promise<Produto>{
    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto>{
    let buscaProduto: Produto = await this.findById(produto.id_produto);
    if (!buscaProduto || !produto.id_produto){
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    }
    return await this.produtoRepository.save(produto);
  }
  async delete(id_produto: number): Promise<DeleteResult>{
    let buscaProduto = await this.findById(id_produto);
    if (!buscaProduto){
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    }
    return await this.produtoRepository.delete(id_produto);
  }
}