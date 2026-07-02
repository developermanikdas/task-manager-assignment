import Button from "./Button";

export default function Navbar({ user, onLogout, onCreate }) {
  return (
    <header className="bg-white shadow-2xs">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Task Manager</h1>

          <p className="text-slate-500">Welcome back, {user?.name}</p>
        </div>

        <div className="flex gap-3">
          <Button className="px-4" variant="danger"  onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
