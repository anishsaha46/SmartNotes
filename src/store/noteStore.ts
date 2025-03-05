import {create} from 'zustand';
import {supabase} from '../lib/supabase';
import {Note,NoteFormData} from '../types/note';
import {format} from 'date-fns';

interface NoteState {
    notes: Note[];
    currentNote:Note | null;
    loading:boolean;
    error:string | null;
    fetchNotes: ()=>Promise<void>;
    getNoteById:(id:string) => Promise<void>;
    createNote:(noteData:NoteFormData)=>Promise<void>;
    updateNote:(is:string,noteData:Partial<NoteFormData>)=>Promise<void>;
    deleteNote:(id:string)=>Promise<void>;
    toogleFavorite:(id:string)=>Promise<void>;
}
'