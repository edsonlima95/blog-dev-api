import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) { }

  async create(data: CreateUserDto) {

    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(data.password, saltOrRounds);

    data.password = hashPassword

    await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        image: data?.image,
        profile: {
          create: {
            admin: data.admin
          }
        }
      }
    })

    return { message: "Usuário cadastrado com sucesso!" };
  }

  async findAll() {

    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        profile: true
      },

    })

    return users;

  }

  async findOne(id: number) {

    const user = await this.prisma.user.findUnique({
      where: { id }, select: {
        id: true,
        name: true,
        email: true,
        image: true,
        profile: true
      }
    })

    if (!user) {
      throw new NotFoundException("Usuário não pode ser encontrado");
    }

    return user;
  }

  async update(id: number, data: UpdateUserDto) {

    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new NotFoundException("Usuário não pode ser encontrado");
    }


    if (data.password) {
      const saltOrRounds = 10;
      const hashPassword = await bcrypt.hash(data.password, saltOrRounds);

      data.password = hashPassword
    }

    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        email: data.email,
        password: data.password ? data.password : user.password,
        image: data?.image,
        profile: {
          update: {
            admin: data.admin
          },
        },
      },
    })

    return { message: "Usuario alterado com sucesso" };
  }

  async remove(id: number) {

    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new NotFoundException("Usuário não pode ser encontrado");
    }

    await this.prisma.user.delete({
      where: { id },
    })

    return {message: "Usuario deleteado com sucesso"};
  }
}
