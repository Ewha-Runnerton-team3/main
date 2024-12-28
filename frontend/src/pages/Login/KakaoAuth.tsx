import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AxiosInstance } from "../../api/axiosInstance";
import { PATHS } from '../../constants/paths';
import { useAuth } from '../../context/AuthContext';

// 카카오 로그인 후 accesstoken을 받기 위한 페이지
// 사용자가 카카오 로그인시 자동으로 해당 페이지로 넘어옴.
const KakaoAuth = () => {
  const params = new URL(window.location.href).searchParams;
  const code = params.get("code");

  const navigate = useNavigate();

  // 사용자 정보 전역변수로 저장하기 위한 것
  const { setUserId, setNickname } = useAuth();

  //인가코드 백으로 보내기기
  useEffect(() => {
    const kakaoLogin = async () => {
      await AxiosInstance({
        method: "GET",
        url: `${PATHS.KAKAO_REDIRECT}/?code=${code}`,
        data: { code },
        headers: {
          "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻
          "Access-Control-Allow-Origin": "*", //이건 cors 에러때문에 넣어둔것. 당신의 프로젝트에 맞게 지워도됨
        },
      }).then((res) => { //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
        // 백엔드로 부터 받은 응답 확인
        const answer = res.data;
        console.log(answer);


        //계속 쓸 정보들( ex: 이름) 등은 localStorage에 저장해두자
        localStorage.setItem('token', answer.token);
        localStorage.setItem('user', JSON.stringify(answer.user));
        setUserId(answer.user.loginId);
        setNickname(answer.user.nickname);

        
        //로그인이 성공하면 이동할 페이지
        navigate(PATHS.HOME);
      });
    };
    kakaoLogin();
  }, [code, navigate, setUserId, setNickname]);

  return (
    <div className="bg-yellow-50 h-screen flex justify-center py-10">
        <div className="space-y-2 text-goldbrown-80 text-semibold">
            <p>로그인 중입니다.</p>
            <p>잠시만 기다려주세요.</p>
        </div>
    </div>
  );
}


export default KakaoAuth;
