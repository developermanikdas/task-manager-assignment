import { motion } from "framer-motion";
import { FaTasks, FaCheckCircle } from "react-icons/fa";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left Side */}
      <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 px-20 text-white">

        <div className="max-w-lg">

          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
              <FaTasks className="text-3xl" />
            </div>

            <h1 className="text-6xl font-extrabold tracking-tight">
              Task Manager
            </h1>
          </div>

          <p className="mb-10 text-xl leading-relaxed text-blue-100">
            A simple and secure way to manage your daily tasks.
          </p>

          <div className="space-y-5">

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-400" />
              <span>JWT Authentication</span>
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-400" />
              <span>Secure REST API</span>
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-400" />
              <span>MongoDB Atlas</span>
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-400" />
              <span>React + Tailwind CSS</span>
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-400" />
              <span>Responsive Design</span>
            </div>

          </div>

        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center bg-slate-50 px-6">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-10"
        >

          <h2 className="text-4xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-2 mb-8 text-slate-500">
            {subtitle}
          </p>

          {children}

        </motion.div>

      </div>

    </div>
  );
}