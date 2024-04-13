'use client';

import { IUser } from '@/types/authType';
import React, { useState, createContext } from 'react';

export interface AuthContextProps {
  children: React.ReactNode;
}

interface AuthState {
  loading: boolean;
  error: string | null;
  data: IUser | null;
}
interface AuthStateForContext extends AuthState {
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}
const initialValue: AuthStateForContext = {
  loading: false,
  error: null,
  data: null,
  setAuthState: () => { },
};

export const AuthenticationContext = createContext(initialValue);
export default function AuthContext({ children }: AuthContextProps) {
  const [authState, setAuthState] = useState<AuthState>({
    loading: false,
    data: null,
    error: null,
  });
  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
