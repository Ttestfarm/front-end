import React, { useEffect, useState } from 'react';
import style from './style/QuotStatus.css';
import { Link, useNavigate } from 'react-router-dom';
import { tokenAtom } from '../../recoil/Atoms'; //리코일 
import { useRecoilValue } from 'recoil'; // 리코일
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import * as API from '../../api/index';

const QuotStatus = () => {
  const token = useRecoilValue(tokenAtom); //리코일
  const [quotList, setQuotList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    allPage: 1,
    curPage: 1,
    startPage: 1,
    endPage: 0
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
  }, [page]);

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

  const onChangePage = (_, value) => {
    setPage(value);
  };

  return (
    <div className="quotation-status">
      <div className="quotation-status-header">
        <div className='warning-text'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
            <ellipse cx="10.2691" cy="10.5273" rx="9.72222" ry="10" fill="#49680D" />
            <text x="50%" y="50%" textAnchor='middle' dy=".3em" fill="#fff" fontSize="12">
              !
            </text>
          </svg>
          <span>
            &nbsp;&nbsp;무분별한 견적서 취소는 서비스 이용에 패널티가 부여됩니다. 주의하세요!
          </span>
        </div>
        <div className="button-group">
          <button
            className="quotation-delete-btn"
            onClick={cancelQuot}
          >
            견적서 취소
          </button>
          <div className="state-dropdown">
            <button className="state-dropbtn">
              {state == 'READY'
                ? '▼ 대기중'
                : state == 'EXPIRED'
                  ? '▼ 요청 만료'
                  : '▼ 취소'}
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
      </div>
      <TableContainer component={Paper} className="table-container">
        <Table className='table-main' aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>삭제</TableCell>
              <TableCell align="center">견적서 번호</TableCell>
              <TableCell align="center">품목</TableCell>
              <TableCell align="center">가격&nbsp;</TableCell>
              <TableCell align="center">수량&nbsp;</TableCell>
              <TableCell align="center">주소&nbsp;</TableCell>
              <TableCell align="center">상태&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quotList.map((quot) => (
              <TableRow
                key={quot.quotationId}
              >
                <TableCell align='center'>
                  {state == 'READY' && (
                    <input
                      type='checkbox'
                      onClick={() => addCancelList(quot.quotationId)}
                    />
                  )}
                </TableCell>
                <TableCell align='center'>
                  <Link to={`/farmerpage/quotdetail/${quot.quotationId}`}>
                    {quot.quotationId}
                  </Link>
                </TableCell>
                <TableCell align='center'>{quot.quotationProduct}</TableCell>
                <TableCell align='center'>{quot.quotationPrice}</TableCell>
                <TableCell align='center'>{quot.quotationQuantity}</TableCell>
                <TableCell align='center'>{quot.address2}</TableCell>
                <TableCell align='center'>{state == 'READY' ? '대기중' : state == 'EXPIRED' ? '요청만료' : '취소'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div>
          <Stack spacing={2} alignItems="center">
            <Pagination
              count={pageInfo?.allPage}
              page={pageInfo?.curPage}
              onChange={onChangePage}
              size="small"
            />
          </Stack>
        </div>
      </TableContainer>
    </div >
  );
};

export default QuotStatus;
