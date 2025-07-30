import React from 'react';

const FormField = ({ labelName, placeholder, inputType, isTextArea, value, handleChange }) => {
  return (
    <label className="form-field">
      {labelName && (
        <span className="form-field-label">{labelName}</span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="form-field-input"
        />
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.01"
          placeholder={placeholder}
          className="form-field-input"
        />
      )}
    </label>
  );
};

export default FormField;
