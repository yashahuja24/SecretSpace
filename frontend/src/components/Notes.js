import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import noteContext from "../context/notes/noteContext";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Noteitem from "./Noteitem";
const Notes = () => {
  const {notes,getNotes} = useContext(noteContext);
  useEffect(()=>{
    getNotes();
    // eslint-disable-next-line
  },[]);
  return (
    <>
      <div className="mt-8 mb-9 px-4 max-w-3xl mx-auto text-left space-y-4">
          <h1 className="mb-5 text-3xl font-bold">Your Notes</h1>
          {notes.length > 0 ? (
          notes.map((note, idx) => (
            <Noteitem key={note._id || idx} note={note} idx={idx} />
          ))
        ) : (
          <div className="text-left py-5 px-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No notes found
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              <Link
              to="/"
              className="text-white-600 hover:text-grey hover:shadow-md hover:translate-y-[-1px]  hover:underline transition-all duration-200 inline-block"
            >
            Click here to create your first note!
            </Link>
            </p>
          </div>
        )}
        </div>
    </>
  );
};

export default Notes;