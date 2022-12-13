import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "./entities/categoria.entity";

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ) { }

    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find();
    }

    async findById(id_categoria: number): Promise<Categoria> {

        let categoria = await this.categoriaRepository.findOne({
            where: {
                id_categoria
            },
            relations: {
                produto: true
            }
        });

        if (!categoria)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

        return categoria;
    }

    async findByMoveis(moveis: string): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            where: {
                moveis: ILike(`%${moveis}%`)
            },
            relations: {
                produto: true
            }
        })
    }

    async create(categoria: Categoria): Promise<Categoria> {
        return await this.categoriaRepository.save(categoria);
    }

    async update(categoria: Categoria): Promise<Categoria> {

        let buscaCategoria = await this.findById(categoria.id_categoria);

        if (!buscaCategoria || !categoria.id_categoria)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

        return await this.categoriaRepository.save(categoria);
    }

    async delete(id_categoria: number): Promise<DeleteResult> {

        let buscaCategoria = await this.findById(id_categoria);

        if (!buscaCategoria)
            throw new HttpException('Categoria não encontrado!', HttpStatus.NOT_FOUND);

        return await this.categoriaRepository.delete(id_categoria);

    }

}