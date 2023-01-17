import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {

  constructor(private prisma: PrismaService) { }

  async create(data: CreatePostDto) {

    const post = await this.prisma.post.create({
      data: {
        title: data.titulo,
        content: data.content,
        status: data.status ? true : false,
        image: data.image,
        user_id: data.user_id,
        categories: {
          connect: [{
            id: 2
          }]
        }
      }
    })

    return post;

  }

  async findAll() {

    const posts = await this.prisma.post.findMany({
      include: {
        categories: true
      }
    })

    return posts;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

}
