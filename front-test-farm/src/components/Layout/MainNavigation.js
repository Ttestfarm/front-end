import React, { Fragment } from 'react';
import { NavLink, useRouteLoaderData} from 'react-router-dom';
import logo from '../../assets/logo.png';

import style from './styles/MainNavigation.module.css';

const MainNavigation = (props) => {
  const token = useRouteLoaderData('root');
  return (
    <Fragment>
      <header className={style.header}>
        <nav className={style.left}>
          
          <ul className={style.list}>
            <li>
              <NavLink to="/"
              className={({ isActive }) =>
              isActive ? style.active : undefined
            }>
                <img
            src={logo}
            alt="unpretty-farm "
          />
              </NavLink>
            </li>
            <li>
              <NavLink to="/"
              className={({ isActive }) =>
              isActive ? style.active : undefined
            }>
              못난이 매칭
              </NavLink>
            </li>
            <li>
              <NavLink to="/"
              className={({ isActive }) =>
              isActive ? style.active : undefined
            }>
              못난이 마켓
              </NavLink>
            </li>
            <li>
              <NavLink to="/"
              className={({ isActive }) =>
              isActive ? style.active : undefined
            }>
              마이 페이지
              </NavLink>
            </li>
            <li>
              <NavLink to="/"
              className={({ isActive }) =>
              isActive ? style.active : undefined
            }>
              파머 페이지
              </NavLink>
            </li>
          </ul>
        </nav>
        <button className={style.button}>로그인</button>
      </header>
    </Fragment>
  );
};

export default MainNavigation;
