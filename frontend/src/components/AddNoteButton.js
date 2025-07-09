import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const AddNoteButton = () => {
  const location = useLocation();
  const handleClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <div className="flex justify-left mt-3">
      <Link
        to="/"
        onClick={handleClick}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow-lg transition duration-300"
      >
        + Add Note
      </Link>
    </div>
  );
};

export default AddNoteButton;