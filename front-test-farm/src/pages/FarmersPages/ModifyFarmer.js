import React, { useState, useEffect, useRef, useCallback } from 'react';
import RegistSection from './../../components/UI/RegistSection';
import style from './style/ModifyFarmer.module.css';

import useUserInput from '../../hooks/use-userInput';
import picDefault from '../../assets/pic-default.png';
import { Checkbox } from '../../components/UI/Checkbox';
import * as API from '../../api/index';
import Postcode from '../../api/PostCode';
import { Form, useNavigate } from 'react-router-dom';
import HandleRegistrationNumCheck from '../../api/registrationNumCheck';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import * as val from '../../util/validation';
import {
  isSuccessModalAtom,
  isErrorModalAtom,
  isPostcodeModalAtom,
  postcodeAddressAtom,
  userInfoAtom,
  tokenAtom,
} from '../../recoil/Atoms';

import { bankOption } from '../../util/payment';

const ModifyFarmerPage = ({ page }) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const token = useRecoilValue(tokenAtom);
  const [farmerInfo, setFarmerInfo] = useState({});
  const [updateData, setUpdateData] = useState({ ...farmerInfo });
  const [file, setFile] = useState('');
  const [myFarmTel, setMyFarmTel] = useState(false);
  const [registrationNum, setRegistrationNum] = useState(false);
  const [regiNumMsg, setRegiNumMsg] = useState('');
  const [selected, setSelected] = useState('');
  const [userTel, setUserTel] = useState('');

  const [isPostcodeModal, setIsPostcodeModal] =
    useRecoilState(isPostcodeModalAtom);
  const [address2, setAddress2] = useRecoilState(postcodeAddressAtom);

  useEffect(() => {
    const getFarmerInfo = async () => {
      try {
        const response = await API.get(
          `/farmer/farmerInfo/${userInfo.farmerId}`,
          token
        );
        setFarmerInfo(response.data);
      } catch (error) {
        // 오류 처리
        console.error(error);
      }
    };

    if (userInfo.farmerId) {
      getFarmerInfo();
    }
  }, [userInfo, token]);

  useEffect(() => {
    if (farmerInfo) {
      setUpdateData({
        farmName: farmerInfo?.farmName || '',
        farmTel: farmerInfo?.farmTel || '',
        farmAddress: farmerInfo?.farmAddress || '',
        farmAddressDetail: farmerInfo?.farmAddressDetail || '',
        registrationNum: farmerInfo?.registrationNum || '',
        farmBank: farmerInfo?.farmBank || '',
        farmAccountNum: farmerInfo?.farmAccountNum || '',
        farmInterest: farmerInfo?.farmInterest || '',
        farmPixurl: farmerInfo?.farmPixurl || '',
      });
    }
  }, [farmerInfo]);

  useEffect(() => {
    if (farmerInfo) {
      setUpdateData((prevData) => ({
        ...prevData,
        farmInterest: formattedFarmInterest(farmerInfo.farmInterest),
      }));
    }
  }, [farmerInfo]);

  const formattedFarmInterest = (farmInterest) => {
    if (!farmInterest) {
      return '';
    }

    return farmInterest
      .split(', ') // 주어진 데이터 형태에 따라 ', '로 분리
      .map((item) => {
        const trimmedItem = item.trim();
        return trimmedItem.startsWith('#') ? trimmedItem : `#${trimmedItem}`;
      }) // 각 단어 앞에 '#' 추가
      .join(' ');
  };

  const navigate = useNavigate();

  const inputHandle = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (page === 'reg-farmer' && userInfo && userInfo.farmerId !== null) {
      navigate('/farmerpage/requestlist');
    }
  }, [userInfo.farmerId]);

  useEffect(() => {
    if (page === 'modify-farm' && !token) {
      navigate('/login');
    }
  }, [userInfo]);

  useEffect(() => {
    return () => {
      setAddress2('');
    };
  }, [setAddress2]);

  // useEffect(() => {
  //   if (myFarmTel) {
  //     setUserTel(userInfo.userTel || '');
  //   } else {
  //     setUserTel('');
  //   }
  // }, [myFarmTel, userInfo]);

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
  } = useUserInput(val.isNotEmptyfarmName);

  const {
    value: farmTelValue,
    isValid: farmTelIsValid,
    hasError: farmTelHasError,
    valueChangeHandler: farmTelChangeHandler,
    inputBlurHandler: farmTelBlurHandler,
    reset: resetfarmTel,
  } = useUserInput(val.isTel, updateData.farmTel, setUpdateData);

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
  } = useUserInput(
    val.isNotEmptyValue,
    false,
    updateData.farmAddressDetail,
    setUpdateData
  );

  const {
    value: registrationNumValue,
    isValid: registrationNumIsValid,
    hasError: registrationNumHasError,
    valueChangeHandler: registrationNumChangeHandler,
    inputBlurHandler: registrationNumBlurHandler,
    reset: resetRegistrationNum,
  } = useUserInput(
    val.isNotEmptyValue,
    false,
    updateData.registrationNum,
    setUpdateData
  );

  const {
    value: farmAccountNumValue,
    isValid: farmAccountNumIsValid,
    hasError: farmAccountNumHasError,
    valueChangeHandler: farmAccountNumChangeHandler,
    inputBlurHandler: farmAccountNumBlurHandler,
    reset: resetfarmAccountNum,
  } = useUserInput(val.isNotEmptyValue);

  const {
    value: farmInterestValue,
    isValid: farmInterestIsValid,
    valueChangeHandler: farmInterestChangeHandler,
    inputBlurHandler: farmInterestBlurHandler,
    reset: resetfarmInterest,
  } = useUserInput(val.isNotEmptyValue);

  //이미지 바꾸면 화면에 출력하기
  const onFileChange = (e) => {
    const imageSrc = URL.createObjectURL(e.target.files[0]);
    imgBoxRef.current.src = imageSrc;

    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  //주소찾기 모달 열기
  const onClicktoggleAddressModal = async (e) => {
    e.preventDefault();
    setIsPostcodeModal((prev) => !prev);
  };

  //사업자등록번호 확인
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
    farmAccountNumIsValid &&
    registrationNumIsValid &&
    file
  ) {
    formIsValid = true;
  }

  const RegistHandler = async (e) => {

    try {
      const response = await API.put(
        `/farmer/modify-farmer`,
        token,
        updateData
      );

      setFarmerInfo({ ...response.data });
      if (response.status === 200) {
        setIsSucessModal({
          state: true,
          message: '파머 정보가 수정 되었습니다.',
        });
      }
      navigate('/farmers/requestlist');
    } catch (error) {
      console.log(error);
      setIsErrorModal({
        state: true,
        message: error.message,
      });
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

  const registrationNumStyles = registrationNumHasError
    ? `${style['form-control']} ${style.invalid}`
    : style['form-control'];

  const farmAccountStyles = farmAccountNumHasError
    ? `${style['form-control']} ${style.invalid}`
    : style['form-control'];

  return (
    <RegistSection title={'팜 정보 관리'}>
      <Form>
        <div className={farmNameStyles}>
          <label htmlFor="farmName">팜 이름</label>
          <input
            ref={inputRef}
            type="text"
            id="farmName"
            name="farmName"
            value={updateData.farmName}
            onChange={inputHandle}
            onBlur={farmNameBlurHandler}
            placeholder={'농장 이름을 입력하세요.'}
          />
          {farmNameHasError && (
            <p className={style['error-text']}>
              이름은 2자 ~ 9자까지 입력가능합니다.
            </p>
          )}
        </div>

        <div className={style['form-control']}>
          <label htmlFor="file">팜 대표사진</label>
          <img
            //src={picDefault}
            src={`${API.imgUrl}/${updateData.farmPixurl}` || picDefault}
            width="150px"
            height="150px"
            alt="Farm pix"
            ref={imgBoxRef}
            value={updateData.farmPixurl}
            onClick={() => document.getElementById('file').click()}
          />
          <input
            type="file"
            id="file"
            name="file"
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
            value={updateData.farmTel}
            onChange={inputHandle}
            onBlur={farmTelBlurHandler}
            placeholder={'숫자만 입력해 주세요.'}
          />
          {farmTelHasError && (
            <p className={style['error-text']}>전화번호를 정확히 입력하세요.</p>
          )}

          {/* <Checkbox
            checked={myFarmTel}
            onChange={setMyFarmTel}
          >
            <span>내 핸드폰 번호 사용하기</span>
          </Checkbox> */}
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
            value={updateData.farmAddress}
            // onChange={farmAddressChangeHandler}
            // onBlur={farmAddressBlurHandler}
            placeholder={'도로명 주소'}
            disabled
          />
          <input
            type="text"
            name="farmAddressDetail"
            value={updateData.farmAddressDetail}
            onChange={inputHandle}
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
            id="registrationNum"
            name="registrationNum"
            value={updateData.registrationNum}
            onChange={inputHandle}
            onBlur={registrationNumBlurHandler}
            placeholder={'숫자만 입력해 주세요.'}
          />
          {registrationNumHasError && (
            <p className={style['error-text']}>
              사업자 등록번호를 확인해주세요.
            </p>
          )}
          {registrationNum === true && (
            <p className={style['success-text']}>{regiNumMsg}</p>
          )}
        </div>

        <div className={farmAccountStyles}>
          <label htmlFor="farmAccountNum">계좌번호</label>
          <select
            id="bank-select"
            name="farmBank"
            value={updateData.farmBank}
            onChange={selectHandler}
          >
            <option
              value=""
              disabled
            >
              은행 선택
            </option>
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
            value={updateData.farmAccountNum}
            onChange={inputHandle}
            onBlur={farmAccountNumBlurHandler}
            placeholder={'계좌번호를 입력해 주세요. (숫자만 입력)'}
          />
          {farmAccountNumHasError && (
            <p className={style['error-text']}>
              정산을 위해 계좌번호를 입력해주세요.
            </p>
          )}
        </div>

        <div className={style['form-control']}>
          <label htmlFor="farmInterest">관심 품목 설정</label>
          <input
            type="text"
            id="farm-interest"
            name="farmInterest"
            value={formattedFarmInterest(updateData.farmInterest)}
            onChange={inputHandle}
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
          //disabled={!formIsValid}
          onClick={RegistHandler}
        >
          완료
        </button>
      </Form>
      {isPostcodeModal && <Postcode />}
    </RegistSection>
  );
};

export default ModifyFarmerPage;
