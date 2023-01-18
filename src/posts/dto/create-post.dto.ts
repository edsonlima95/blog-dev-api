export class CreatePostDto {

    id?: number;
    title: string;
    content: string;
    user_id: number;
    status: boolean;
    image?: string;
    category_id: []

}
