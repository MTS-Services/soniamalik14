
const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {


  const base =
    "inline-flex items-center lg:px-4 py-2 px-3 lg:py-2 justify-center font-medium transition focus:outline-none";

  // Color / variant styles
  const variants = {
    primary: "bg-btn-primary text-white hover:opacity-90",
    secondary: "bg-btn-secondary text-white hover:opacity-90",
    outline:
      " text-[#1C1C1C] bg-gray-100",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
