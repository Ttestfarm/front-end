import React, { useState, useEffect } from 'react';
import style from './RequestForm.module.css';
import Card from '../../components/UI/Card';
import Postcode from '../../api/PostCode';
import { Form, Link } from 'react-router-dom';
import { Checkbox } from '../../components/UI/Checkbox';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  userInfoAtom,
  isPostcodeModalAtom,
  postcodeAddressAtom,
  zonecodeAtom,
  isErrorModalAtom,
  isSuccessModalAtom,
} from '../../recoil/Atoms';

const RequestForm = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [defaultInfo, setDefaultInfo] = useState(false);
  const [data, setData] = useState({});
  const [dInfo, setDInfo] = useState({
    address1: userInfo.address1,
    address2: userInfo.address2,
    address3: userInfo.address3,
    tel: userInfo.userTel,
  });
  const [isPostcodeModal, setIsPostcodeModal] =
    useRecoilState(isPostcodeModalAtom);
  const [address2, setAddress2] = useRecoilState(postcodeAddressAtom);
  const [address1, setAddress1] = useRecoilState(zonecodeAtom);

  const setIsSucessModal = useSetRecoilState(isSuccessModalAtom);
  const setIsErrorModal = useSetRecoilState(isErrorModalAtom);

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
  return (
    <Card width="80%">
      <Form>
        <div className={style.left}>
          <p>필요한 농산물은</p>
          <p>필요한 양은</p>
          <p>개수 혹은 kg 단위로 적어주세요.</p>
          <p>요청 사항</p>
          <p>요청 기간 설정</p>

          <Checkbox
            checked={defaultInfo}
            onChange={setDefaultInfo}
          >
            <span>기본 정보 불러오기</span>
          </Checkbox>
          <p>배송 주소는</p>
          <p>배송 전화번호</p>
        </div>
        <div className={style.right}>
          <input
            type="text"
            name="requestProduct"
            placeholder="맛좋은 사과"
          />
          <input
            type="text"
            name="requestQuantity"
            placeholder='1.5kg'
          />
          <input
            type="text"
            name="requestMessage"
            placeholder='많이 익지 않은 사과로 부탁드립니다.'
          />
          <input
            type="text"
            name="requestDate"
            
          />
          <div>
            <input
              type="text"
              disabled
              name="address1"
              value={dInfo.address1}
              className={style.zipcode}
              placeholder={'우편번호'}
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
              value={dInfo.address2}
              placeholder={'도로명 주소'}
              disabled
            />
            <input
              type="text"
              name="address3"
              value={dInfo.address3}
              onChange={inputHandle}
              placeholder={'상세 주소를 입력해 주세요.'}
            />
          </div>
          <input
            type="text"
            name="tel"
            value={dInfo.tel}
          />
        </div>
        <div className={style.infobox}>
          <div>유의 사항</div>
          <p>
            언프리티팜은 못난이 농산물의 특성상 개성있는 농산물이 배송됩니다.
          </p>
          <p>환불이 불가능합니다. 신중하게 요청해 주세요!</p>
          <p>배송 주소는 매칭 완료시 파머님께만 보여집니다.</p>
          <p>매칭 신청 내용은 수정이 되지 않습니다!</p>
          <p>수정을 원하시면 삭제 후 재작성 부탁드립니다.</p>
          <p>매칭 유효기간은 기본 3일이며, 최대 1개월까지 설정 가능합니다.</p>
          <p>기간이 만료된 신청은 자동으로 삭제됩니다.</p>
        </div>
        <footer>
          <button>
            <Link to="">다시쓰기</Link>
          </button>
          <button>매칭 신청</button>
          <button>돌아가기</button>
        </footer>
      </Form>
      {isPostcodeModal && <Postcode />}
    </Card>
  );
};

export default RequestForm;
