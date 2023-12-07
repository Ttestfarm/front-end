import React from 'react';

const FarmerCardButton = ({ text, onClick }) => {
  return (
    <button
      style={{
        display: 'inline-block',
        backgroundColor: '#2B331D',
        color: '#FFFFFF',
        border: 'none',
        height: '30px',
        width: '90px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: 'bold',
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
export default FarmerCardButton;
