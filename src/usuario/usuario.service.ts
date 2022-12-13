import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository} from "typeorm";
import { Bcrypt } from '../auth/bcrypt/bcrypt';
import { Produto } from '../produtos/entities/produto.entity';

@Injectable()
export class UsuarioService {
  usuarioService: any;
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private bcrypt: Bcrypt
  ){}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
    });
  }

  async findById (id_usuario: number): Promise<Usuario> {
    let usuario = await this.usuarioRepository.findOne({
        where:{
            id_usuario
        },
      relations:{
        produto: true
      }
    });
    if (!usuario) {
      throw new HttpException('Usuario não encontrada!', HttpStatus.NOT_FOUND);
    }
      return usuario;
  }

  async findByUsuario(usuario: string): Promise<Usuario | undefined>{
    return await this.usuarioRepository.findOne({
        where:{
            usuario: usuario
        },
        relations:{
          produto: true
        }
    })
  }

  async create(usuario: Usuario): Promise<Usuario>{

    let buscaUsuario = await this.findByUsuario(usuario.usuario)

    if (!buscaUsuario){
        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);
    }
    throw new HttpException('Este usuário já existe!', HttpStatus.BAD_REQUEST);
  }

  async update(usuario: Usuario): Promise<Usuario>{
    let updateUsuario = await this.findById(usuario.id_usuario);
    let buscaUsuario = await this.findByUsuario(usuario.usuario)

    if (!updateUsuario)
      throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);
    
    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
    return await this.usuarioRepository.save(usuario)
  }
  
}
