import { Button } from '@mui/material';
import React from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import styled from 'styled-components';
import { isPostcodeModalState, postcodeAddressState } from '../../stores';
import { useRecoilState } from 'recoil';

const Postcode = () => {
  const [, setPostcodeAddress] = useRecoilState(postcodeAddressState);
  const [, setIsPostcodeModal] = useRecoilState(isPostcodeModalState);

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
    }

    setPostcodeAddress(fullAddress);
    setIsPostcodeModal(false);
  };

  const onClickCloseModal = () => {
    setIsPostcodeModal(false);
  };

  return (
    <Wrap>
      <PostContainer>
        <DaumPostcodeEmbed onComplete={handleComplete} />
        <div>
          <Button
            variant="contained"
            color="success"
            onClick={onClickCloseModal}
          >
            닫기
          </Button>
        </div>
      </PostContainer>
    </Wrap>
  );
};

export default Postcode;

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`;

const PostContainer = styled.div`
  width: 600px;
  padding: 3rem;
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  div {
    display: flex;
    justify-content: flex-end;
  }
  button {
    margin-top: 2rem;
  }
`;
