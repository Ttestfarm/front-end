import React from "react";
import Postcode from "../../api/PostCode";
import style from "./DeliveryInfo.module.css";
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
        <div className={style.modal}>
          <div className={style.modalcontent}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <div className={style["row"]}>
                <div className={style["col-25"]}>
                  <label htmlFor="name">수령인 이름</label>
                </div>
                <div className={style["col-75"]}>
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

              <div className={style["row"]}>
                <div className={style["col-25"]}>
                  <label htmlFor="tel">수령인 전화번호</label>
                </div>
                <div className={style["col-75"]}>
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

              <div className={style["row"]}>
                <div className={style["col-25"]}>
                  <label htmlFor="address">배송지</label>
                </div>
                <div className={style["col-75"]}>
                  <input
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
              <div className={style["row"]}>
                <div className={style["col-25"]}>
                  <label htmlFor="quantity">수량</label>
                </div>
                <div className={style["col-75"]}>
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

              <button type="submit" className={style.submit}>
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
