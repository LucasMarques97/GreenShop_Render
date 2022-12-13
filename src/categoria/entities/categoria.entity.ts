import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Produto } from "../../produtos/entities/produto.entity";
import { ProdutoService } from "../../produtos/produto.service";

@Entity({name: "tb_categorias"})
export class Categoria {

    @PrimaryGeneratedColumn()  
    @ApiProperty()
    id_categoria: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    moveis: string

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    ambiente: string

    @ApiProperty({type: ()=> Produto})
    @OneToMany(() => Produto, (produto) => produto.categoria)
    produto: Produto[]
}