import React, { useEffect, useState } from 'react';
import style from './style/QuotStatus.css';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import { tokenAtom } from '../../recoil/Atoms'; //리코일 
import { useRecoilValue } from 'recoil'; // 리코일
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as API from '../../api/index';

const QuotStatus = () => {
  const token = useRecoilValue(tokenAtom); //리코일
  const [quotList, setQuotList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    allPage: '',
    curPage: '',
    startPage: '',
    endPage: ''
  })
  //  CANCEL, READY, EXPIRED, COMPLETED
  const [state, SetState] = useState('READY');
  const [cancelList, setCancelList] = useState([]); // 견적서 취소 리스트
  const navigate = useNavigate();

  const testFunction = async () => {
    try {
      const response = await API.get(`/farmer/quotlist/${state}/${page}`, token);
      const data = response.data;

      setPageInfo(data.pageInfo);
      setQuotList(data.quotList);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    testFunction()
  }, []);

  // 견적서 상태 바뀌면 List 가져오기
  const changeState = async (state) => {
    try {
      console.log(state);
      const response = await API.get(`/farmer/quotlist/${state}/${page}`, token);
      const data = response.data;
      console.log(data);

      setPageInfo(data.pageInfo);
      setQuotList([...data.quotList]);
      // setQuotList([...res.data.reqList]);
      SetState(state);
      setCancelList([]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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

  const cancelQuot = async () => {
    try {
      const response = await API.post(`/farmer/quotdelete`, token, { ids: cancelList });
      const data = response.data;
      window.location.reload();
      alert(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert(error);
    }
  };

  return (
    <div>
      <div className="quotation-status-header">
        <div className='warning-text'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
            <ellipse cx="10.2691" cy="10.5273" rx="9.72222" ry="10" fill="#49680D" />
            <text x="50%" y="50%" textAnchor='middle' dy=".3em" fill="#fff" fontSize="12">
              !
            </text>
          </svg>
          <span>
            &nbsp;무분별한 견적서 취소는 서비스 이용에 패널티가 부여됩니다. 주의하세요!
          </span>
        </div>
        <button
          className="quotation-delete-btn"
          onClick={cancelQuot}
        >
          견적서 취소
        </button>
        <div className="state-dropdown">
          <button className="state-dropbtn">
            {state == 'READY'
              ? '대기중'
              : state == 'EXPIRED'
                ? '요청만료'
                : '취소'}
          </button>
          <div className="state-dropdown-content">
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
      <TableContainer component={Paper}>
        <Table sx={{ backgroundColor: '#fefcf4' }} className='quot-list' aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">삭제</TableCell>
              <TableCell align="right">견적서 번호</TableCell>
              <TableCell align="right">품목</TableCell>
              <TableCell align="right">가격&nbsp;</TableCell>
              <TableCell align="right">수량&nbsp;</TableCell>
              <TableCell align="right">주소&nbsp;</TableCell>
              <TableCell align="right">상태&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quotList.map((quot) => (
              <TableRow
                key={quot.quotationId}
              >
                <TableCell align="right">
                  {state == 'READY' && (
                    <input
                      type="checkbox"
                      onClick={() => addCancelList(quot.quotationId)}
                    />
                  )}
                </TableCell>
                <TableCell align="right">
                  <Link to={`/farmerpage/quotdetail/${quot.quotationId}`}>
                    {quot.quotationId}
                  </Link>
                </TableCell>
                <TableCell align="right">{quot.quotationProduct}</TableCell>
                <TableCell align="right">{quot.quotationPrice}</TableCell>
                <TableCell align="right">{quot.quotationQuantity}</TableCell>
                <TableCell align="right">{quot.address2}</TableCell>
                <TableCell align="right">{state == 'READY' ? '대기중' : state == 'EXPIRED' ? '요청만료' : '취소'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <div className="quotation-list">
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
      <Pagination /> */}
    </div >
  );
};

export default QuotStatus;
