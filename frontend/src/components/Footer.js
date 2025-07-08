import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-indigo-800 dark:from-gray-800 dark:to-black-800 text-white py-6 shadow-inner mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm">&copy; {new Date().getFullYear()} SecretSpace. All rights reserved.</p>
          <p className="text-sm">
            Made with ❤️ by <span className="font-semibold">Yashvardhan Ahuja</span>
          </p>
        </div>
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-yellow-400 transition-colors text-sm">
            Home
          </Link>
          <Link to="/about" className="hover:text-yellow-400 transition-colors text-sm">
            About
          </Link>
          <Link to="/notes" className="hover:text-yellow-400 transition-colors text-sm">
            Notes
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;