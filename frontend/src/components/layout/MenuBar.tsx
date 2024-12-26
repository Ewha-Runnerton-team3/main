import React from 'react';
import { PATHS } from '../../constants/paths';
import { useAuth } from '../../context/AuthContext';  // AuthContext에서 userId와 setUserId 가져오기
import { postLogout } from "../../api/LogoutApiService";

const MenuBar = () => {
  const { userId, setUserId, nickname, setNickname } = useAuth();  // userId 값을 AuthContext에서 가져옴

  const handleLogout = async () => {
      // API 요청
      try {
          const logoutData = await postLogout(
            {},
            {}
          );
          

          // 로그아웃 성공 후 처리

          // 로컬 스토리지에 로그인 정보 삭제
          localStorage.removeItem('token');
          localStorage.removeItem('user');

          // 전역 상태에서 userId 초기화
          setUserId(null);
          setNickname(null);


      } catch (err) {
          // 에러 발생 시 처리
          alert('로그아웃 실패\n' + err);
          console.error('로그아웃 실패:', err);
      }
  };

  
  return (
    <div className="flex justify-between bg-yellow-60 py-4 px-10">
      <div className="flex text-lg text-center font-bold text-goldbrown-90 space-x-14">
        <a href={PATHS.HISTORY}>히스토리</a>
        <a href={PATHS.FAVORITE}>즐겨찾기</a>
        <a href={PATHS.RECOMMEND}>추천받기</a>
      </div>
      <div>
        {/* 로그인된 상태인 경우 사용자 닉네임 표시 */}
        {nickname ? (
          <div className="space-x-3">
            <p>
              로그인이 되었습니다: {nickname}
              {/*<p>닉네임: 사용자 닉네임</p> {/* 로그인된 사용자 닉네임 표시 */}
            </p>
            <p onClick={handleLogout} className="cursor-pointer">로그아웃</p>
          </div>
        ) : (
          <div className="space-x-3">
            <a href={PATHS.LOGIN}>로그인</a>
            <a href={PATHS.SIGNUP}>회원가입</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuBar