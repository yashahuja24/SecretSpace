import NoteContext from "./noteContext";
import { toast } from "react-toastify";
import { useState } from "react";
const NoteState = (props) => {
  const {setProgress}=props;
  const host = process.env.REACT_APP_BACKEND_URL;
  const [notes, setNotes] = useState([]);
  //Fetch Notes
  const getNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in.");
      return;
    }
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
    });
    const json = await response.json();
    // console.log(json); // shows the gatthered notes response
    setNotes(json);
  };

  //Add Note
  const addNote = async (title, description, tag) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in.");
        return;
      }
      //API Call
      setProgress(5);
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":token
        },
        body: JSON.stringify({ title, description, tag }),
      });
      setProgress(20);
      //Logic
      const note = await response.json();
      setProgress(50);
      setNotes(notes.concat(note));
      toast.success("Note added successfully!");
    } catch (error) {
      toast.error("Failed to add note!");
    }
    setProgress(100);
  };

  //Delete Note
  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in.");
        return;
      }
      //API Call
      setProgress(5);
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        },
      });
      setProgress(20);
      //TO CHECK OUTPUT IN CONSOLE(testing ke liye)
      const json = await response.json();
      console.log("Deleted Note: ",json);
      setProgress(50);
      //Logic
      // console.log("Deleting a note with ", id);
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNotes);
      toast.success("Note deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete note!");
    }
    setProgress(100);
  };

  //Update Note
  const editNote = async (id, title, description, tag) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in.");
        return;
      }
      //API Call
      setProgress(5);
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":token
        },
        body: JSON.stringify({ title, description, tag }),
      });
      setProgress(20);
      //TO CHECK OUTPUT IN CONSOLE(testing ke liye)
      const json = await response.json();
      console.log("Updated Note: ",json);
      setProgress(50);
      // Logic to update the state and backend
      const updatedNotes = notes.map((note) => {
        if (note._id === id) {
          return { ...note, title, description, tag };
        }
        return note;
      });
      setNotes(updatedNotes);
      toast.success("Note updated successfully!");
    } catch (error) {
      toast.error("Failed to updated  note!");
    }
    setProgress(100);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;