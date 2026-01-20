
const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {


  const base =
    "inline-flex items-center justify-center font-medium transition focus:outline-none";

  // Size styles (ONLY spacing + text)
  const sizes = {
    xs: "px-3 py-1",
    sm: "px-4 py-1.5",
    lg: "px-5 py-2",
  };

  // Color / variant styles
  const variants = {
    primary: "bg-btn-primary text-white hover:opacity-90",
    secondary: "bg-btn-secondary text-white hover:opacity-90",
    outline:
      " text-[#1C1C1C] bg-gray-100",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
