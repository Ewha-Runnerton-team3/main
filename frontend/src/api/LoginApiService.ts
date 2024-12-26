/** API 연동 관련 모듈, 변수 가져오기 */
import { AxiosInstance, BASE_URL } from './axiosInstance';

// API 연동 타입
import { loginURL, LoginPostParamsType, LoginPostRequestType } 
from "./LoginApiType";


/** 백엔드와 API 연동 */
// 추가: POST 요청 및 응답받기
export const postLogin = async (
  {loginId, password}: LoginPostRequestType,
  {  }: LoginPostParamsType) => {
  
  try {
    console.log('Login request data: ', {loginId, password});   //점검용
    const response = await AxiosInstance.post(`${BASE_URL}${loginURL}`, 
      // Request Data 전달
      {
        loginId, password
      },
      // 쿼리 파라미터 전달
//      {
//        params: {  },
//     }
    );

    console.log('Login response: ', response);  //점검용2

    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }   //토큰 전달
    
    // 백엔드 서버로부터 API의 응답 데이터 받은 후 리턴
    return response.data;

  } catch (error) {
    // 이 부분은 나중에 errorHandler.ts 만들어서 에러별로 다르게 처리 가능
    
    // 에러를 반환해서(던져서) 컴포넌트에서 처리해도 됨
    throw error;
  }
};