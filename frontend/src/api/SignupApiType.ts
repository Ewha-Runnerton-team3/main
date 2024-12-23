// URL
export const signupURL = "/auth/signup";

// 저장
// POST 파라미터
export interface SignupPostParamsType {
};

// POST 요청
export interface SignupPostRequestType {
    loginId: string;
    password: string;
    nickname: string;
}

// POST 응답:  백엔드로부터 받을 데이터
import { User } from "./LoginApiType";
export interface SignupPostResponseType {
    user: User;
    token: string;
}
