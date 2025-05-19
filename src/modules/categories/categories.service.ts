import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/shared/configs/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(userUuid: string, data: CreateCategoryDto) {
    try {
      const user = await this.existUser(userUuid)
  
      const category = await this.prisma.category.create({
        data: {
          task_type: data.task_type,
          user_id: user.id
        }
      })
  
      return {
        message: 'Categoria criada com sucesso',
        data: category
      }
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException('Erro inesperado ao criar categoria')
    }
  }

  async index(userUuid: string) {
    try {
      const user = await this.existUser(userUuid);

      const categories = await this.prisma.category.findMany({
        where: {
          user_id: user.id
        }
      })

      return categories
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException('Erro inesperado ao listar tarefas')
    }
  }

  async show(userUuid: string, uuid: string) {
    try {
      const user = await this.existUser(userUuid);

    const category = await this.prisma.category.findUnique({
      where: {
        uuid,
        user_id: user.id
      }
    })

    return category
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erro inesperado ao detalhar categoria')
    }
  }

  async destroy(uuid: string, userUuid: string) {
    try {
      const user = await this.existUser(userUuid);

      await this.prisma.category.delete({
        where: {
          uuid,
          user_id: user.id
        }
      })

      return {
        message: 'categoria apagada com sucesso'
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erro inesperado ao deletar categoria')
    }
  }

  private async existUser(userUuid: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        uuid: userUuid
      }
    })

    if(!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }
}
