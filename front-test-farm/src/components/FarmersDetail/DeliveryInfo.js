import React from 'react';
import Postcode from '../../api/PostCode';
import style from './DeliveryInfo.module.css';
import ModalContainer from '../UI/Modal';
import CloseIcon from '@mui/icons-material/Close';
const DeliveryInfo = ({
  isOpen,
  onClose,
  onSubmit,
  name,
  tel,
  address1,
  address2,
  address3,
  quantity,
  setName,
  setTel,
  setAddress1,
  setAddress2,
  setAddress3,
  setQuantity,
}) => {
  const closeModal = () => {
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  //주소찾기 모달 열기
  const onClicktoggleAddressModal = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      {isOpen && (
        <ModalContainer>
          <div className={style.box}>
            <span
              className={style.closeBtn}
              onClick={closeModal}
            >
              <CloseIcon className={style.closeIcon} />
            </span>
            <form onSubmit={handleSubmit}>
              <div className={style['row']}>
                <div className={style['col-25']}>
                  <label htmlFor="name">수령인 이름</label>
                </div>
                <div className={style['col-75']}>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={style.name}
                  />
                </div>
              </div>

              <div className={style['row']}>
                <div className={style['col-25']}>
                  <label htmlFor="tel">수령인 연락처</label>
                </div>
                <div className={style['col-75']}>
                  <input
                    type="tel"
                    id="tel"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    required
                    className={style.name}
                  />
                </div>
              </div>

              <div className={style['row']}>
                <div className={style['col-25']}>
                  <label htmlFor="address">배송지</label>
                </div>
                <div className={style['col-75']}>
                  <input
                    hidden
                    id="address1"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    required
                    className={style.name}
                    onClick={onClicktoggleAddressModal}
                  ></input>
                  <input
                    id="address2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    required
                    className={style.name}
                  ></input>

                  <input
                    id="address3"
                    value={address3}
                    onChange={(e) => setAddress3(e.target.value)}
                    required
                    className={style.name}
                  ></input>
                </div>
              </div>
              <div className={style['row']}>
                <div className={style['col-25']}>
                  <label htmlFor="quantity">수량</label>
                </div>
                <div className={style['col-75']}>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    className={style.name}
                  ></input>
                </div>
              </div>

              <div className={style.footer}>
                <button
                  type="submit"
                  className={style.submit}
                >
                  결제하기
                </button>
              </div>
            </form>
          </div>
        </ModalContainer>
      )}
    </>
  );
};

export default DeliveryInfo;
