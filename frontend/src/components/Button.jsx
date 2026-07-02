export default function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
  className = "",
}) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",

    success: "bg-green-600 hover:bg-green-700 text-white",

    danger: "bg-red-600 hover:bg-red-700 text-white",

    secondary: "bg-slate-200 hover:bg-slate-300 text-slate-800",
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
text-white
bg-gradient-to-r
from-blue-600
to-indigo-600
hover:from-blue-700
hover:to-indigo-700
transition-all
duration-300
shadow-lg
hover:shadow-xl
hover:-translate-y-0.5
${className}
`}
    >
      {children}
    </button>
  );
}
