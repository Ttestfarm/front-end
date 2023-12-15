import React, { Fragment, useEffect } from "react";
import { NavLink, Link, Form } from "react-router-dom";
import logo from "../../assets/logo.png";

import style from "./MainNavigation.module.css";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { isErrorModalAtom, tokenAtom, userInfoAtom } from "../../recoil/Atoms";
import * as API from "../../api";

const MainNavigation = (props) => {
  const [token, setToken] = useRecoilState(tokenAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [, setIsErrorModal] = useRecoilState(isErrorModalAtom);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (token && !userInfo) {
          const response = await API.get("/login/userInfo");
          setUserInfo(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUserInfo();
  }, [token, userInfo]);

  const logoutHandler = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
      setUserInfo("");
      window.location.href = "/";
    } else {
      setIsErrorModal({
        state: true,
        message: "로그아웃에 실패하였습니다.",
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
                <img src={logo} alt="unpretty-farm " />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/matching"
                className={({ isActive }) =>
                  isActive ? style.active : undefined
                }
              >
                못난이 매칭
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/findfarmer"
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
                  to="/mypage"
                  className={({ isActive }) =>
                    isActive ? style.active : undefined
                  }
                >
                  마이 페이지
                </NavLink>
              </li>
            )}
            {/* token && userInfo && userInfo.farmerId!==null */}
            {token && (
              <li>
                <NavLink
                  to="/farmerpage/requestlist"
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
                  transition={{ type: "spring", stiffness: 500 }}
                  className={style.button}
                >
                  <Link to="/login">로그인</Link>
                </motion.button>
              ) : (
                <Form action="/logout">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                    className={style.button}
                    onClick={logoutHandler}
                  >
                    로그아웃
                  </motion.button>
                </Form>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default MainNavigation;
