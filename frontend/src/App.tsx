import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext'; // 전역 상태 관리
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PATHS } from './constants/paths';

import Main from "./pages/Main/Main"
import History from "./pages/History/History";
import Favorite from "./pages/Favorite/Favorite";
import Recommend from "./pages/Recommend/Recommend";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import KakaoAuth from "./pages/Login/KakaoAuth";

function App() {
  return (
    <AuthProvider> {/* 전역 상태 관리 */}
      <Router>
        <Routes>
          <Route path={PATHS.HOME} element={<Main />} />
          <Route 
            path={PATHS.HISTORY} 
            element={<History/>}
          />
          <Route path={PATHS.FAVORITE} element={<Favorite />} />
          <Route path={PATHS.RECOMMEND} element={<Recommend />} />
          <Route path={PATHS.LOGIN} element={<Login />} />
          <Route path={PATHS.SIGNUP} element={<Signup />} />
          <Route path={PATHS.KAKAO_CALLBACK} element={<KakaoAuth />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App