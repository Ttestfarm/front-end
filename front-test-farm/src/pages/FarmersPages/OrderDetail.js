import React, { useEffect, useState } from 'react';
import './style/OrderDeatil.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  tokenAtom,
  isErrorModalAtom,
  isSuccessModalAtom,
} from '../../recoil/Atoms'; //리코일
import { useRecoilValue } from 'recoil'; // 리코일
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent } from '@mui/material';
import * as API from '../../api/index';
import { useRecoilState } from 'recoil';

const OrderDetail = () => {
  const token = useRecoilValue(tokenAtom); //리코일
  const [ord, setOrd] = useState({});
  const { receiptId, type } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [cancelText, setCancelText] = useState();
  const [, setIsErrorModal] = useRecoilState(isErrorModalAtom);
  const [, setIsSucceessModal] = useRecoilState(isSuccessModalAtom);

  const testFunction = async () => {
    try {
      const response = await API.get(
        `/farmer/orderdetail/${receiptId}/${type}`,
        token
      );
      const data = response.data;
      setOrd(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    testFunction();
  }, []);

  const changeCancelText = (e) => {
    setCancelText(e.target.value);
  };

  const sendCancelText = async () => {
    // console.log(cancelText);
    try {
      if (cancelText !== null) {
        const response = await API.post(`/farmer/ordercancel`, token, {
          receiptId: receiptId,
          cancelText: cancelText,
        });
        const data = response.data;
        setIsSucceessModal({ state: true, message: data });
        console.log(data);
        setOpen(false);
        // 결제 완료 페이지로 이동
        navigate('/farmerpage/orderList');
      } else {
        setIsErrorModal({
          state: true,
          message: '판매 취소 사유를 적어주세요.',
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="compleate-detail-form">
      <div className="compleate-detail-form-header">
        <h2>주문번호 {ord.receiptId}</h2>
        <span>
          {ord.paymentState === '1' ? '결제완료' : '결제취소'} {ord.paidAt}
        </span>
      </div>
      <hr />
      <div className="info">
        <h3>배송정보</h3>
        <p>
          <span>수령인</span>
          <span>{ord.buyerName}</span>
        </p>
        <p>
          <span>연락처</span>
          <span>{ord.buyerTel}</span>
        </p>
        <p>
          <span>배송주소</span>
          <span>{ord.buyerAddress}</span>
        </p>
        <p>
          <span>품목</span>
          <span>{ord.productName}</span>
        </p>
        <p>
          <span>수량</span>
          <span>{ord.quotationQuantity}</span>
        </p>
      </div>
      <hr />
      {/* <div className="info">
        <h3>배송메모</h3>
        <p>
          <span>수령장소</span>
          <span>{ }</span>
        </p>
      </div>
      <hr /> */}
      <div className="info">
        <h3>결제정보</h3>
        <p>
          <span>결제수단</span>
          <span>{ord.pgType}</span>
        </p>
        <p>
          <span>상품금액</span>
          <span>{ord.productPrice}</span>
        </p>
        <p>
          <span>배송비</span>
          <span>
            {ord.paymentDelivery === 0 ? '무료' : ord.paymentDelivery}
          </span>
        </p>
        <p>
          <h3>총 결제금액</h3>
          <span>{ord.amount}</span>
        </p>
      </div>
      <hr />
      <div className="compleate-detail-form-btns">
        <button className="compleate-detail-form-btn">
          <Link to={'/farmerpage/orderlist'}>목록으로</Link>
        </button>
        <button
          className="compleate-detail-form-btn"
          id="myBtn"
          onClick={handleClickOpen}
        >
          판매 취소
        </button>

        {open && (
          <React.Fragment>
            <Dialog
              open={open}
              onClose={handleClose}
            >
              <DialogTitle>판매 취소</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  &nbsp;잦은 판매 취소는 서비스 이용에 페널티가 주어 질 수
                  있습니다. 결제 완료한 고객에게 취소 사유를 적어서 보내주세요.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="취소 사유"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={changeCancelText}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>취소</Button>
                <Button onClick={sendCancelText}>확인</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        )}
      </div>
      <div className="compleate-detail-form-notice">
        <span>
          # 무분별한 판매 취소는 서비스 이용에 페널티가 부여됩니다. 주의하세요!
        </span>
      </div>
    </div>
  );
};

export default OrderDetail;
