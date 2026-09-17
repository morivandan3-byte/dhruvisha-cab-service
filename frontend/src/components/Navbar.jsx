import { Menu, X, ShieldCheck, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Trip Routes", href: "#trip-routes" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#050505]/90">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <a
          href="#home"
          onClick={closeMenu}
          className="text-xl font-bold tracking-wide text-gray-900 dark:text-white"
        >
          DHRUVISHA
          <span className="ml-1 text-yellow-500">CAB</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="text-sm font-medium text-gray-700 transition hover:text-yellow-500 dark:text-white/85 dark:hover:text-yellow-400"
            >
              {link.name}
            </a>
          ))}

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-yellow-400 hover:text-yellow-500 dark:border-white/10 dark:text-gray-300 dark:hover:border-yellow-400 dark:hover:text-yellow-400"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Bill Generate */}
          <a
            href="#bill"
            onClick={closeMenu}
            className="rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-yellow-300"
          >
            Bill Generate
          </a>

          {/* Admin Login */}
          <Link
            to="/admin/login"
            onClick={closeMenu}
            className="flex items-center gap-2 rounded-full border border-yellow-400/40 px-5 py-2.5 text-sm font-semibold text-yellow-500 transition hover:bg-yellow-400/10 dark:text-yellow-400"
          >
            <ShieldCheck size={16} />
            Admin Login
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 dark:border-white/10 dark:text-gray-300"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={27} /> : <Menu size={27} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white dark:border-white/10 dark:bg-[#0a0a0a] md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-4 sm:px-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="border-b border-gray-200 py-4 text-sm font-medium text-gray-700 hover:text-yellow-500 dark:border-white/10 dark:text-white/85 dark:hover:text-yellow-400"
              >
                {link.name}
              </a>
            ))}

            <a
              href="#bill"
              onClick={closeMenu}
              className="mt-5 rounded-full bg-yellow-400 px-5 py-3 text-center text-sm font-semibold text-black"
            >
              Bill Generate
            </a>

            <Link
              to="/admin/login"
              onClick={closeMenu}
              className="mt-3 flex items-center justify-center gap-2 rounded-full border border-yellow-400/40 px-5 py-3 text-sm font-semibold text-yellow-500 dark:text-yellow-400"
            >
              <ShieldCheck size={17} />
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;