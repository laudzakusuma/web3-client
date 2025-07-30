import React from 'react';

const FormField = ({ labelName, placeholder, inputType, isTextArea, value, handleChange }) => {
  const commonInputStyles = {
    backgroundColor: 'transparent',
    fontFamily: 'Epilogue, sans-serif',
    fontSize: '14px',
    color: 'white',
    padding: '15px 20px',
    width: '100%',
    borderRadius: '10px',
    outline: 'none',
    border: '1px solid #3a3a43',
  };

  return (
    <label style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {labelName && (
        <span style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: '500', fontSize: '14px', color: '#808191', marginBottom: '10px' }}>
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          style={commonInputStyles}
        />
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          style={commonInputStyles}
        />
      )}
    </label>
  );
};

export default FormField;