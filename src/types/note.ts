export interface Note {
    is_favorite: any;
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

export interface NoteFormData {
    title: string;
    content: string;
    tags?: string[];
    color?: string;
    is_favorite?: boolean;
}