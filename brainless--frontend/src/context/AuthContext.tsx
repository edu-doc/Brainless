import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define o tipo do contexto
interface AuthContextType {
  userId: string | null;
  setUserId: (id: string | null) => void;
}

// Cria o contexto com um valor inicial vazio
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define o tipo das props, incluindo `children`
interface AuthProviderProps {
  children: ReactNode;
}

// Componente provedor do contexto
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto de autenticação em qualquer componente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
