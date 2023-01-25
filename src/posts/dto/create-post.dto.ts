import { IsNotEmpty } from "class-validator";

export class CreatePostDto {

    id?: number;

    @IsNotEmpty({
        message: "Campo titulo é obrigatório"
    })
    title: string;

    @IsNotEmpty({
        message: "Campo conteudo é obrigatório"
    })
    content: string;

    @IsNotEmpty({
        message: "Campo author é obrigatório"
    })
    user_id: number;

    @IsNotEmpty({
        message: "Campo status é obrigatório"
    })
    status: boolean;


    image?: string;

    @IsNotEmpty({
        message: "Campo categória é obrigatório"
    })
    category_id: []

}
