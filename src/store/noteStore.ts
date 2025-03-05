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

}));