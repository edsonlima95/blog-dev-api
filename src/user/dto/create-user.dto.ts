import { IsBoolean, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    id?: number;

    @IsString({
        message: "Nome tem que ser no formato de texto"
    })
    @IsNotEmpty({
        message: "Nome é um campo obrigatório"
    })
    name: string;

    @IsEmail([],{
        message: "Email inválido, por favor informe um formato válido"
    })
    @IsNotEmpty({
        message: "Email é um campo obrigatório"
    })
    email: string;

    @MinLength(4,{
        message: "Senha deve conter no minimo 4 caracteres"
    })
    @IsNotEmpty({
        message: "Senha é um campo obrigatório"
    })
    password: string;

    image?: string;

    @IsBoolean({
        message: "Admin deve ser true ou false (Boolean)"
    })
    admin: boolean;

}
