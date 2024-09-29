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
      className={`py-2 px-4 rounded-lg font-bold bg-black-gradient border border-gray-100 text-gray-100 transition duration-200 ease-in-out hover:bg-hover  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
