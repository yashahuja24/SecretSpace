import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import "./AuthStyle.css";
import noteContext from "../context/notes/noteContext";
import { useContext, useState } from "react";
const AddNote = () => {
  const {addNote} = useContext(noteContext);
  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
    tag: ""
  });
  const handleClick=(e)=>{
    e.preventDefault();
    addNote(newNote.title,newNote.description,newNote.tag);
    //updates the form to empty again when a new note is added
    setNewNote({
    title: "",
    description: "",
    tag: ""
  });
  }
  const onchange=(e)=>{
    setNewNote({...newNote,[e.target.name]:e.target.value})
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 px-4 mt-6">
        <div className="auth-glass-home w-full max-w-md">
          <form onSubmit={handleClick} className="auth-form">
            <h2 className="auth-title">Add a New Note</h2>
            <input
              name="title"
              placeholder="Title"
              value={newNote.title}
              onChange={onchange}
              required
              className="auth-input border border-black"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newNote.description}
              onChange={onchange}
              required
              rows={4}
              className="auth-input border border-black"
            />
            <input
              name="tag"
              placeholder="Tag (e.g. Work, Personal)"
              value={newNote.tag}
              onChange={onchange}
              required
              className="auth-input border border-black"
            />
            <button type="submit" className="auth-button">
              Add Note
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNote;