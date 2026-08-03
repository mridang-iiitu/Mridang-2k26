import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Events", path: "/events" },
    { name: "Schedule", path: "/schedule" },
    { name: "Gallery", path: "/gallery" },
    { name: "Sponsors", path: "/sponsors" },
    { name: "Team", path: "/team" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-950 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-xl font-bold">
            M
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-wide">
              MRIDANG
            </h1>
            <p className="text-xs text-gray-400">
              Cultural Fest
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-100 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `transition duration-300 ${
                  isActive
                    ? "text-red-500 font-semibold"
                    : "text-gray-300 hover:text-red-400"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <button className="rounded-lg bg-red-600 px-5 py-2 font-medium transition hover:bg-red-700">
            Register
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="space-y-4 border-t border-slate-800 bg-slate-900 px-6 py-5 md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block ${
                  isActive
                    ? "text-red-500 font-semibold"
                    : "text-gray-300"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <button className="mt-3 w-full rounded-lg bg-red-600 py-2 font-semibold hover:bg-red-700">
            Register
          </button>
        </div>
      )}
    </nav>
  );
}