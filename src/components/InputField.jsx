const InputField = ({
  type,
  value,
  name,
  onChange,
  max,
  min,
  className,
  placeholder,
}) => {
  return (
    <input
      type={type}
      name={name}
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
