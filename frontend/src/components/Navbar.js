import { Moon, Sun, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const Navbar = ({ toggleTheme, theme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = location.pathname;

  const routes = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/notes", label: "Notes" },
  ];

  useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
          }
        });
        const data = await res.json();
        if (data.name) setUserName(data.name);
        else setUserName(null);
      } catch (error) {
        console.error("Failed to fetch user");
        setUserName(null);
      }
    } else {
      setUserName(null);
    }
  };

  fetchUser();
}, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserName(null);
    navigate("/auth");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-cyan-500 to-blue-900 dark:from-gray-800 dark:to-black-800 text-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-extrabold tracking-wide">SecretSpace</h1>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex gap-6 items-center">
          {routes.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`transition-colors hover:text-purple-300 ${
                currentPath === path ? "text-yellow-400 font-semibold" : ""
              }`}
            >
              {label}
            </Link>
          ))}

          {userName ? (
            <div className="flex items-center gap-2">
              <div className="bg-blue-500 w-9 h-9 flex items-center justify-center rounded-full font-bold text-white text-lg uppercase">
                {userName[0]}
              </div>
              <i
                className="fa-solid fa-right-from-bracket text-white text-lg hover:text-purple-300 cursor-pointer"
                onClick={handleLogout}
                title="Logout"
              ></i>
            </div>
          ) : (
            <Link
              to="/auth"
              className={`transition-colors hover:text-purple-300 ${
                currentPath === "/auth" ? "text-yellow-400 font-semibold" : ""
              }`}
            >
              Login / Signup
            </Link>
          )}

          <button
            onClick={toggleTheme}
            className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-md"
          >
            {theme === "dark" ? (
              <Sun className="text-yellow-400" />
            ) : (
              <Moon className="text-purple-800" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-sm">
          {routes.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={`block transition hover:text-purple-300 ${
                currentPath === path ? "text-yellow-400 font-semibold" : ""
              }`}
            >
              {label}
            </Link>
          ))}

          {userName ? (
            <div className="mt-2 flex items-center gap-2">
              <div className="bg-blue-500 w-8 h-8 flex items-center justify-center rounded-full font-bold text-white text-sm uppercase">
                {userName[0]}
              </div>
              <i
                className="fa-solid fa-right-from-bracket text-white text-lg hover:text-purple-300 cursor-pointer"
                onClick={handleLogout}
                title="Logout"
              ></i>
            </div>
          ) : (
            <Link
              to="/auth"
              onClick={() => setMenuOpen(false)}
              className={`transition hover:text-purple-300 ${
                currentPath === "/auth" ? "text-yellow-400 font-semibold" : ""
              }`}
            >
              Login / Signup
            </Link>
          )}

          <button
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
            className="mt-2 p-2 w-10 bg-white dark:bg-gray-700 rounded-full shadow-md"
          >
            {theme === "dark" ? (
              <Sun className="text-yellow-400" />
            ) : (
              <Moon className="text-purple-800" />
            )}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
