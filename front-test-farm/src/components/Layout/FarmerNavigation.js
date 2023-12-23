import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './FarmerNavigation.module.css';

//로그인을 한 유저만 마이페이지가 보임
const FarmerNavigation = () => {
  return (
    <nav className={style['nav-container']}>
      <ul className={style.list}>
        <li>
          <NavLink
            to="/farmerpage/requestlist"
            className={({ isActive }) => (isActive ? style.active : undefined)}
            end
          >
            못난이매칭 요청서 보기
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/farmerpage/regproduct"
            className={({ isActive }) => (isActive ? style.active : undefined)}
          >
            못난이마켓 상품 등록
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/farmerpage/quotstatus"
            className={({ isActive }) => (isActive ? style.active : undefined)}
          >
            견적서 현황
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/farmerpage/orderlist"
            className={({ isActive }) => (isActive ? style.active : undefined)}
          >
            결제 완료 현황
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/farmerpage/deliverylist"
            className={({ isActive }) => (isActive ? style.active : undefined)}
          >
            배송 현황
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/farmerpage/invoice"
            className={({ isActive }) => (isActive ? style.active : undefined)}
          >
            정산 내역
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/farmerpage/modify-user"
            className={({ isActive }) => (isActive ? style.active : undefined)}
          >
            팜 정보 관리
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default FarmerNavigation;
