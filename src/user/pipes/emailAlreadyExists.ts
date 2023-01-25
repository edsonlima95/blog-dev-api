import { PipeTransform, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class EmailAlreadyExists implements PipeTransform {

    async transform(data: CreateUserDto) {


        const prisma = new PrismaClient();

        const { email } = data

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (user) {
            throw new InternalServerErrorException(["Email já existe, informe um email diferente"]);
        }

        return data;

    }
}