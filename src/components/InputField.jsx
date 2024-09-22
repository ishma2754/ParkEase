const InputField = ({ type, value, onChange, max, min, className}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      max={max}
      min={min}
      className={className}
    ></input>
  );
};

export default InputField;
