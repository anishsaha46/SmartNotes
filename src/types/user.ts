export interface User {
    id: string;
    email?: string;
    username?: string;
    avatar_url?: string;
  }
  
  export interface Session {
    user: User | null;
    session: {
      access_token: string;
      refresh_token: string;
      expires_at: number;
    } | null;
  }