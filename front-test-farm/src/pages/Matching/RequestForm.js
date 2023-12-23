import React, { useState, useEffect } from 'react';
import style from './RequestForm.module.css';
import Card from '../../components/UI/Card';
import Postcode from '../../api/PostCode';
import * as API from '../../api/index';
import { Form, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  userInfoAtom,
  isPostcodeModalAtom,
  postcodeAddressAtom,
  zonecodeAtom,
  isErrorModalAtom,
  isSuccessModalAtom,
  tokenAtom,
} from '../../recoil/Atoms';

const RequestForm = () => {
  const token = useRecoilValue(tokenAtom);
  const [userInfo] = useRecoilState(userInfoAtom);
  const [data, setData] = useState({
    requestProduct: '',
    requestQuantity: '',
    requestDate: '',
    requestMessage: '',
    tel: userInfo.userTel,
    address1: userInfo.address1,
    address2: userInfo.address2,
    address3: userInfo.address3,
  });

  const [isPostcodeModal, setIsPostcodeModal] =
    useRecoilState(isPostcodeModalAtom);
  const [address2, setAddress2] = useRecoilState(postcodeAddressAtom);
  const [address1, setAddress1] = useRecoilState(zonecodeAtom);

  const setIsSucessModal = useSetRecoilState(isSuccessModalAtom);
  const setIsErrorModal = useSetRecoilState(isErrorModalAtom);

  const navigate = useNavigate();

  const inputHandle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (address1 && address2) {
      setData({ ...data, address1, address2 });
    }
  }, [address1, address2]);

  //주소찾기 모달 열기
  const onClicktoggleAddressModal = async (e) => {
    e.preventDefault();
    setIsPostcodeModal((prev) => !prev);
  };

  //datepicker
  const today = dayjs();
  const oneMonthLater = today.add(1, 'month');
  const datePickerFormat = 'YYYY-MM-DD';
  const datePickerUtils = {
    format: datePickerFormat,
    parse: (value) => dayjs(value, datePickerFormat, true).toDate(),
  };
  const dateFormatChange = (date) => {
    const formattedDate = dayjs(date).format(datePickerFormat);
    setData((prev) => ({
      ...prev,
      requestDate: formattedDate,
    }));
  };
  //datepicker 끝

  const resetHandler = (e) => {
    e.preventDefault();

    setData({
      requestProduct: '',
      requestQuantity: '',
      requestDate: '',
      requestMessage: '',
      tel: userInfo?.userTel,
      address1: userInfo?.address1,
      //address1: userInfo.address1 != null ? userInfo.address1 : '',
      address2: userInfo.address2 != null ? userInfo.address2 : '',
      address3: userInfo?.address3,
    });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const enteredData = {
        ...data,
      };
      console.log('entered', enteredData);
      const response = await API.post(`/matching/request`, token, enteredData);

      console.log('response', response);

      if (response.status === 200) {
        setIsSucessModal({
          state: true,
          message: response.data,
        });
      }

      resetHandler(e);
      navigate('/matching');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.container}>
      <Card width="60%">
        <Form
          onSubmit={SubmitHandler}
          className={style.main}
        >
          <div className={style.left}>
            <p>필요한 농산물은</p>
            <p>필요한 양은</p>
            <p>개수 혹은 kg 단위로 적어주세요.</p>
            <p>요청 사항</p>
            <p>요청 기간 설정</p>
            <p>배송 주소는</p>
            <p>배송 전화번호</p>
          </div>
          <div className={style.right}>
            <TextField
              id="outlined-basic margin-dense"
              variant="outlined"
              name="requestProduct"
              label="요청 농산물"
              value={data.requestProduct}
              onChange={inputHandle}
              sx={{ width: '16rem', margin: 2 }}
              size="small"
            />
            <TextField
              id="outlined-basic"
              label="필요한 양"
              variant="outlined"
              name="requestQuantity"
              value={data.requestQuantity}
              onChange={inputHandle}
              size="small"
              sx={{ width: '16rem', margin: 2 }}
            />

            <TextField
              id="outlined-basic"
              variant="outlined"
              label="요청 메세지"
              name="requestMessage"
              value={data.requestMessage}
              onChange={inputHandle}
              size="small"
              sx={{ width: '16rem', margin: 2 }}
            />
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              dateFormats={datePickerUtils}
            >
              <div components={['DatePicker']}>
                <DatePicker
                  format="YYYY-MM-DD"
                  defaultValue={dayjs()}
                  disablePast
                  showDaysOutsideCurrentMonth
                  maxDate={oneMonthLater}
                  value={data.requestDate}
                  size="small"
                  onChange={(newValue) => {
                    dateFormatChange(newValue);
                  }}
                  sx={{ margin: 2 }}
                />
              </div>
            </LocalizationProvider>
            <div className={style.address}>
              <input
                type="text"
                name="address1"
                value={data.address1}
                className={style.zipcode}
                placeholder={'우편번호'}
                disabled
              />
              <button
                className={style['certify-btn']}
                onClick={onClicktoggleAddressModal}
              >
                주소 찾기
              </button>
              <input
                type="text"
                name="address2"
                value={data.address2}
                placeholder={'도로명 주소'}
                disabled
              />
              <input
                type="text"
                name="address3"
                value={data.address3}
                onChange={inputHandle}
                placeholder={'상세 주소를 입력해 주세요.'}
              />
            </div>
            <input
              type="text"
              name="tel"
              value={data.tel}
              onChange={inputHandle}
              placeholder={'전화번호는 숫자만 입력해 주세요. (예:01056781234)'}
            />
          </div>
        </Form>
        <div className={style.infobox}>
          <div className={style.title}>
            <ErrorOutlineIcon
              fontSize="small"
              color="success"
              margin="dense"
            />
            유의 사항
          </div>
          <p>
            • 언프리티팜은 못난이 농산물의 특성상 개성있는 농산물이 배송됩니다.
          </p>
          <p>• 환불이 불가능합니다. 신중하게 요청해 주세요!</p>
          <p>• 배송 주소는 매칭 완료시 파머님께만 보여집니다.</p>
          <p className={style.padding1}>
            • 매칭 신청 내용은 수정이 되지 않습니다!
          </p>
          <p className={style.padding}>
            수정을 원하시면 삭제 후 재작성 부탁드립니다.
          </p>
          <p className={style.padding1}>
            • 매칭 유효기간은 기본 3일이며, 최대 1개월까지 설정 가능합니다.
          </p>
          <p className={style.padding}>
            기간이 만료된 신청은 자동으로 삭제됩니다.
          </p>
        </div>
        <footer className={style.footer}>
          <button
            onClick={(e) => resetHandler(e)}
            className={style.btn1}
          >
            다시쓰기
          </button>
          <button
            type="submit"
            className={style.btn}
          >
            매칭 신청
          </button>
          <button
            onClick={() => navigate('/matching')}
            className={style.btn1}
          >
            돌아가기
          </button>
        </footer>

        {isPostcodeModal && <Postcode />}
      </Card>
    </div>
  );
};

export default RequestForm;
