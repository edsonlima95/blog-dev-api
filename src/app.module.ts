import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { PostsModule } from './posts/posts.module';
import { MulterModule } from '@nestjs/platform-express'


@Module({
  imports: [
    AuthModule,
    UserModule,
    CategoryModule,
    PostsModule,
    MulterModule.register({
      dest: './upload',
    })
  ], 
  controllers: [
    AuthController],
  providers: [
    AuthService],
})
export class AppModule { }
