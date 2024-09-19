

const SearchInput = ({name, value, onChange}) => {
  return (
    <input
    type="text"
    name={name}
    value={value}
    onChange={onChange}
    placeholder="Search..."
    className="p-1  border border-gray-300 w-full rounded-lg text-black"
    />
  )
}

export default SearchInput