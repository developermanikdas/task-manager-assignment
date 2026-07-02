export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div
        className="
          bg-white
          rounded-xl
          shadow-xl
          w-full
          max-w-lg
          p-6
          relative
        "
      >
        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              text-gray-500
              hover:text-red-500
              text-2xl
            "
          >
            ×
          </button>

        </div>

        {children}

      </div>
    </div>
  );
}