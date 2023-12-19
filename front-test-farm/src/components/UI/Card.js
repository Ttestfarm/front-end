import React from 'react';
import style from './Card.module.css';

const Card = (props) => {
  const { width, height } = props;

  const cardStyle = {
    width: width,
    height: height,
  };
  return (
    <div
      className={style.card}
      style={cardStyle}
    >
      {props.children}
    </div>
  );
};

export default Card;
