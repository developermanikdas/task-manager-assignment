export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-extrabold text-slate-800">
            🚀 Task Manager
          </h1>

          <p className="text-slate-500 mt-2">
            {subtitle}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            {title}
          </h2>

          {children}

        </div>

      </div>

    </div>
  );
}