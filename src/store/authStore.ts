import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User } from '../types/user';

interface AuthState {
  user: User | null;
  session: any | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  getUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: false,
  error: null,

  signUp: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      set({ 
        user: data.user,
        session: data.session,
        loading: false 
      });
      
      return true;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      return false;
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      set({ 
        user: data.user,
        session: data.session,
        loading: false 
      });
      
      return true;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      return false;
    }
  },

  signOut: async () => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      set({ user: null, session: null, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  getUser: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (data.session) {
        const { data: userData } = await supabase.auth.getUser();
        set({ 
          user: userData.user,
          session: data.session,
          loading: false 
        });
      } else {
        set({ user: null, session: null, loading: false });
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));