import { Categoria } from "../../categoria/entities/categoria.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "tb_produtos"})
export class Produto {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id_produto: number;

    @Column({length: 100, nullable:false})
    @ApiProperty()
    nome: string;

    @Column({length: 1000, nullable:false})
    @ApiProperty()
    descricao: string;

    @Column('decimal', { precision: 6, scale: 2 })
    @ApiProperty()
    valor: number;

    @Column('decimal', { precision: 6, scale: 1 })
    @ApiProperty()
    peso: number;

    @Column({length: 1000, nullable:false})
    @ApiProperty()
    foto: string;

    @ApiProperty({type: ()=> Usuario})
    @ManyToOne(() => Usuario,(usuario) => usuario.produto,{
         onDelete: 'CASCADE' })
    usuario: Usuario;

    @ApiProperty({type: ()=> Categoria})
    @ManyToOne(() => Categoria,(categoria) => categoria.produto,{
         onDelete: 'CASCADE' })
    categoria: Categoria;

}
