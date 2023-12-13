import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style/QuotStatus.css';
import Pagination from './Pagination';
import axios from 'axios';
import Invoice from './Invoice';

const OrderList = () => {
  const [ordList, setOrdList] = useState([]);
  const [farmerId, setFarmerId] = useState(1);
  const [type, setType] = useState("1"); // 1: 매칭, 2: 주문
  const [page, setPage] = useState(1);

  const [isOpen, setIsOpen] = useState(false); // 발송 Modal

  const key = "OstBNzBg0PI7Tr96ol661A"; // 택배 API key
  const [company, setCompany] = useState([]); // 택배사 데이터 저장
  const [code, setCode] = useState(); // 택배사 코드 저장
  const [invoice, setInvoice] = useState(); // 송자 번호 저장

  useEffect(() => { // 배송 현황(매칭) 리스트
    axios.get(`http://localhost:8090/farmer/orderlist/${farmerId}/${type}/${page}`)
      .then(res => {
        setOrdList([...res.data.ordersList]);
        return axios.get(`http://info.sweettracker.co.kr/api/v1/companylist`, { params: { "t_key": key } })
      })
      .then(res => {
        const filteredCompanies = [...res.data.Company.filter(item => item.International == "false")];
        setCompany([...filteredCompanies]);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const changeType = (idx) => { // 필터 변경
    if (idx === type) {
      alert("이미 선택");
    } else {
      console.log("here");
      setType(idx);
      let type = idx;
      let page = 1;
      axios.get(`http://localhost:8090/farmer/orderlist/${farmerId}/${type}/${page}`)
        .then(res => {
          setOrdList([...res.data.ordersList]);
        }).catch(err => {
          console.log(err);
        })
    }
  };

  // Modal 관련
  const onClickButton = () => {
    setIsOpen(true);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (event) => { // Modal 위부 클릭 닫기
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const handleSelect = (e) => { // 택배 코드 
    setCode(e.target.value);
  }

  const handleInvoice = (e) => { // 송장 번호
    setInvoice(String(e.target.value));
  }

  const sendparcel = (ordersId) => { // 발송 함수
    console.log(code);
    console.log(invoice);
    axios.get(`http://localhost:8090/farmer/sendparcel/${ordersId}/${code}/${invoice}`)
      .then(res => {
        console.log(res);
        setCode("");
        setInvoice("");
      })
      .catch(err => {
        console.log(err);
      })
  }


  return (
    <div className="quotation-status">
      <div className="quotation-status-header">
        <span>#배송 완료 된 견적서는 배송 현황에서 볼 수 있습니다!</span>
        <div className="dropdown">
          <button className="dropbtn">
            {type}
          </button>
          <div className="dropdown-content">
            <a href="#" key="1" onClick={() => changeType("1")}>매칭</a>
            <a href="#" key="2" onClick={() => changeType("2")}>주문</a>
          </div>
        </div>
      </div>
      <div className="quotation-list">
        <table>
          <tr>
            <th>&nbsp;</th>
            <th>주문번호</th>
            <th>농산물</th>
            <th>수량</th>
            <th>가격</th>
            <th>받는이</th>
            <th>연락처</th>
            <th>주소</th>
          </tr>
          {ordList.length > 0 && ordList.map(ord => (
            <tr key={ord.ordersId}>
              <td>
                <button className="quotation-delete-btn" onClick={onClickButton}>발송</button>
                {isOpen && (<div id="myModal" className="modal" onClick={handleOutsideClick}>
                  {/* 모달 내용 */}
                  <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <h2>발송 입력</h2>
                    <p>주문 번호 :{ord.ordersId}</p>
                    <p>품 목 :{ord.product}</p>
                    <p>수 량 :{ord.quantity}</p>
                    <div>
                      택 배 사 :
                      <select name="tcode" onChange={handleSelect}>
                        {company.length > 0 && company.map(com => (
                          <option key={com.Code} value={com.Code}>{com.Name}</option>
                        )
                        )}
                      </select>
                    </div>
                    <p>송장 번호 : <input type='text' value={invoice} onChange={handleInvoice} /></p>
                    <button onClick={() => sendparcel(ord.ordersId)}>발송</button>
                  </div>
                </div>
                )}
              </td>
              <td>
                <Link to={`/orderdetail/${ord.ordersId}/${type}`}>
                  {ord.ordersId}
                </Link>
              </td>
              <td>{ord.product}</td>
              <td>{ord.quantity}kg</td>
              <td>{ord.price}</td>
              <td>{ord.name}</td>
              <td>{ord.tel}</td>
              <td>{ord.address}</td>
            </tr>
          ))}
        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default OrderList;
