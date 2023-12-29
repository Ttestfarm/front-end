import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './RequestForm.module.css';
import Card from '../../components/UI/Card';
import uglyfarm from '../../assets/uglyfarm.jpg';
import Postcode from '../../api/PostCode';
import * as API from '../../api/index';
import { Form, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

import { handleSetValue, handleSetTab } from '../../util/textInsertWithTab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  userInfoAtom,
  isPostcodeModalAtom,
  postcodeAddressAtom,
  zonecodeAtom,
  isSuccessModalAtom,
  tokenAtom,
} from '../../recoil/Atoms';

const RequestForm = ({ page }) => {
  const token = useRecoilValue(tokenAtom);
  const { requestProduct = '', requestQuantity = '' } = useParams();
  const userInfo = useRecoilValue(userInfoAtom);
  const [data, setData] = useState({
    requestProduct: requestProduct || '',
    requestQuantity: requestQuantity || '',
    requestDate: '',
    //requestMessage: '',
    tel: userInfo.userTel,
    address1: userInfo.address1,
    address2: userInfo.address2,
    address3: userInfo.address3,
  });
  const [reqMsg, setReqMsg] = useState('');

  const [isPostcodeModal, setIsPostcodeModal] =
    useRecoilState(isPostcodeModalAtom);
  const [address2, setAddress2] = useRecoilState(postcodeAddressAtom);
  const [address1, setAddress1] = useRecoilState(zonecodeAtom);

  const setIsSucessModal = useSetRecoilState(isSuccessModalAtom);

  const navigate = useNavigate();
  const inputStyle = { width: '90%', margin: 1, color: 'success' };

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

  const disabled =
    data.requestProduct === '' ||
    data.requestQuantity === '' ||
    data.requestDate === '' ||
    data.tel === null ||
    data.address1 === null ||
    data.address2 === null ||
    data.address3 === null ||
    reqMsg === '';

  const resetHandler = (e) => {
    e.preventDefault();

    setReqMsg('');
    setData({
      requestProduct: requestProduct || '',
      requestQuantity: requestQuantity || '',
      requestDate: '',
      tel: userInfo.userTel != null ? userInfo.userTel : '',
      address1: userInfo.address1 != null ? userInfo.address1 : '',
      address2: userInfo.address2 != null ? userInfo.address2 : '',
      address3: userInfo.address3 != null ? userInfo.address3 : '',
    });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const enteredData = {
        ...data,
        requestMessage: reqMsg,
      };
      const response = await API.post(`/matching/request`, token, enteredData);


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
      <Card width="55%">
        <h1>못난이 농산물을 요청합니다!</h1>
        <Form onSubmit={SubmitHandler}>
          <div className={style.main}>
            <div className={style.left}>
              <img
                src={uglyfarm}
                alt="agly"
              />
            </div>
            <div className={style.right}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="requestProduct"
                label="요청 농산물"
                value={data.requestProduct}
                onChange={inputHandle}
                sx={inputStyle}
                size="small"
                color="success"
              />
              <TextField
                id="outlined-basic"
                label="필요한 양"
                variant="outlined"
                name="requestQuantity"
                value={data.requestQuantity}
                onChange={inputHandle}
                size="small"
                helperText="kg/박스 또는 개수"
                sx={inputStyle}
                color="success"
              />

              <TextField
                variant="outlined"
                label="요청 메세지"
                id="outlined-multiline-flexible"
                multiline
                rows={3}
                name="requestMessage"
                value={reqMsg}
                onChange={(e) => handleSetValue(e, setReqMsg)}
                onKeyDown={(e) => handleSetTab(e)}
                size="small"
                sx={inputStyle}
                color="success"
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
                    label="요청서 유효기간"
                    showDaysOutsideCurrentMonth
                    maxDate={oneMonthLater}
                    value={data.requestDate}
                    slotProps={{ textField: { size: 'small' } }}
                    onChange={(newValue) => {
                      dateFormatChange(newValue);
                    }}
                    sx={inputStyle}
                    color="success"
                  />
                </div>
              </LocalizationProvider>
              <div className={style.address}>
                <input
                  type="text"
                  name="address1"
                  value={data.address1}
                  hidden
                />
                <input
                  type="text"
                  name="address2"
                  value={data.address2}
                  placeholder={'도로명 주소'}
                  disabled
                  sx={inputStyle}
                />
                <button
                  className={style['certify-btn']}
                  onClick={onClicktoggleAddressModal}
                >
                  <TravelExploreIcon color="success" />
                </button>
              </div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="상세주소"
                name="address3"
                value={data.address3}
                onChange={inputHandle}
                size="small"
                sx={inputStyle}
                color="success"
              />
              <TextField
                id="outlined-basic"
                label="받는 분 연락처"
                variant="outlined"
                name="tel"
                value={data.tel}
                onChange={inputHandle}
                size="small"
                helperText="숫자만 입력(01056781004)"
                sx={inputStyle}
                color="success"
              />
            </div>
          </div>
          <div className={style.infobox}>
            <div className={style.title}>
              <ErrorOutlineIcon
                fontSize="small"
                color="success"
              />
              유의 사항
            </div>
            <p>
              • 언프리티팜은 못난이 농산물의 특성상 개성있는 농산물이
              배송됩니다.
            </p>
            <p>• 아쉽지만 환불이 불가능해요. 신중하게 요청해 주세요!</p>
            <p>• 배송 주소와 연락처는 매칭 완료시 파머님에게만 보여집니다.</p>
            <p className={style.padding1}>
              • 매칭 신청 내용은 수정이 되지 않습니다!
            </p>
            <p className={style.padding}>
              수정을 원하시면 삭제 후 재작성 부탁드립니다.
            </p>
            <p className={style.padding1}>
              • 매칭 유효기간은 오늘로부터 최대 1개월까지 설정 가능합니다.
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
              disabled={disabled}
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
        </Form>
        {isPostcodeModal && <Postcode />}
      </Card>
    </div>
  );
};

export default RequestForm;
