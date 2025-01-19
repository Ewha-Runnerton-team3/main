import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PATHS } from '../../constants/paths';
import { useAuth } from '../../context/AuthContext';

// 카카오 로그인 후 accesstoken을 받기 위한 페이지
// 사용자가 카카오 로그인시 자동으로 해당 페이지로 넘어옴.
const KakaoAuth = () => {
  console.log("KakaoAuth component rendered");
  
  const navigate = useNavigate();
  const location = useLocation();
  const { setUserId, setNickname } = useAuth();

  //인가코드 백으로 보내기기
  useEffect(() => {
    console.log("useEffect in KakaoAuth triggered");  //점검용
    
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const loginId = params.get('loginId');
    const nickname = params.get('nickname');

    console.log('URL parameters:', { token, loginId, nickname });

    if (token && loginId && nickname) {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify({ loginId, nickname }));

      setUserId(parseInt(loginId));
      setNickname(nickname);

      console.log('User data saved to sessionStorage');
      navigate(PATHS.HOME);
    } else {
      console.error('Missing token or user info in URL');
    }
  }, [location, navigate, setUserId, setNickname]);

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
