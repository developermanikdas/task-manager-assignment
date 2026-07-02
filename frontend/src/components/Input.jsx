export default function Input({
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) {
  return (
    <div className="relative">

      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        {icon}
      </span>

      <input
        className="
w-full
rounded-xl
border
border-slate-300
bg-slate-50
py-3
pl-12
pr-4
text-slate-800
placeholder:text-slate-400
focus:border-blue-500
focus:ring-4
focus:ring-blue-100
transition
"
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />

    </div>
  );
}