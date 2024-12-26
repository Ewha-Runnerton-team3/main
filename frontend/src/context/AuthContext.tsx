import React, { createContext, useContext, useState, ReactNode } from 'react';

// 타입 정의
interface AuthContextType {
  userId: number | null;
  setUserId: (userId: number | null) => void;
  nickname: string | null;
  setNickname: (nickname: string | null) => void;
}

// 초기값 설정
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Context Provider 컴포넌트
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ userId, setUserId, nickname, setNickname }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth Hook (Context 값 사용하기 위한 Custom Hook)
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
