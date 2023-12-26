import React, { useState } from 'react';
import './style/Invoice.css';
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

const Invoice = () => {
  const [token, setToken] = useState(null);

  const [calList, setCalList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [date, setDate] = useState();

  let today = new Date();
  let year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);
  const dateString = year + '-' + month + '-' + day;

  const [sDate, setSDate] = useState(null);
  const [eDate, setEDate] = useState(dateString);

  const [state, setState] = useState("선택");

  // const searchInvoice = () => {
  //   axios.get(`http://localhost:8090/farmer/quotlist/${state}/${page}`, {
  //       headers: {
  //         Authorization: `${getToken()}`
  //       },
  //     })

  // }

  const handelSDate = (e) => {
    setSDate(e.target.value);
  }

  const handelEDate = (e) => {
    setEDate(e.target.value);
  }

  const handelState = (e) => {
    let tempState = e.target.value; // 상태 임시 저장 변수
    if (tempState === "선택") {
      alert("정산 구분을 선택해주세요.");
    } else {
      setState(e.target.value);
    }
  }

  const search = async () => {
    try {
      if (sDate === null) {
        return alert("기간을 선택해주세요.");
      }
      if (state === "선택") {
        return alert("정산 구분을 선택해주세요.");
      }

      const date = sDate + "~" + eDate; // 기간 임시 저장
      setDate(date); // 기간 저장

      const response = await API.get(`/farmer/invoice/${date}/${page}`, token);
      const data = response.data;
      console.log(data);
      setPage(data.pageInfo);
      setCalList(data.calList);
      setTotalPrice(data.totalPrice);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const reset = () => {
    setSDate(null);
    setState("선택");
  }

  return (
    <>
      <div className="cal-form">
        <h1>조회하기</h1>
        <div className="cal-search">
          <div className="cal-search-date">
            <h3>조회기간</h3>
            <input
              type="date"
              name="sdate"
              value={sDate}
              onChange={handelSDate}
            />
            &nbsp;~&nbsp;
            <input
              type="date"
              name="edate"
              value={eDate}
              max={dateString}
              onChange={handelEDate}
            />
          </div>
          <div className="cal-search-state">
            <h3>정산구분</h3>
            <select className="select" name="state" onChange={handelState}>
              <option value="선택" selected>선택</option>
              <option value="미정산">미정산</option>
              <option value="정산완료">정산완료</option>
            </select>
          </div>
          <div className="cal-search-btns">
            <button onClick={search}>검색</button>
            <button onClick={reset}>초기화</button>
          </div>
        </div>
        <div className="cal-result">
          <div className="cal-result-money">
            <span>총 정산금액</span>
            <span>{calList > 0 ?
             totalPrice :
             '0'}</span>
          </div>
          <TableContainer component={Paper}>
        <Table sx={{ backgroundColor: '#fefcf4' }} className='quot-list' aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">주문 번호</TableCell>
              <TableCell align="right">정산예정일</TableCell>
              <TableCell align="right">수수료</TableCell>
              <TableCell align="right">금액&nbsp;</TableCell>
              <TableCell align="right">정산구분&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {calList.map((invoice) => (
              <TableRow
              key={invoice.receiptId}
              >
              <TableCell align="right">{invoice.invoiceDate}</TableCell>
              <TableCell align="right">{invoice.invoiceCommission}</TableCell>
              <TableCell align="right">{invoice.invoicePrice}</TableCell>
              <TableCell align="right">{invoice.state === 'COMPLETED' ? '정산완료' : '미정산'}</TableCell>
            </TableRow>
            ))}
    </TableBody>
    </Table>
      </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Invoice;
