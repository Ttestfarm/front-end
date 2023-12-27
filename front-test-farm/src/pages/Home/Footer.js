import React from 'react';

import classes from './Footer.module.css';
const Footer = () => {
  return (
    <footer className={classes.footer}>
      <h4>Unpretty Farm</h4>
      <div className={classes['footer-customCenter']}>
        언프리티팜 고객센터&nbsp;
        <span>010.3408.1004</span>
        <p>월 ~ 금요일 09:30 ~ 18:00 (주말, 공휴일은 전화상담 불가능)</p>
      </div>
      <div className={classes['footer-mallInfo']}>
        상호명: UNPRETTY FARM&nbsp; | &nbsp; 이메일: unpretty@email.com&nbsp; |
        &nbsp; 사업자등록번호: 123-12-12345 &nbsp; | &nbsp;통신판매업신고번호
        제2023-코스타-07269
      </div>

      <div className={classes['footer-mallInfo']}>
        UNPRETTY FARM은 개별 판매자가 상품을 판매하는 오픈마켓이며
        통신판매중개자로 거래 당사자가 아니므로,
        <br />
        판매자가 등록한 상품정보 및 거래 등에 대해 일체 책임을 지지않습니다.
        <br />
        단, UNPRETTY FARM이 판매자로 등록 판매한 상품의 경우는 판매자로서 책임을
        부담합니다.
      </div>

      <div className={classes['footer-copy']}>
        &copy; 2023.12.29. 안제하. 김시유. 김지수. 김희찬. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
