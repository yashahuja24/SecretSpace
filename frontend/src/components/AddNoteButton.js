import { Link } from "react-router-dom";
const AddNoteButton = () => {
  return (
    <div className="flex justify-left mt-3">
      <Link
        to="/#add-note"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow-lg transition duration-300"
      >
        + Add Note
      </Link>
    </div>
  );
};
export default AddNoteButton;
