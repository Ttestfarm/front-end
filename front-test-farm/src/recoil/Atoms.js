import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const tokenAtom = atom({
  key: 'token',
  default: '',
});

export const isLoginAtom = atom({
  key: 'isLogin',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userInfoAtom = atom({
  key: 'userInfo',
  default: null,
  effects_UNSTABLE: [persistAtom],
  dangerouslyAllowMutability: true, //firebase auth 사용했을 때 로그아웃해도 recoil 상태가 안변했는데 이거 했더니 되었음
});

export const updateAtom = atom({
  key: 'update',
  default: 0,
});

export const isPostcodeModalAtom = atom({
  key: 'isPostcodeModal',
  default: false,
});

export const postcodeAddressAtom = atom({
  key: 'postcodeAddress',
  default: '',
});

export const isSuccessModalAtom = atom({
  key: 'isSuccessModal',
  default: {
    state: false,
    message: '',
  },
});

export const isErrorModalAtom = atom({
  key: 'isErrorModal',
  default: {
    state: false,
    message: '',
  },
});

// export const isModalAtom = atom({
//   key: 'isModal',
//   default: {
//     state: false,
//     message: '',
//   },
// });
// export const isLoginSelector = selector({
//   key: 'isLogin',
//   get: ({ get }) => !!get(tokenAtom),
// });
