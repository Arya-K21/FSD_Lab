import React from 'react';

const RadioGroup = ({ label, name, options, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="radio-group">
        {options.map((opt) => (
          <label key={opt.value} className="radio-label">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
      {error && <span className="error-msg">{error}</span>}
    </div>
  );
};

export default RadioGroup;
