import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { PostsModule } from './posts/posts.module';


@Module({
  imports: [
    AuthModule,
    UserModule,
    CategoryModule,
    PostsModule,],
  controllers: [
    AuthController, AppController,],
  providers: [
    AuthService, AppService],
})
export class AppModule { }
