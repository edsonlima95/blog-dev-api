export class CreatePostDto {

    id?: number;
    titulo: string;
    content: string;
    user_id: number;
    status: boolean;
    image?: string;
    

}
