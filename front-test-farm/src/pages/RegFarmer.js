// 상태관리 & 수정필요사항
// - 입력여부 상태관리 -> 하단 메시지
// - 사진 업로드 input 정렬 & 디자인
// - 사진 업로드 시 image view
// - 계좌번호 select - 컴포넌트 list로?
// - 관심품목설정 notice부분 html 구조 변경? / 텍스트 부분 색 변경

import React, { Fragment } from "react";

import style from '../components/Layout/styles/RegFarmer.module.css';
import picDefault from '../assets/pic-default.png';

const RegFarmerPage = () => {
  return (
    <Fragment>
      <div className={style.wrap}>
        <div className={style["wrap-center"]}>

          <div className={style.title}>
            <div>파머 신청</div>
          </div>

          <div className={style["farm-name"]}>
            <label for="farm-name">팜 이름</label> 
            <input id="farm-name" placeholder={"팜 이름을 입력해 주세요."} />
          </div>

          <div className={style["farmer-name"]}>
            <label for="farmer-name">파머 이름</label> 
            <input id="farmer-name" placeholder={"파머 이름을 입력해 주세요."} />
          </div>

          <div className={style.pixurl}>
            <label for="pixurl">팜 대표 사진</label>
            <div className={style["pixurl-upload"]}>
              <input type="file" id="pixurl" />
            </div>
            <div className={style["pixurl-view"]}>
              <img src={picDefault} alt="picture-default" />
            </div>
          </div>

          <div className={style["farm-tel"]}>
            <label for="farm-tel">팜 전화번호</label> 
            <input id="farm-tel" placeholder={"팜 전화번호를 입력해 주세요."} />
          </div>

          <div className={style["farm-address"]}>
            <label for="farm-address">팜 주소</label>
            <div className={style["farm-address-code"]}>
              <input type="text" id="farm-address-code" placeholder={"우편번호"} />
              <button id="find-address-code" className={style["certify-btn"]}>우편번호 찾기</button>
            </div>
            <input type="text" id="farm-address-road" placeholder={"도로명 주소"} />
            <input type="text" id="farm-address-detail" placeholder={"상세 주소를 입력해 주세요."} />
          </div>

          <div className={style["registration-num"]}>
            <div className={style.certify}>
              <label for="tel">사업자 등록번호</label>
              <button id="tel-certify-req" className={style["certify-btn"]}>확인</button>
            </div>
            <input type="text" id="tel" placeholder={"사업자 등록번호를 입력해 주세요."} />
            <div className={style.msg}>✓ 확인되었습니다.</div>
          </div>

          <div className={style["farm-accountno"]}>
            <label for="farm-accountno">계좌번호</label> 
            <select id="bank-select" value={"은행을 선택하세요."} />
            <input type="text" id="farm-accountno" placeholder={"계좌번호를 입력해 주세요."} />
          </div>

          <div className={style["farm-interest"]}>
            <label for="farm-interest">관심 품목 설정</label> 
            <input type="text" id="farm-interest" placeholder={"예) #토마토 #바나나 #사과"} />
            <div className={style.notice}>
                <span>- 관심 품목으로 설정하면 해당 품목 매칭 요청서에 견적을 보낼</span>
                <span>&nbsp;&nbsp; 수 있습니다.</span>
                <span>- 판매 가능하신 품목 위주로 설정해주세요.</span>
                <span>- #품목 키워드 형식으로 작성해주세요.</span>
            </div>
          </div>

          <button id="reg" className={style["reg-btn"]}>파머신청 완료</button>

        </div>
      </div>
    </Fragment>
  );
};

export default RegFarmerPage;
