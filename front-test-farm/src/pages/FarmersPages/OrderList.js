import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import style from './style/QuotStatus.css';
import style from './style/OrderDeatil.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { isErrorModalAtom, tokenAtom } from '../../recoil/Atoms'; //리코일
import { useRecoilState, useRecoilValue } from 'recoil'; // 리코일
import * as API from '../../api/index';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const OrderList = () => {
  const token = useRecoilValue(tokenAtom); //리코일
  const [, setIsErrorModal] = useRecoilState(isErrorModalAtom);
  const [ordList, setOrdList] = useState([]);
  const [type, setType] = useState('matching'); // 1: matching, 2: order
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    allPage: 1,
    curPage: 1,
    startPage: 1,
    endPage: 0,
  });

  const [isOpen, setIsOpen] = useState(false); // 발송 Modal

  const [company, setCompany] = useState([]); // 택배사 데이터 저장
  const [code, setCode] = useState('00'); // 택배사 코드 저장
  const [name, setName] = useState(); // 택배사 명 저장
  const [invoice, setInvoice] = useState(); // 송장 번호 저장

  const testFunction = async () => {
    try {
      const response = await API.get(
        `/farmer/orderlist/${type}/${page}`,
        token
      );
      const data = response.data;
      setOrdList([...data.ordersList]);
      const response2 = await API.get(`/companylist`, token);
      const com = response2.data;
      console.log(com);
      setCompany([...com]);

      console.log(data.ordersList);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // 배송 현황(matching) 리스트
  useEffect(() => {
    testFunction();
  }, [page]);

  const onChangePage = (_, value) => {
    setPage(value);
  };

  const changeType = async (selType) => {
    // 필터 변경
    if (selType === type) {
      setIsErrorModal({
        state: true,
        message: '이미 선택',
      });
    } else {
      try {
        setType(selType);
        let type = selType;
        let page = 1;
        const response = await API.get(
          `/farmer/orderlist/${type}/${page}`,
          token
        );
        const data = response.data;

        setOrdList([...data.ordersList]);
        setPageInfo(data.pageInfo);
        console.log(data.ordersList);
      } catch (error) {
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

  const handleOutsideClick = (event) => {
    // Modal 외부 클릭 닫기
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const handleSelect = (e) => {
    // 택배 코드
    setCode(e.target.value);
    setName(e.target.options[e.target.selectedIndex].getAttribute('data-name'));
  };

  const handleInvoice = (e) => {
    // 송장 번호
    // setInvoice(String(e.target.value));
    setInvoice(e.target.value);
  };

  const sendparcel = async (ordersId) => {
    // 발송 함수
    try {
      if (code === '00') {
        setIsErrorModal({
          state: true,
          message: '택배사를 선택해주세요.',
        });
      } else {
        console.log(ordersId);
        console.log(code);
        console.log(name);
        console.log(invoice);
        const response = await API.get(
          `/farmer/sendparcel/${ordersId}/${code}/${name}/${invoice}`,
          token
        );
        const data = response.data;
        setIsErrorModal({
          state: true,
          message: data,
        });

        console.log(data);
        setCode('00');
        setInvoice('');
        setIsOpen(false);
        // 페이지 다시 요청
        window.location.reload();
      }
    } catch (error) {
      setIsErrorModal({
        state: true,
        message: error.data,
      });
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div className="quotation-status-header">
        <div className="warning-text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
          >
            <ellipse
              cx="10.2691"
              cy="10.5273"
              rx="9.72222"
              ry="10"
              fill="#49680D"
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".3em"
              fill="#fff"
              fontSize="12"
            >
              !
            </text>
          </svg>
          <span>
            &nbsp;&nbsp;배송 완료 된 견적서는 배송 현황에서 볼 수 있습니다!
          </span>
        </div>
        <div className="state-dropdown">
          <button className="state-dropbtn">
            {type === 'matching' ? '매칭' : '주문'}
          </button>
          <div className="state-dropdown-content">
            <Link
              href="#"
              key="1"
              onClick={() => changeType('matching')}
            >
              매칭
            </Link>
            <Link
              href="#"
              key="2"
              onClick={() => changeType('order')}
            >
              주문
            </Link>
          </div>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{ backgroundColor: '#fefcf4' }}
          className="quot-list"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">&nbsp;</TableCell>
              <TableCell align="center">주문번호</TableCell>
              <TableCell align="center">농산물</TableCell>
              <TableCell align="center">가격</TableCell>
              <TableCell align="center">수량&nbsp;</TableCell>
              <TableCell align="center">받는이&nbsp;</TableCell>
              <TableCell align="center">연락처&nbsp;</TableCell>
              <TableCell align="center">주소&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordList.length > 0 && ordList.map(ord => (
              <TableRow key={ord.receiptId}>
                <TableCell>
                  <button className="quotation-delete-btn" onClick={() => onClickButton(ord.receiptId, ord.productName, ord.quotationQuantity)}>발송</button>
                </TableCell>
                <TableCell align="center">
                  <Link to={`/farmerpage/orderlist/orderdetail/${ord.receiptId}/${type}`}>
                    {ord.receiptId}
                  </Link>
                </TableCell>
                <TableCell align="center">{ord.productName}</TableCell>
                <TableCell align="center">{ord.productPrice}</TableCell>
                <TableCell align="center">{ord.quotationQuantity}</TableCell>
                <TableCell align="center">{ord.buyerName}</TableCell>
                <TableCell align="center">{ord.buyerTel}</TableCell>
                <TableCell align="center">{ord.buyerAddress}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div>
          <Stack
            spacing={2}
            alignItems="center"
          >
            <Pagination
              count={pageInfo?.allPage}
              page={pageInfo?.curPage}
              onChange={onChangePage}
              size="small"
            />
          </Stack>
        </div>
      </TableContainer>
      {isOpen && (
        <div
          id="myModal"
          className="modal"
          onClick={handleOutsideClick}
        >
          {/* 모달 내용 */}
          <div className="modal-content">
            <span
              className="close"
              onClick={closeModal}
            >
              &times;
            </span>
            <h1 className="header">발송 입력</h1>
            <div className="flexContainer">
              <p>order 번호 : {ordersId}</p>
              <p>품 목 : {product}</p>
              <p>수 량 : {quantity}</p>
              <p>
                택 배 사 :
                <select
                  name="tcode"
                  onChange={handleSelect}
                >
                  <option
                    value="00"
                    selected
                  >
                    선택
                  </option>
                  {company.length > 0 &&
                    company.map((com) => (
                      <option
                        key={com.code}
                        value={com.code}
                        data-name={com.name}
                      >
                        {com.name}
                      </option>
                    ))}
                </select>
              </p>
              <p>
                송장 번호 :{' '}
                <input
                  type="text"
                  value={invoice}
                  onChange={handleInvoice}
                />
              </p>
              <button
                className="button"
                onClick={() => sendparcel(ordersId)}
              >
                발송
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
