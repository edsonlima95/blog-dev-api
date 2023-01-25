import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PostExistsInterceptor implements NestInterceptor {

    async intercept(context: ExecutionContext, next: CallHandler) {

        const prisma = new PrismaClient()

        const [req] = context.getArgs();

        const post = await prisma.post.findUnique({
            where: { id: parseInt(req.params.id) }
        })

        if(!post) {
            throw new NotFoundException(["Post não existe"]);
        }

        return next.handle()

    }
}