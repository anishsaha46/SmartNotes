import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Note, NoteFormData } from '../types/note';
import { format } from 'date-fns';

interface NoteState {
  notes: Note[];
  currentNote: Note | null;
  loading: boolean;
  error: string | null;
  fetchNotes: () => Promise<void>;
  getNoteById: (id: string) => Promise<void>;
  createNote: (noteData: NoteFormData) => Promise<void>;
  updateNote: (id: string, noteData: Partial<NoteFormData>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
}

export const useNoteStore = create<NoteState>((set, get) => ({
  notes: [],
  currentNote: null,
  loading: false,
  error: null,

  fetchNotes: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      
      set({ notes: data as Note[], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  getNoteById:async(id:string)=>{
    try{
        set({loading:true,error:null});
        const {data,error}=await supabase
        .from('notes')
        .select('*')
        .eq('id',id)
        .single();
        if(error) throw error;
        set({currentNote:data as Note,loading:false});
    } catch(error){
        set({error:error.message,loading:false});
    }
  },

  createNote:async (noteData:NoteFormData)=>{
    try{
        set({loading:true,error:null});
        const {data:userData}=await supabase.auth.getUser();
        if(!userData.user)throw new Error('User not found');
        const now = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
        const {data,error}=await supabase
        .from('notes')
        .insert({
            ...noteData,
            user_id:userData.user.id,
            created_at:now,
            updated_at:now,
            is_favorite:noteData.is_favorite || false
        })
        .select();
        set((state)=>{
            notes:[data[0] as Note,...state.notes],
            loading:false
        })
    }catch(error){
        set({error:error.message,loading:false});
    }
  },

  updateNote: async (id: string, noteData: Partial<NoteFormData>) => {
    try {
      set({ loading: true, error: null });
      
      const now = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
      
      const { data, error } = await supabase
        .from('notes')
        .update({
          ...noteData,
          updated_at: now
        })
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      set((state) => ({ 
        notes: state.notes.map(note => note.id === id ? (data[0] as Note) : note),
        currentNote: state.currentNote?.id === id ? (data[0] as Note) : state.currentNote,
        loading: false 
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  deleteNote:async(id:string)=>{
    try{
        set({loading:true,error:null});
        const {error}= await supabase
        .from('notes')
        .delete()
        .eq('id',id)
        if(error) throw error;
        set((state)=>({
            notes:state.notes.filter(note=>note.id !== id),
            currentNote:state.currentNote?.id===id?null:
            state.currentNote,
            loading:false
        }));
    }catch(error:any){
        set({error:error.message,loading:false});
    }
  }



}));