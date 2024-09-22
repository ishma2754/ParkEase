const InputField = ({ type, value, onChange, max, min, className, placeholder}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      max={max}
      min={min}
      className={className}
      placeholder={placeholder}
    ></input>
  );
};

export default InputField;
