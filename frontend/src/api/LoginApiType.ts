// URL
export const loginURL = "/auth/login";

// 저장
// POST 파라미터
export interface LoginPostParamsType {
};

// POST 요청
export interface LoginPostRequestType {
    loginId: string;
    password: string;
}

// POST 응답:  백엔드로부터 받을 데이터
export interface LoginPostResponseType {
    user: User;
    token: string;
}

export interface User {
    id: number;
    loginId: string;
    nickname: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}
