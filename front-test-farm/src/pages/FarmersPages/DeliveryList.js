import React, { useEffect, useState } from 'react';
import style from './style/QuotStatus.css';
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

const DeliveryList = () => {
  const token = useRecoilValue(tokenAtom); //리코일

  const [deliveryList, setDeliveryList] = useState([]);
  const [page, setPage] = useState(0);
  const [state, setState] = useState("SHIPPING"); // 0:오류, 1:배송중, 2:배송완료

  const testFunction = async() => {
    try {
      const response = await API.get(`/farmer/deliverylist/${state}/${page}`, token);
      const data = response.data;
      setDeliveryList([...data.deliveryList]);
      setPage(data.pageInfo);
    } catch(error) {
      console.error('Error fetching data:', error);
    }     
  }
  useEffect(() => {
    testFunction();
  }, []);

  const changeState = async (select) => {
    try {
      setState(select);
      if (state === select) {
        alert("이미 선택 하셨습니다.");
      } else {
        const response = await API.get(`/farmer/deliverylist/${select}/${page.curPage}`, token);
        const data = response.data;
        setDeliveryList([...data.deliveryList]);
        setPage(data.pageInfo);
      } 
    } catch(error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
    <div className="delivery-header">
      <div>
        <button className="delivery-delete-btn" onClick={() => changeState("SHIPPING")}>배송중</button>
        <button className="delivery-delete-btn" onClick={() => changeState("COMPLETED")}>배송완료</button>
      </div >
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ backgroundColor: '#fefcf4' }} className='quot-list' aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">주문번호</TableCell>
              <TableCell align="right">품목</TableCell>
              <TableCell align="right">수량</TableCell>
              <TableCell align="right">가격&nbsp;</TableCell>
              <TableCell align="right">주소&nbsp;</TableCell>
              <TableCell align="right">상태&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveryList.length > 0 ? deliveryList.map(dlist => (
            <TableRow key={dlist.deliveryId}>
              <TableCell align="right">{dlist.ordersId}</TableCell>
              <TableCell align="right">{dlist.product}</TableCell>
              <TableCell align="right">{dlist.quantity}</TableCell>
              {/* <TableCell align="right">{dlist.tinvoice}</TableCell> */}
              <TableCell align="right">{dlist.price}</TableCell>
              <TableCell align="right">{dlist.address}</TableCell>
              <TableCell align="right">{dlist.deliveryState}</TableCell>
            </TableRow>
          ))
          : "배송 리스트가 없습니다."
        }
          
        </TableBody>
        </Table>
      </TableContainer>
      </div>
  );
};

export default DeliveryList;
