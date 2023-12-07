import React from 'react';

import style from './UserInput.module.css';

const UserInput = ({
  id,
  type,
  text,
  value,
  onChange,
  onBlur,
  children,
  className,
  readOnly,
}) => {
  return (
    <React.Fragment>
      <label htmlFor={id}>{text}</label>
      {/* <div className={className}>
          {children} */}
      <input
        className={className}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
      />
      {/* </div> */}
    </React.Fragment>
  );
};

UserInput.defaultProps = {
  readOnly: false,
};

export default UserInput;
