import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import * as fs from 'fs';


@Injectable()
export class PostsService {

  constructor(private prisma: PrismaService) { }

  async create(data: CreatePostDto) {

    await this.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        status: data.status ? true : false,
        image: data.image,
        user: {
          connect: {
            id: data.user_id
          }
        },
        categories: {
          createMany: {
            data: data?.category_id ? data.category_id.map(category => ({ category_id: category })) : [],
          },
        }
      }
    })

    return { message: "Post cadastrado com sucesso" };

  }

  async findAll() {

    const posts = await this.prisma.post.findMany({
      include: {
        categories: true
      }
    })

    return posts;
  }

  async findOne(id: number) {

    const post = await this.prisma.post.findUnique({
      where: { id }
    })

    if (!post) {
      throw new NotFoundException("Post não existe")
    }

    return post;
  }

  async update(id: number, data: UpdatePostDto) {

    const post = await this.prisma.post.findUnique({
      where: { id }
    })

    if (!post) {
      throw new NotFoundException("Post não existe");
    }

    if (data.image && post.image) {
      await fs.promises.unlink(`./upload/posts/${post.image}`)
    }

    await this.prisma.post.update({
      data: {
        title: data.title,
        content: data.content,
        image: data.image ? data.image : post.image,
        categories: {
          createMany: {
            data: data.category_id ? data.category_id.map(category => ({ category_id: category })) : [],
          },
        }
      },
      where: { id }
    })

    return {message: "Post atualizado com sucesso"};
  }

  async remove(id: number) {

    const post = await this.prisma.post.findUnique({
      where: { id }
    })

    if (!post) {
      throw new NotFoundException("Post não foi encontrado")
    }

    if (post.image) {
      await fs.promises.unlink(`./upload/posts/${post.image}`)
    }

    await this.prisma.post.delete({
      where: { id }
    })

    return { message: "Post deletado com sucesso" };
  }

}
