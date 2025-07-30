import React from 'react';

const CustomButton = ({ btnType, title, handleClick, styles }) => {
  const buttonStyle = {
    fontFamily: 'Epilogue, sans-serif',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '26px',
    color: 'white',
    minHeight: '52px',
    padding: '10px 20px',
    borderRadius: '10px',
    cursor: 'pointer',
    ...styles, // Gabungkan dengan style tambahan jika ada
  };

  return (
    <button
      type={btnType}
      style={buttonStyle}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton;