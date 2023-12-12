import React, { useState, useEffect, useRef, useCallback } from 'react';
import RegistSection from './../../components/UI/RegistSection';
import useUserInput from '../../hooks/use-userInput';
import style from './RegistFarmer.module.css';
import picDefault from '../../assets/pic-default.png';
import { Checkbox } from '../../components/UI/Checkbox';
import * as API from '../../api/index';
import Postcode from '../../api/PostCode';
import { Form, Navigate, useNavigate } from 'react-router-dom';
import HandleRegistrationNumCheck from '../../api/registrationNumCheck';
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  isSuccessModalAtom,
  isErrorModalAtom,
  isPostcodeModalAtom,
  postcodeAddressAtom,
} from '../../recoil/Atoms';

import { bankOption } from '../../util/payment';
import { userInfoAtom } from './../../recoil/Atoms';
// 유효성 검사 함수
const isNotEmpty = (value) =>
  /^[가-힝a-zA-Z0-9]{2,}$/.exec(value) && value.length >= 2;
const isTel = (value) =>
  value.trim().match(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/) ||
  value.trim().match(/^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]))(\d{3,4})(\d{4})$/);
const isNotEmptyValue = (value) => value.trim() !== '';

const RegistFarmerPage = ({ page }) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  const [farmerInfo, setFarmerInfo] = useState({});
  const [file, setFile] = useState('');
  const [myFarmTel, setMyFarmTel] = useState(false);
  const [registrationNum, setRegistrationNum] = useState(false);
  const [regiNumMsg, setRegiNumMsg] = useState('');
  const [selected, setSelected] = useState('');

  const [isPostcodeModal, setIsPostcodeModal] =
    useRecoilState(isPostcodeModalAtom);
  const [postcodeAddress, setPostcodeAddress] =
    useRecoilState(postcodeAddressAtom);

  const [formDatas, setFormDatas] = useState({
    farmName: '',
    farmTel: '',
    myFarmTel: '',
    farmAddress: '',
    farmAddressDetail: '',
    registrationNum: '',
    farmBank: '',
    farmAccountNum: '',
    farmInterest: '',
    farmpixurl: '',
  });

  useEffect(() => {
    if (farmerInfo) {
      setFormDatas({
        farmName: farmerInfo?.farmer?.farmName,
        farmTel: farmerInfo?.farmer?.farmTel,
        farmAddress: farmerInfo?.farmer?.farmAddress,
        farmAddressDetail: farmerInfo?.farmer?.farmAddressDetail,
        registrationNum: farmerInfo?.farmer?.registrationNum,
        farmBank: farmerInfo?.farmer?.farmBank,
        farmAccountNum: farmerInfo?.farmer?.farmAccountNum,
        farmInterest: farmerInfo?.farmer?.farmInterest,
      });
    }
  }, [farmerInfo]);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (page === 'reg-farmer') {
  //     navigate('/farmers');
  //   }
  // }, [userInfo]);

  useEffect(() => {
    if (page === 'modify-farm' && !localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [userInfo]);

  useEffect(() => {
    return () => {
      setPostcodeAddress('');
    };
  }, [setPostcodeAddress]);

  const setIsSucessModal = useSetRecoilState(isSuccessModalAtom);
  const setIsErrorModal = useSetRecoilState(isErrorModalAtom);

  const inputRef = useRef();
  const imgBoxRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const {
    value: farmNameValue,
    isValid: farmNameIsValid,
    hasError: farmNameHasError,
    valueChangeHandler: farmNameChangeHandler,
    inputBlurHandler: farmNameBlurHandler,
    reset: resetfarmName,
  } = useUserInput(isNotEmpty);

  const {
    value: farmTelValue,
    isValid: farmTelIsValid,
    hasError: farmTelHasError,
    valueChangeHandler: farmTelChangeHandler,
    inputBlurHandler: farmTelBlurHandler,
    reset: resetfarmTel,
  } = useUserInput(isTel);

  // const {
  //   value: { postcodeAddress },
  //   isValid: farmAddressIsValid,
  //   hasError: farmAddressHasError,
  //   valueChangeHandler: farmAddressChangeHandler,
  //   inputBlurHandler: farmAddressBlurHandler,
  //   reset: resetfarmAddress,
  // } = useUserInput(isNotEmptyValue);

  const {
    value: farmAddressDetailValue,
    isValid: farmAddressDetailIsValid,
    hasError: farmAddressDetailHasError,
    valueChangeHandler: farmAddressDetailChangeHandler,
    inputBlurHandler: farmAddressDetailBlurHandler,
    reset: resetfarmAddressDetail,
  } = useUserInput(isNotEmptyValue);

  const {
    value: registrationNumValue,
    valueChangeHandler: registrationNumChangeHandler,
    inputBlurHandler: registrationNumBlurHandler,
    reset: resetRegistrationNum,
  } = useUserInput(isNotEmptyValue);

  const {
    value: farmAccountNumValue,
    isValid: farmAccountNumIsValid,
    hasError: farmAccountHasError,
    valueChangeHandler: farmAccountNumChangeHandler,
    inputBlurHandler: farmAccountNumBlurHandler,
    reset: resetfarmAccountNum,
  } = useUserInput(isNotEmptyValue);

  const {
    value: farmInterestValue,
    isValid: farmInterestIsValid,

    valueChangeHandler: farmInterestChangeHandler,
    inputBlurHandler: farmInterestBlurHandler,
    reset: resetfarmInterest,
  } = useUserInput(isNotEmptyValue);

  const onFileChange = (e) => {
    // setFile(e.target.files[0]);
    const imageSrc = URL.createObjectURL(e.target.files[0]);
    imgBoxRef.current.src = imageSrc;
    console.log('file', imageSrc);
  };

  //주소찾기 모달 열기
  const onClicktoggleAddressModal = async (e) => {
    e.preventDefault();
    setIsPostcodeModal((prev) => !prev);
  };

  const registrationNumCheckHandler = async (e) => {
    e.preventDefault();
    const registrationNum = registrationNumValue;

    try {
      const data = await HandleRegistrationNumCheck(registrationNum);
      if (data === '01') {
        setRegistrationNum(true); // 영업중으로 확인되는 사업자
        setRegiNumMsg('✓ 확인되었습니다.');
      } else {
        setRegistrationNum(false); // 휴업, 폐업으로 확인되는 사업자
        setRegiNumMsg('사업자 등록번호 오류입니다.');
        setIsErrorModal({
          state: true,
          message: '등록할 수 없는 번호입니다.',
        });
      }
    } catch (error) {
      setIsErrorModal({
        state: true,
        message: error.message,
      });
      console.log(error);
    }
  };

  const selectHandler = (e) => {
    setSelected(e.target.value);
  };

  let formIsValid = false;

  if (
    farmNameIsValid &&
    farmTelIsValid &&
    farmAddressDetailIsValid &&
    registrationNum
  ) {
    formIsValid = true;
  }

  const RegistHandler = async (e) => {
    e.preventDefault();

    console.log('page', page);
    const formData = new FormData();
    formData.append('farmName', farmNameValue);
    formData.append('farmTel', farmTelValue);
    formData.append('myFarmTel', myFarmTel);
    formData.append('farmAddress', postcodeAddress);
    formData.append('farmAddressDetail', farmAddressDetailValue);
    formData.append('registrationNum', registrationNumValue);
    formData.append('farmInterest', farmInterestValue);
    formData.append('farmPixurl', file);

    try {
      if (page === 'reg-farmer') {
        console.log('제출용', formData);
        const result = await API.post('/reg-farmer', formData);
        console.log('------------------');
        console.log('result', result);
        // setIsSucessModal({
        //   state: true,
        //   message: '파머 등록 성공!',
        // });
        // navigate('/farmers');
      } else {
        await API.put(`/modify-farm/${userInfo?.user?.farmerId}`, formData);
        setIsSucessModal({
          state: true,
          message: '파머 정보 수정이 완료 되었습니다.',
        });
        navigate('/farmers');
      }
    } catch (error) {
      console.log(error);
      // setIsErrorModal({
      //   state: true,
      //   message: error.response,
      // });
    }
  };

  const farmNameStyles = farmNameHasError
    ? `${style['form-control']} ${style.invalid}`
    : style['form-control'];

  const farmTelStyles = farmTelHasError
    ? `${style['form-control']} ${style.invalid}`
    : style['form-control'];

  const farmAddressStyles = farmTelHasError
    ? `${style['form-control']} ${style.invalid}`
    : style['form-control'];

  const farmDetailAddressStyles = farmTelHasError
    ? `${style['form-control']} ${style.invalid}`
    : style['form-control'];

  const registrationNumStyles =
    registrationNum === 'false'
      ? `${style['form-control']} ${style.invalid}`
      : style['form-control'];

  const farmAccountStyles = farmAccountHasError
    ? `${style['form-control']} ${style.invalid}`
    : style['form-control'];

  return (
    <RegistSection title={'파머 신청'}>
      <Form>
        <div className={farmNameStyles}>
          <label htmlFor="farmName">팜 이름</label>
          <input
            ref={inputRef}
            type="text"
            id="farmName"
            name="farmName"
            value={farmNameValue}
            onChange={farmNameChangeHandler}
            onBlur={farmNameBlurHandler}
            placeholder={'농장 이름을 입력하세요.'}
          />
          {farmNameHasError && (
            <p className={style['error-text']}>
              이름은 최소 2글자 이상 입력하세요 (최대 9글자)
            </p>
          )}
        </div>

        <div className={style['form-control']}>
          <label htmlFor="file">팜 대표사진</label>
          <img
            src={picDefault}
            width="150px"
            height="150px"
            alt="picDefault"
            ref={imgBoxRef}
            onClick={() => document.getElementById('file').click()}
          />
          <input
            type="file"
            id="file"
            name="pixurl"
            accept="image/*"
            onChange={onFileChange}
            hidden
          />
        </div>

        <div className={farmTelStyles}>
          <label htmlFor="farmTel">팜 전화번호</label>
          <input
            type="text"
            id="farmTel"
            name="farmTel"
            value={farmTelValue}
            onChange={farmTelChangeHandler}
            onBlur={farmTelBlurHandler}
            placeholder={'01056781234 (숫자만 입력하셔도 됩니다.)'}
          />
          {farmTelHasError && (
            <p className={style['error-text']}>전화번호를 정확히 입력하세요.</p>
          )}

          <Checkbox
            checked={myFarmTel}
            onChange={setMyFarmTel}
          >
            <span>기본 전화번호로 설정하기</span>
          </Checkbox>
        </div>

        <div className={farmAddressStyles}>
          <div className={style.certify}>
            <label htmlFor="farmAddress">팜 주소</label>
            <button
              className={style['certify-btn']}
              onClick={onClicktoggleAddressModal}
            >
              주소 찾기
            </button>
          </div>

          <input
            type="text"
            name="farmAddress"
            value={postcodeAddress}
            // onChange={farmAddressChangeHandler}
            // onBlur={farmAddressBlurHandler}
            placeholder={'도로명 주소'}
            disabled
          />
          <input
            type="text"
            name="farmAddressDetail"
            value={farmAddressDetailValue}
            onChange={farmAddressDetailChangeHandler}
            onBlur={farmAddressDetailBlurHandler}
            placeholder={'상세 주소를 입력해 주세요.'}
          />
        </div>

        <div className={registrationNumStyles}>
          <div className={style.certify}>
            <label htmlFor="registrationNum">사업자 등록번호</label>
            <button
              className={style['certify-btn']}
              onClick={registrationNumCheckHandler}
            >
              확인
            </button>
          </div>
          <input
            type="text"
            name="registrationNum"
            value={registrationNumValue}
            onChange={registrationNumChangeHandler}
            onBlur={registrationNumBlurHandler}
            placeholder={'사업자 등록번호를 입력해 주세요.'}
          />
          <p className={style['error-text']}>{regiNumMsg}</p>
        </div>

        <div className={farmAccountStyles}>
          <label htmlFor="farmAccountNum">계좌번호</label>
          <select
            id="bank-select"
            name="farmBank"
            onChange={selectHandler}
            value={selected}
          >
            {bankOption.map((item) => (
              <option
                value={item}
                key={item}
              >
                {item}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="farmAccountNum"
            value={farmAccountNumValue}
            onChange={farmAccountNumChangeHandler}
            placeholder={'계좌번호를 입력해 주세요. (숫자만 입력)'}
          />
        </div>

        <div className={style['form-control']}>
          <label htmlFor="farmInterest">관심 품목 설정</label>
          <input
            type="text"
            id="farm-interest"
            name="farmInterest"
            value={farmInterestValue}
            onChange={farmInterestChangeHandler}
            placeholder={'예) #토마토 #바나나 #사과'}
          />

          <div className={style.notice}>
            <span>
              - 관심 품목으로 설정하면 해당 품목 매칭 요청서에 견적을 보낼
            </span>
            <span>&nbsp;&nbsp; 수 있습니다.</span>
            <span>- 판매 가능하신 품목 위주로 설정해주세요.</span>
            <span>- #품목 키워드 형식으로 작성해주세요.</span>
          </div>
        </div>

        <button
          className={style['join-btn']}
          disabled={!formIsValid}
          onClick={RegistHandler}
        >
          완료
        </button>
      </Form>
      {isPostcodeModal && <Postcode />}
    </RegistSection>
  );
};

export default RegistFarmerPage;
