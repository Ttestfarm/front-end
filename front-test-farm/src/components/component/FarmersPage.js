import React from 'react';
import Farmersidebar from './Farmersidebar';
import './Farmerspage.css';

const FarmersPage = () => {
    return (
        <div>
            <Farmersidebar/>
            <div>
                <div style={{border:'3px solid black'}}>
                    파머님이 판매가능한 품목 중 매칭을 기다리는 요청이 있어요!
                </div>
                <div style={{borderRadius: '24px', border: '3px solid #75786C'}}>
                    <div>
                        명수사랑 님 <br/>
                        요청서 번호 : 1213123 <br/>
                        요청한 품목 : 멋쟁이 토마토 <br/>
                        요청한 수량 혹은 kg : 3kg <br/>
                        배송지 : 서울 은평구 땡떙동 <br/>
                    </div>
                    <div>
                        <input type='button' value='견적 보내기'/> <br/>
                        <input type='button' value='취소'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FarmersPage;