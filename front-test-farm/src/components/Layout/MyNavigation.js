import React from 'react';
import { NavLink, useRouteLoaderData } from 'react-router-dom';
import style from './Navigation.module.css';
//로그인을 한 유저만 마이페이지가 보임
const MyNavigation = () => {
  return (
    <nav className={style['nav-container']}>
      <ul className={style.list}>
        <li>
          <NavLink
            to="/mypage"
            className={({ isActive }) => (isActive ? style.active : undefined)}
            end
          >
            받은 매칭 견적서
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/mypage/buylist"
            className={({ isActive }) => (isActive ? style.active : undefined)}
          >
            구매 내역
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/mypage/followlist"
            className={({ isActive }) => (isActive ? style.active : undefined)}
          >
            찜한 파머 목록
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/mypage/modify-user"
            className={({ isActive }) => (isActive ? style.active : undefined)}
          >
            내 정보 관리
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MyNavigation;
