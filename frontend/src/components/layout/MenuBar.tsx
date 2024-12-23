import React from 'react';
import { PATHS } from '../../constants/paths';
import { useAuth } from '../../context/AuthContext';  // AuthContext에서 userId와 setUserId 가져오기

const MenuBar = () => {
  const { userId } = useAuth();  // userId 값을 AuthContext에서 가져옴

  return (
    <div className="flex justify-between bg-yellow-60 py-4 px-10">
      <div className="flex text-lg text-center font-bold text-goldbrown-90 space-x-14">
        <a href={PATHS.HISTORY}>히스토리</a>
        <a href={PATHS.FAVORITE}>즐겨찾기</a>
        <a href={PATHS.RECOMMEND}>추천받기</a>
      </div>
      <div>
        {/* 로그인된 상태인 경우 사용자 닉네임 표시 */}
        {userId ? (
          <p>
            로그인이 되었습니다: {userId}
            {/*<p>닉네임: 사용자 닉네임</p> {/* 로그인된 사용자 닉네임 표시 */}
          </p>
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