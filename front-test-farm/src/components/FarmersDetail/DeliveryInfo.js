import React from 'react';
import style from './DeliveryInfo.module.css';
const DeliveryInfo = ({
  isOpen,
  onClose,
  onSubmit,
  name,
  tel,
  address,
  quantity,
  setName,
  setTel,
  setAddress,
  setQuantity,
}) => {
  const closeModal = () => {
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <>
      {isOpen && (
        <div className={style.modal}>
          <div className={style.modalcontent}>
            <span
              className="close"
              onClick={closeModal}
            >
              &times;
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
                  <label htmlFor="tel">수령인 전화번호</label>
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
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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

              <button
                type="submit"
                className={style.submit}
              >
                결제하기
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DeliveryInfo;
