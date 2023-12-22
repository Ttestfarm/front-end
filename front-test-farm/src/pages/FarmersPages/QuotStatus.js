import React, { useEffect, useState } from 'react';
import style from './style/QuotStatus.css';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import axios from 'axios';

const QuotStatus = () => {
  const [quotList, setQuotList] = useState([]);
  const [page, setPage] = useState(1);
  //  CANCEL, READY, EXPIRED, COMPLETED
  const [state, SetState] = useState('READY');
  const [cancelList, setCancelList] = useState([]); // 견적서 취소 리스트
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  const getToken = () => {
    return localStorage.getItem('token'); // 여기서 'your_token_key'는 실제로 사용하는 토큰의 키여야 합니다.
  };

  useEffect(() => {
    const farmerToken = getToken();
    setToken(farmerToken);
    axios
      .get(`http://localhost:8090/farmer/quotlist/${state}/${page}`, {
        headers: {
          Authorization: `${farmerToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        setQuotList([...res.data.quotList]);
        // setPage([...res.data.pageInfo]);
        console.log(res.data.quotList);
        // setQuotList([...res.data.reqList]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 견적서 상태 바뀌면 List 가져오기
  const changeState = (state) => {
    SetState(state);
    axios
      .get(`http://localhost:8090/farmer/quotlist/${state}/${page}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        setQuotList([...res.data.quotList]);
        // setPage([...res.data.pageInfo]);
        console.log(res.data.quotList);
        // setQuotList([...res.data.reqList]);
        setCancelList([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 취소할 견적서들 리스트에 담기
  const addCancelList = (Id) => {
    const index = cancelList.indexOf(Id);
    if (index !== -1) {
      cancelList.splice(index, 1);
    } else {
      setCancelList([...cancelList, Id]);
    }
  };

  const cancelQuot = () => {
    axios
      .post(
        `http://localhost:8090/farmer/quotdelete`,
        { ids: cancelList },
        {
          headers: {
            'Content-Type': `application/json`,
          },
        }
      )
      .then((res) => {
        window.location.reload();
        alert(res.data);
      })
      .catch((err) => {
        alert(err.data);
      });
  };

  return (
    <div className={style['quotation-status']}>
      <div className={style['quotation-status-header']}>
        <button
          className={style['quotation-delete-btn']}
          onClick={cancelQuot}
        >
          견적서 취소
        </button>
        <span>
          #무분별한 견적서 취소는 서비스 이용에 패널티가 부여됩니다. 주의하세요!
        </span>
        <div className="dropdown">
          <button className="dropbtn">
            {state == 'READY'
              ? '대기중'
              : state == 'EXPIRED'
              ? '요청만료'
              : '취소'}
          </button>
          <div className="dropdown-content">
            <a
              href="#"
              key="0"
              onClick={() => changeState('EXPIRED')}
            >
              요청 만료
            </a>
            <a
              href="#"
              key="1"
              onClick={() => changeState('READY')}
            >
              대기중
            </a>
            <a
              href="#"
              key="2"
              onClick={() => changeState('CANCEL')}
            >
              취소
            </a>
          </div>
        </div>
      </div>
      <div className="quotation-list">
        <table>
          <tr>
            <th>&nbsp;</th>
            <th>견적서번호</th>
            <th>농산물</th>
            <th>수량</th>
            <th>가격</th>
            <th>주소</th>
            <th>상태</th>
          </tr>
          {quotList.length > 0 &&
            quotList.map((quot) => (
              <tr key={quot.quotationId}>
                <td>
                  {state == 'READY' && (
                    <input
                      type="checkbox"
                      onClick={() => addCancelList(quot.quotationId)}
                    />
                  )}
                </td>
                <td>
                  <Link to={`/farmerpage/quotdetail/${quot.quotationId}`}>
                    {quot.quotationId}
                  </Link>
                </td>
                <td>{quot.product}</td>
                <td>{quot.quantity}kg</td>
                <td>{quot.price}</td>
                <td>{quot.address2}</td>
                <td>
                  {state == 'READY'
                    ? '대기중'
                    : state == 'EXPIRED'
                    ? '요청만료'
                    : '취소'}
                </td>
              </tr>
            ))}
        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default QuotStatus;
