import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { tokenAtom, userInfoAtom } from './../../recoil/Atoms';
import * as API from '../../api';
import axios from 'axios';

const Oauth = () => {
  const { stoken } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  useEffect(() => {
    setToken(stoken);

    axios
      .get(`${API.serverUrl}/user/userInfo`, {
        headers: {
          Authorization: `${stoken}`,
        },
      })
      .then((res) => {
        setUserInfo(res.data);
        navigate('/');
      });
  }, []);
};

export default Oauth;
