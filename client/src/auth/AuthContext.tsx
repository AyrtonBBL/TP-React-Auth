import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api } from '../api/client';

export interface PublicUser {
  id: string;
  email: string;
  name: string;
}

export type AuthStatus = 'loading' | 'anonymous' | 'authenticated';

export interface AuthContextType {
  status: AuthStatus;
  user: PublicUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [user, setUser] = useState<PublicUser | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const data = await api<{ user: PublicUser }>('/auth/me');
        setUser(data.user);
        setStatus('authenticated');
      } catch {
        setUser(null);
        setStatus('anonymous');
      }
    }

    checkAuth();
  }, []);

  async function login(email: string, password: string) {
    const data = await api<{ user: PublicUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setUser(data.user);
    setStatus('authenticated');
  }

  async function logout() {
    try {
      await api('/auth/logout', { method: 'POST' });
    } finally {
      setUser(null);
      setStatus('anonymous');
    }
  }

  return (
    <AuthContext.Provider value={{ status, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un <AuthProvider>');
  }
  return context;
}
