import React from 'react';

import style from './RegistSection.module.css';

const RegistSection = (props) => {
  return (
    <section className={style.section}>
      <h3>{props.title}</h3>
      {props.children}
    </section>
  );
};

export default RegistSection;
