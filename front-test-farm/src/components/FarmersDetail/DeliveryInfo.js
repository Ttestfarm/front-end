import React from "react";
import style from "./DeliveryInfo.module.css";

const DeliveryInfo = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 입력된 정보를 처리할 수 있습니다.
  };

  return (
    <div>
      <h2>배송지 입력</h2>
      <div className={style.container}>
        <form onSubmit={handleSubmit}>
          <div className={style.row}>
            <div className={style["col-25"]}>
              <label htmlFor="name">이름</label>
            </div>
            <div className={style["col-75"]}>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="수령인의 이름을 입력하세요"
                required
              />
            </div>
          </div>
          <div className={style.row}>
            <div className={style["col-25"]}>
              <label htmlFor="address">배송지</label>
            </div>
            <div className={style["col-75"]}>
              <textarea
                id="address"
                name="address"
                placeholder="배송지를 입력하세요"
                style={{ height: "100px" }}
                required
              ></textarea>
            </div>
          </div>
          <div className={style.row}>
            <div className={style["col-25"]}>
              <label htmlFor="phoneNumber">전화번호</label>
            </div>
            <div className={style["col-75"]}>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="전화번호를 입력하세요.."
                required
              />
            </div>
          </div>
          <div className={style.row}>
            <button className={style.reg}>입력 완료</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryInfo;
