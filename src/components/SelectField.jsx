import React from 'react';

const SelectField = ({ label, name, options, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? 'input-error' : ''}
      >
        <option value="">-- Select Option --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="error-msg">{error}</span>}
    </div>
  );
};

export default SelectField;
