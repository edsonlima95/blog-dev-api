import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {

  constructor(private prisma: PrismaService) { }

  async create(data: CreatePostDto) {

    const post = await this.prisma.post.create({
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
            data: data?.category_id.map(category => ({ category_id: category })),
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

  async update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

}
