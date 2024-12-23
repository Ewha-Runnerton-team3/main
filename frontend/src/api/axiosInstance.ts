// Axios 라이브러리 가져오기
import axios from "axios";

export const BASE_URL = "http://localhost:3000" // 백엔드 서버를 배포하지 않아서 로컬 호스트 3000 포트 사용하기로 결정
//export const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL   // Vite
//export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;         // Next.js

/// Axios 인스턴스 생성
export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10초
  headers: {
    "Content-Type": "application/json", // JSON 형식
  },
});

// 최상단 Response Type
export interface ResponseType {
  isSuccess: boolean;
  code: string;
  message: string;
}
