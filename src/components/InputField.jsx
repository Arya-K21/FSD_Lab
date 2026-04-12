import React from 'react';

const InputField = ({ label, name, type = 'text', value, onChange, error, placeholder }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          className={error ? 'input-error' : ''}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={error ? 'input-error' : ''}
        />
      )}
      {error && <span className="error-msg">{error}</span>}
    </div>
  );
};

export default InputField;
