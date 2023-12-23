import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style/QuotStatus.css';
import Pagination from './Pagination';
import { tokenAtom } from '../../recoil/Atoms'; //리코일 
import { useRecoilValue } from 'recoil'; // 리코일
import * as API from '../../api/index';

const OrderList = () => {
  const token = useRecoilValue(tokenAtom); //리코일
  const [ordList, setOrdList] = useState([]);
  const [farmerId, setFarmerId] = useState(1);
  const [type, setType] = useState("1"); // 1: 매칭, 2: 주문
  const [page, setPage] = useState(1);

  const [isOpen, setIsOpen] = useState(false); // 발송 Modal

  const key = ""; // 택배 API key
  const [company, setCompany] = useState([]); // 택배사 데이터 저장
  const [code, setCode] = useState("00"); // 택배사 코드 저장
  const [name, setName] = useState(); // 택배사 명 저장
  const [invoice, setInvoice] = useState(); // 송장 번호 저장

  const testFunction = async() => {
    try {
      const response = await API.get(`/farmer/orderlist/${type}/${page}`, token);
      const data = response.data;
      setOrdList([...data.ordersList]);
      const response2 = await API.get(`/companylist`, token);
      const com = response2.data;
      setCompany(...com);
    } catch(error) {
      console.error('Error fetching data:', error);
    }
  }
  // 배송 현황(매칭) 리스트
  useEffect(() => {
    testFunction()
  }, []);

    const changeType = async (idx) => { // 필터 변경
      if (idx === type) {
        alert("이미 선택");
      } else {
        try {
          setType(idx);
          let type = idx;
          let page = 1;
          const response = await API.get(`/farmer/orderlist/${type}/${page}`, token);
          const data = response.data;

          setPage(data.page);
          setOrdList([...data.ordersList]);
        } catch(error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    const [ordersId, setOrdersId] = useState();
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState();
    // Modal 관련
    const onClickButton = (receiptId, product, quantity) => {
      // console.log(ordersId, product, quantity);
      setIsOpen(true);

      setOrdersId(receiptId);
      setProduct(product);
      setQuantity(quantity);
    };

    const openModal = () => {
      setIsOpen(true);
    };

    const closeModal = () => {
      setIsOpen(false);
    };

    const handleOutsideClick = (event) => { // Modal 외부 클릭 닫기
      if (event.target === event.currentTarget) {
        closeModal();
      }
    };

    const handleSelect = (e) => { // 택배 코드 
      setCode(e.target.value);
      setName(e.target.options[e.target.selectedIndex].getAttribute('data-name'))
    }

    const handleInvoice = (e) => { // 송장 번호
      // setInvoice(String(e.target.value));
      setInvoice(e.target.value);
    }

    const sendparcel = async (ordersId) => { // 발송 함수
      try {
        if (code === "00") {
          alert("택배사를 선택해주세요.");
        } else {
          console.log(ordersId);
          console.log(code);
          console.log(name);
          console.log(invoice);
          const response = await API.get(`/farmer/sendparcel/${ordersId}/${code}/${name}/${invoice}`, token);
          const data = response.data;
          alert(data);
          console.log(data);
          setCode("00");
          setInvoice("");
          setIsOpen(false);
            // 페이지 다시 요청
        }
      } catch(error) {
          alert(error.data);
          console.error('Error fetching data:', error);
      }
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
                  <button className="quotation-delete-btn" onClick={() => onClickButton(ord.ordersId, ord.product, ord.quantity)}>발송</button>
                </td>
                <td>
                  <Link to={`orderdetail/${ord.ordersId}/${type}`}>
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
        {isOpen && (<div id="myModal" className="modal" onClick={handleOutsideClick}>
          {/* 모달 내용 */}
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>발송 입력</h2>
            <p>주문 번호 : {ordersId}</p>
            <p>품 목 :{product}</p>
            <p>수 량 :{quantity}</p>
            <div>
              택 배 사 :
              <select name="tcode" onChange={handleSelect}>
                <option value="00" selected>선택</option>
                {company.length > 0 && company.map(com => (
                  <option key={com.code} value={com.code} data-name={com.name}>{com.name}</option>
                )
                )}
              </select>
            </div>
            <p>송장 번호 : <input type='text' value={invoice} onChange={handleInvoice} /></p>
            <button onClick={() => sendparcel(ordersId)}>발송</button>
          </div>
        </div>
        )}
        <Pagination />
      </div>
    );
  }

export default OrderList;
