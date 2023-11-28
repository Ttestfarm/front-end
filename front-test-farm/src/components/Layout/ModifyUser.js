// 상태관리 & 수정필요사항
// - 닉네임 중복체크 추가?
// - 핸드폰번호 인증번호 입력창 disabled 였다가 요청버튼 누르면 활성화

import React, { Fragment } from "react";

import styles from "./styles/ModifyUser.module.css";

const ModifyUser = () => {
  return (
    <Fragment>
      <div className={styles.wrap}>
        <div className={styles["wrap-center"]}>

          <div className={styles.title}>
            <div>내 정보 관리</div>
          </div>

          <div className={styles.name}>
            <label for="name">이름</label> 
            <input id="name" placeholder={"이름을 입력해 주세요."} value={"박명수"} />
          </div>

          <div className={styles.email}>
            <label for="email">이메일</label>
            <input type="text" id="email" value={"myungsoo@naver.com"} disabled />
          </div>

          <div className={styles.password}>
            <label for="password">비밀번호</label> 
            <input type="password" id="password" placeholder={"비밀번호를 입력해 주세요."} />
            <input type="password" id="password2" placeholder={"비밀번호를 한 번 더 입력해 주세요."} />
          </div>

          <div className={styles.address}>
            <label for="address">주소</label>
            <div className={styles["address-code"]}>
              <input type="text" id="address-code" placeholder={"우편번호"} value={"12345"} />
              <button id="find-address-code" className={styles["certify-btn"]}>우편번호 찾기</button>
            </div>
            <input type="text" id="address-road" placeholder={"도로명 주소"} value={"경기 이천시 명수로 12"} />
            <input type="text" id="address-detail" placeholder={"상세 주소를 입력해 주세요."} value={"345번지"} />
            <div className={styles["address-default"]}>
              <input type="checkbox" id="address-default" checked />
              <div>기본 배송지로 설정하기</div>
            </div>
          </div>

          <div className={styles.nickname}>
            <label for="nickname">닉네임</label> 
            <input type="text" id="nickname" placeholder={"닉네임을 입력해 주세요."} value={"깨스활명수"} />
          </div>

          <div className={styles.tel}>
            <div className={styles.certify}>
              <label for="tel">핸드폰 번호</label>
              <button id="tel-certify-req" className={styles["certify-btn"]}>인증번호 요청</button>
            </div>
            <input type="text" id="tel" placeholder={"핸드폰 번호를 입력해 주세요."} value={"010-1111-2345"} />
            <input type="text" id="tel-cert-num" placeholder={"인증번호를 입력해 주세요."} disabled />
          </div>

          <div className={styles.btns}>
            <button id="modify" className={styles["modify-btn"]}>수정 완료</button>
            <button id="cancel" className={styles["cancel-btn"]}>취소</button>
          </div>

        </div>
      </div>
    </Fragment>
  );
};

export default ModifyUser;
