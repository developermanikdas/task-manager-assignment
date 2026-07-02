export default function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
  className = "",
}) {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white",

    success:
      "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white",

    danger:
      "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white",

    secondary:
      "bg-gradient-to-r from-slate-300 to-slate-400 hover:from-slate-400 hover:to-slate-500 text-slate-900",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        w-full
        py-3
        rounded-xl
        font-semibold
        transition-all
        duration-300
        shadow-lg
        hover:shadow-xl
        hover:-translate-y-0.5
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}