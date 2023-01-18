import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Res, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import fs from 'fs'


@Controller('posts')
export class PostsController {


  constructor(private readonly postsService: PostsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './upload/posts',
      filename: (req, file, callback) => {
        const fileExtName = extname(file.originalname);
        callback(null, `${randomUUID()}${fileExtName}`);
      }
    })

  }))
  async create(@Body() data: CreatePostDto, @UploadedFile() file: Express.Multer.File) {

    data.image = file?.filename ? file.filename : null

    data.user_id = Number(data.user_id)

    return this.postsService.create(data);

  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {

    //  fs.unlink(`./upload/posts/8d1817a0-4e4a-4efc-a03a-acacc3b465a8.jpeg`, (err) => {
    //   if (err) throw err;
    //   console.log('path/file.txt was deleted');
    // })

    return this.postsService.update(Number(id), updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }

  @Get('/show-image/:image')
  showImage(@Param('image') image, @Res() response) {

    return response.sendFile(image, { root: './upload/posts' });
  }


}
