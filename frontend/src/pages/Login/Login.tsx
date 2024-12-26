import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from "../../components/layout/Header"
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/paths';
import { postLogin } from "../../api/LoginApiService";



const LoginPage = () => {
    // useAuth 훅을 사용하여 전역변수 setUserId 가져오기
    const { setUserId, setNickname } = useAuth();

    const [id, setId] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    
    const handleLogin = async () => {
        // API 요청
        try {
            const loginData = await postLogin(
              { loginId:id, password:pwd },
              {}
            );
            

            // 로그인 성공 시 처리
            const { user, token } = loginData;

            // 로컬 스토리지에 로그인 정보 저장
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // 로그인 성공 후 전역 AuthContext에 userId 저장
            setUserId(user.loginId);

            // 닉네임은 백엔드에서 자동으로 지정해서 주기로 함.
            setNickname(user.nickname);
            
            // 로그인 성공 후 메인홈 페이지로 리디렉션
            navigate(PATHS.HOME);


        } catch (err) {
            // 에러 발생 시 처리
            alert('로그인 실패\n' + err);
            console.error('로그인 실패: ', err);
        }
    };
    
    const navigate = useNavigate();
    const handleKakaoLogin = () => {
        // 프론트 URL + 카카오 로그인 페이지로 이동 (리디렉션)
        // http://localhost:5173/auth/kakao
        //navigate(`/auth/kakao`);
        
        // 백엔드드 URL + 카카오 로그인 페이지로 이동 (리디렉션)
        // http://localhost:3000/auth/kakao
        window.location.href = PATHS.KAKAO_REDIRECT;

        // 로그인 성공 후 userId를 받기?
        //setUserId();
    };

    return (
        <div>
            <Header/>
            <div className="bg-yellow-50 h-screen flex justify-center py-10">
                <div className="space-y-5">
                    <h2>서비스 아이콘</h2>
                    <div className="space-y-2">
                        <p>아이디</p>
                        <input
                            className="border border-goldbrown-50 rounded-lg py-1 px-2 w-[250px]"
                            type="id"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            placeholder="아이디를 입력해주세요"
                        />
                    </div>
                    
                    <div className="space-y-2 pb-5">
                        <p>비밀번호</p>
                        <input
                            className="border border-goldbrown-50 rounded-lg py-1 px-2 w-[250px]"
                            type="pwd"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            placeholder="비밀번호를 입력해주세요"
                        />
                    </div>

                    <div
                        className="bg-grayscale-90 text-grayscale-0 border border-goldbrown-50 rounded-lg py-1 px-2 text-center cursor-pointer"
                        onClick={handleLogin}>
                        로그인
                    </div>


                    <div
                        className="bg-lemon-50 text-goldbrown-80 border border-goldbrown-50 rounded-lg py-1 px-2 text-center cursor-pointer"
                        onClick={handleKakaoLogin}>
                        카카오 로그인
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
