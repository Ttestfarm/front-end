import React from "react";

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
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">수령인 이름</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="tel">수령인 전화번호</label>
                <input
                  type="tel"
                  id="tel"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="address">수령 주소</label>
                <textarea
                  id="address"
                  style={{ height: "100px" }}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="quantity">수량</label>
                <input
                  type="number"
                  id="quantity"
                  style={{ height: "100px" }}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                ></input>
              </div>

              <button type="submit">결제하기</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DeliveryInfo;
