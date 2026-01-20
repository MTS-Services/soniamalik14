const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const base =
    "px-5 py-2 text-sm font-medium transition";

  const styles = {
    primary: "bg-btn-primary text-white",
    secondary: "bg-btn-secondary text-white",
    outline: "border-transparent text-[#1C1C1C]",
  };

  return (
    <button
      className={`${base} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
