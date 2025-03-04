import { create } from "zustand";
import { supabase } from "../lib/supabase";
import {User} from '../types/user';

interface AuthState {
    user:User | null;
    session:any | null;
    loading: boolean;
    error: string | null;
    signUp: (email:string,password:string) => Promise<boolean>;
    signIn: (email: string, password: string) => Promise<boolean>;
    signOut: () => Promise<void>;
    getUser: () => Promise<void>; 
}