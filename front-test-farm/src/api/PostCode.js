import React from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import style from './PostCode.module.css';
import { isPostcodeModalAtom, postcodeAddressAtom } from '../recoil/Atoms';
import { useRecoilState } from 'recoil';
import ModalContainer from './../components/UI/Modal';

const Postcode = () => {
  const [, setPostcodeAddress] = useRecoilState(postcodeAddressAtom);
  const [, setIsPostcodeModal] = useRecoilState(isPostcodeModalAtom);

  const handleComplete = (data) => {
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
    }

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
