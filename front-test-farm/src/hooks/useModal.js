import { useSetRecoilState } from 'recoil';
import { isErrorModalAtom, isSuccessModalAtom } from '../recoil/Atoms';

export const useErrorModal = () => {
  const setIsErrorModal = useSetRecoilState(isErrorModalAtom);

  const setErrorModal = (value, message) => {
    setIsErrorModal({
      status: value,
      message: message,
    });
  };

  return setErrorModal;
};

export const useSuccessModal = () => {
  const setIsSuccessModal = useSetRecoilState(isSuccessModalAtom);

  const setSuccessModal = (value, message) => {
    setIsSuccessModal({
      status: value,
      message: message,
    });
  };

  return setSuccessModal;
};
