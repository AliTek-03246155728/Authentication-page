import React from 'react';

const FormInput = ({ label, type, value, onChange, required = true }) => {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}> {label}  </label>
      <input type={type}   value={value}  onChange={onChange}  required={required}  style={{  width: '100%',  padding: '10px',  borderRadius: '4px',  border: '1px solid #ccc',   boxSizing: 'border-box' }}  />
    </div>
  );
};

export default FormInput;