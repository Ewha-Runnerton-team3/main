import { BASE_URL } from "../api/axiosInstance";

export const PATHS = {
    HOME: '/',
    HISTORY: '/history',
    FAVORITE: '/favorite',
    RECOMMEND: '/recommend',
    LOGIN: '/login',
    SIGNUP: '/signup',
    KAKAO_REDIRECT: `${BASE_URL}/auth/kakao`,
    KAKAO_CALLBACK: '/auth/kakao/callback',
};