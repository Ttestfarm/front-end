// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import backBtn from '../../assets/back_btn.png';
// import star from '../../assets/star.png';
// import heart from '../../assets/heart.png';

// import style from './FarmerDetailCard.module.css';
// import { useRecoilValue } from 'recoil';
// import { userInfoAtom } from '../../recoil/Atoms';

// const FarmerDetailCard = ({}) => {
//   const userInfo = useRecoilValue(userInfoAtom);
//   const navigate = useNavigate();
//   // farmname, farmaddress, farmername, imageUrl

//   const {
//     farmname,
//     farmaddress,
//     farmername,
//     imageUrl,
//     starRating,
//     starCount,
//     heartCount,
//   } = exampleData;

//   return (
//     <div className={style.farmerdetailcard}>
//       <section className={style.btnSection}>
//         <button className={style.farmEdit}>
//           <Link to={`/farmer/modify-farm/${userInfo.farmerId}`}>
//             팜 정보 수정
//           </Link>
//         </button>
//         <button onClick={() => navigate(-1)}>
//           <img
//             src={backBtn}
//             alt="go to back btn"
//           />
//         </button>
//       </section>
//       <section className={style.leftSection}>
//         <div className={style.imageContainer}>
//           <img
//             src={farmer.farmPixUrl}
//             alt="farmer"
//           />
//         </div>
//         <div className={style.info}>
//           <div className={style.ratingInfo}>
//             <img
//               src={star}
//               alt="Star"
//             />
//             <span>{starRating}</span> (<span>{starCount}</span>)
//           </div>
//           &nbsp;
//           <div className={style.heartinfo}>
//             <img
//               src={heart}
//               alt="Heart"
//             />
//             <span>{heartCount}</span>
//           </div>
//         </div>
//       </section>
//       <div className={style.flexContainer}>
//         <div className={style.farmDetails}>
//           <div className={style.farmNames}>
//             {' '}
//             <span className={style.farmName}>농장 이름</span>
//             <span className={style.farmNameData}>{farmname}</span>
//           </div>
//           <br />
//           <div className={style.farmerNames}>
//             <span className={style.farmerName}>농부 이름</span>
//             <span className={style.farmerNameData}>{farmername}</span>
//           </div>
//           <br />
//           <div className={style.farmsAddress}>
//             <span className={style.farmAddress}>농장 주소</span>
//             <span className={style.farmAddressData}>{farmaddress}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default FarmerDetailCard;
