import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {

  constructor(private prisma: PrismaService) { }

  async create(data: CreateCategoryDto) {

    await this.prisma.category.create({ data })

    return { message: "Categoria criada com sucesso" };
  }

  async findAll() {

    const users = await this.prisma.category.findMany({
      include: {
        posts: true
      }
    })

    return users;
  }

  async findOne(id: number) {

    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        posts: true
      }
    })


    if (!category) {
      throw new NotFoundException("Categoria não existe")
    }

    return category;
  }

  async update(id: number, data: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: { id }})

    if (!category) {
      throw new NotFoundException("Categoria não existe")
    }

    await this.prisma.category.update({
      where: {id},
      data
    })

    return {message: "Categoria atualizada com sucesso" };
  }

  async remove(id: number) {

    console.log(id)

    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        posts: true,
      }
    })

    if (!category) {
      throw new NotFoundException("Categoria não existe")
    }

    if (category.posts.length > 0) {
      throw new NotFoundException("Categoria contém posts relacionados")
    }


    await this.prisma.category.delete({where: {id}})

    return {message: "Categoria deletada com sucesso" };

  }
}
