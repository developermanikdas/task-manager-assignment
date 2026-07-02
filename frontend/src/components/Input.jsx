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
          border
          rounded-xl
          py-3
          pl-12
          pr-4
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
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