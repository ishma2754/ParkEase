const Button = ({
  onClick,
  type = "button",
  className,
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-2 px-4 rounded-lg font-bold bg-blue-600 border  text-gray-200 transition duration-200 ease-in-out hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
