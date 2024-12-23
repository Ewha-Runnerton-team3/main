import React, { useState } from 'react';
import Header from "../../components/layout/Header"
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import
import { PATHS } from '../../constants/paths';

import { postSignup } from "../../api/SignupApiService";


const SignupPage = () => {
    const [id, setId] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    
    const navigate = useNavigate();
    const handleSignup = async () => {
        // API 요청
        try {
            const signupData = await postSignup(
              { loginId:id, password:pwd, nickname },
              {}
            );
            
            // 로그인 성공 후 메인홈 페이지로 리디렉션
            navigate(PATHS.HOME);
            

        } catch (err) {
            // 에러 발생 시 처리
            console.error('회원가입 실패:', err);
        }
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
                    
                    <div className="space-y-2">
                        <p>비밀번호</p>
                        <input
                            className="border border-goldbrown-50 rounded-lg py-1 px-2 w-[250px]"
                            type="pwd"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            placeholder="비밀번호를 입력해주세요"
                        />
                    </div>
                    
                    <div className="space-y-2 pb-5">
                        <p>닉네임</p>
                        <input
                            className="border border-goldbrown-50 rounded-lg py-1 px-2 w-[250px]"
                            type="nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="닉네임을 입력해주세요"
                        />
                    </div>

                    <div
                        className="bg-grayscale-90 text-grayscale-0 border border-goldbrown-50 rounded-lg py-1 px-2 text-center cursor-pointer"
                        onClick={handleSignup}>
                        회원가입하기
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
