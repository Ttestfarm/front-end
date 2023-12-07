import React, { Fragment, useEffect } from 'react';
import {
  NavLink,
  Link,
  Form,
  useRouteLoaderData,
  redirect,
} from 'react-router-dom';
import logo from '../../assets/logo.png';

import style from './MainNavigation.module.css';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import {
  isErrorModalAtom,
  tokenAtom,
  updateAtom,
  userInfoAtom,
} from '../../recoil/Atoms';
import * as API from '../../api';

const MainNavigation = (props) => {
  const [token, setToken] = useRecoilState(tokenAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  //const [update] = useRecoilState(updateAtom);
  const [, setIsErrorModal] = useRecoilState(isErrorModalAtom);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      try {// 백엔드 서버 안킨 상태에서 토큰 있으면 실행되는걸로 바꿔둠 
        if (token) {
          const result = await API.get('/login/userInfo');
          setUserInfo(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUserInfo();
  }, [token]);

  const logoutHandler = () => {
    if (token) {
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      setUserInfo('');
      window.location.reload();
    } else {
      setIsErrorModal({
        state: true,
        message: '로그아웃에 실패하였습니다.',
      });
    }
  };

  return (
    <Fragment>
      <header className={style.header}>
        <nav className={style.left}>
          <ul className={style.list}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? style.active : undefined
                }
              >
                <img
                  src={logo}
                  alt="unpretty-farm "
                />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? style.active : undefined
                }
              >
                못난이 매칭
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? style.active : undefined
                }
              >
                파머 찾기
              </NavLink>
            </li>
            {token && (
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? style.active : undefined
                  }
                >
                  마이 페이지
                </NavLink>
              </li>
            )}
            {token && (
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? style.active : undefined
                  }
                >
                  파머 페이지
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <nav>
          <ul className={style.list}>
            <li>{token && <span>{userInfo?.userName} 님</span>}</li>
            <li>
              {!token ? (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                  className={style.button}
                >
                  <Link to="/login">로그인</Link>
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                  onClick={logoutHandler}
                >
                  로그아웃
                </motion.button>
              )}
            </li>
          </ul>

          {/* {token && (
            <Form
              action="/logout"
              method="post"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 500 }}
                onClick={logoutHandler}
              >
                로그아웃
              </motion.button>
            </Form>
          )} */}
        </nav>
      </header>
    </Fragment>
  );
};

export default MainNavigation;
