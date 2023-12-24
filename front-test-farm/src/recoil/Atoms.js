import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const tokenAtom = atom({
  key: 'token',
  default: '',
  effects_UNSTABLE: [persistAtom],
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
});

// export const updateAtom = atom({
//   key: 'update',
//   default: 0,
// });

export const isPostcodeModalAtom = atom({
  key: 'isPostcodeModal',
  default: false,
});

export const postcodeAddressAtom = atom({
  key: 'address2',
  default: '',
});

export const zonecodeAtom = atom({
  key: 'address1',
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
