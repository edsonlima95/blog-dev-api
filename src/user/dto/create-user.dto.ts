export class CreateUserDto {

    id?: number;
    name: string;
    email: string;
    password: string;
    image?: string;
    admin: boolean;

}
