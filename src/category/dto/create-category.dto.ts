import { IsString, IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
   

    id?: number;

    @IsString({
        message: "Formato inválido, somente texto"
    })
    @IsNotEmpty({
        message: "Titulo é um campo obrigatório"
    })
    title: string;
    
    @IsString({
        message: "Formato inválido, somente texto"
    })
    description?: string;

}
