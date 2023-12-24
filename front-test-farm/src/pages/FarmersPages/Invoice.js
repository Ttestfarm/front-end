import React, { useState } from 'react';
import './style/Invoice.css';
import { tokenAtom } from '../../recoil/Atoms'; //리코일 
import { useRecoilValue } from 'recoil'; // 리코일
import * as API from '../../api/index';

const Invoice = () => {
  const [token, setToken] = useState(null);

  const [calList, setCalList] = useState([]);
  const [page, setPage] = useState(0);
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
      <calendar />
      <div className="cal-form">
        <h2>조회하기</h2>
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
            <span>정산금액</span>
            <span>50,000</span>
          </div>
          <div className="cal-result-list">
            <table>
              <tr>
                <th>정산예정일</th>
                <th>정산완료일</th>
                <th>수수료</th>
                <th>금액</th>
                <th>정산구분</th>
              </tr>
              <tr>
                <td>2023.10.11</td>
                <td>2023.11.15</td>
                <td>?</td>
                <td>50,000</td>
                <td>완료</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
