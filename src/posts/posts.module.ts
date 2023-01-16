import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/services/prisma.service';
import { MulterModule } from '@nestjs/platform-express'

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
  imports: [
    MulterModule.register({
      dest: './upload/post',
    })
  ]
})
export class PostsModule { }
