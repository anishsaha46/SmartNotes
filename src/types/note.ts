export interface Note {
    id:string;
    title:string;
    content: string;
    created_at:string;
    updated_at: string;
    tags:string[] | null ;
    user_id:string;
    is_favorited:boolean;
    color:string | null;
}