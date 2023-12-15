import React from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import style from './PostCode.module.css';
import {
  isPostcodeModalAtom,
  postcodeAddressAtom,
  zonecodeAtom,
} from '../recoil/Atoms';
import { useRecoilState } from 'recoil';
import ModalContainer from './../components/UI/Modal';

const Postcode = () => {
  const [, setPostcodeAddress] = useRecoilState(postcodeAddressAtom);
  const [, setIsPostcodeModal] = useRecoilState(isPostcodeModalAtom);
  const [, setZonecode] = useRecoilState(zonecodeAtom);

  const handleComplete = (data) => {
    let address1 = data.zonecode;
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
      console.log(extraAddress);
      console.log(fullAddress);
      console.log(address1);
    }

    setZonecode(address1);
    setPostcodeAddress(fullAddress);
    setIsPostcodeModal(false);
  };

  const onClickCloseModal = () => {
    setIsPostcodeModal(false);
  };

  return (
    <ModalContainer>
      <DaumPostcodeEmbed onComplete={handleComplete} />
      <div>
        <button onClick={onClickCloseModal}>닫기</button>
      </div>
    </ModalContainer>
  );
};

export default Postcode;
