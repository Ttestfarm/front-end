import React, { useState } from 'react';
import './style/Invoice.css';

const Invoice = () => {
  const [calList, setCalList] = useState([]);
  let today = new Date();
  let year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);

  var dateString = year + '-' + month + '-' + day;
  return (
    <>
      <div className="cal-form">
        <h2>조회하기</h2>
        <div className="cal-search">
          <div className="cal-search-date">
            <h3>조회기간</h3>
            <input
              type="date"
              name="sdate"
              value={dateString}
            />
            &nbsp;~&nbsp;
            <input
              type="date"
              name="edate"
              value={dateString}
              max={dateString}
            />
          </div>
          <div className="cal-search-state">
            <h3>정산구분</h3>
            <select name="state">
              <option
                value="전체"
                selected
              >
                전체
              </option>
              <option value="미정산">미정산</option>
              <option value="정산완료">정산완료</option>
            </select>
          </div>
          <div className="cal-search-btns">
            <button>검색</button>
            <button>초기화</button>
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

<<<<<<< HEAD:front-test-farm/src/pages/FarmersPages/Invoice.js
export default Invoice;
=======
export default Calculate;
>>>>>>> 75d9dc7054cda0add59e549d3186b07b2046aac4:front-test-farm/src/pages/FarmersPages/Calculate.js
