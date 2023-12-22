import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenAtom, userInfoAtom } from "./../../recoil/Atoms";
import * as API from "../../api";
import axios from "axios";

const Oauth = () => {
  const { stoken } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  useEffect(() => {
    console.log("token:" + stoken);
    setToken({ type: "token", payload: stoken });
    axios
      .get("http://localhost:8090/user/userInfo", {
        headers: {
          Authorization: `${stoken}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUserInfo(res.data);
        navigate("/");
      });
  }, []);
};

export default Oauth;
