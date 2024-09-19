const SelectInput = ({ name, value, options, onChange }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full  p-1 border border-gray-300 rounded-lg focus:outline-none"
    >
      <option value="">Select {name}</option>
      {options.map((option) => (
        <option key={option.name} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
