import React, { useEffect, useState } from 'react';
import style from './style/QuotStatus.css';
import { tokenAtom } from '../../recoil/Atoms'; //리코일 
import { useRecoilValue } from 'recoil'; // 리코일
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
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
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    allPage: 1,
    curPage: 1,
    startPage: 1,
    endPage: 0,
  });
  const [state, setState] = useState("SHIPPING"); // 0:오류, 1:배송중, 2:배송완료

  const testFunction = async () => {
    try {
      const response = await API.get(`/farmer/deliverylist/${state}/${page}`, token);
      const data = response.data;
      setDeliveryList([...data.deliveryList]);
      setPageInfo([...data.pageInfo]);
      console.log(data.deliveryList);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    testFunction();
  }, []);

  const onChangePage = (_, value) => {
    setPage(value);
  };
  const changeState = async (select) => {
    try {
      setState(select);
      if (state === select) {
        alert("이미 선택 하셨습니다.");
      } else {
        console.log(select);
        console.log(state);
        const response = await API.get(`/farmer/deliverylist/${select}/${page}`, token);
        const data = response.data;
        setDeliveryList([...data.deliveryList]);
        setPageInfo(data.pageInfo);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div className="delivery-header">
        <div>
          <div className="button-group">
            <button className="delivery-delete-btn" onClick={() => changeState("SHIPPING")}>배송중</button>
            <button className="delivery-delete-btn" onClick={() => changeState("COMPLETED")}>배송완료</button>
          </div>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ backgroundColor: '#fefcf4' }} className='quot-list' aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">주문번호</TableCell>
              <TableCell align="center">품목</TableCell>
              <TableCell align="center">수량</TableCell>
              <TableCell align="center">가격&nbsp;</TableCell>
              <TableCell align="center">주소&nbsp;</TableCell>
              <TableCell align="center">상태&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveryList.length > 0 ? deliveryList.map(dlist => (
              <TableRow key={dlist.receiptId}>
                <TableCell align="center">{dlist.receiptId}</TableCell>
                <TableCell align="center">{dlist.productName}</TableCell>
                <TableCell align="center">{dlist.quotationQuantity}</TableCell>
                {/* <TableCell align="center">{dlist.tinvoice}</TableCell> */}
                <TableCell align="center">{dlist.productPrice}</TableCell>
                <TableCell align="center">{dlist.buyerAddress}</TableCell>
                <TableCell align="center">{dlist.state === 'SHIPPING' ? '배송중' : '배송완료'}</TableCell>
              </TableRow>
            ))
              : "배송 리스트가 없습니다."
            }
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
    </div>
  );
};

export default DeliveryList;
