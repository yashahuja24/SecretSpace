import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const Noteitem = (props) => {
  const { note, idx } = props;
  const { deleteNote, editNote } = useContext(noteContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const handleDelete = () => {
    deleteNote(note._id);
    setShowDeleteModal(false);
  };
  const handleEdit = (updatedNote) => {
    editNote(updatedNote._id, updatedNote.title, updatedNote.description, updatedNote.tag);
    setShowEditModal(false);
  };
  return (
    <div>
      <div
        key={idx}
        className="relative bg-gray-100 dark:bg-gray-800/70 backdrop-blur-md p-4 rounded-lg shadow-sm"
      >
        <div className="absolute top-2 right-2 flex gap-2 text-gray-600 dark:text-gray-300">
          <i
            className="fa-solid fa-pen hover:text-blue-600 cursor-pointer"
            onClick={() =>
              setShowEditModal(true)
            }
          ></i>
          <i
            className="fa-solid fa-trash hover:text-red-600 cursor-pointer"
            onClick={() => setShowDeleteModal(true)}
          ></i>
        </div>
        <h3 className="text-lg font-semibold flex items-center gap-2 pr-10">
          {note.title}
          {note.tag && (
            <span className="text-xs bg-indigo-500 text-white px-2 py-0.5 rounded-full">
              {note.tag}
            </span>
          )}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">{note.description}</p>
      </div>
      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
      <EditModal show={showEditModal}
      onClose={()=>setShowEditModal(false)}
      onSave={handleEdit}
      note={note}
      />
    </div>
  );
};

export default Noteitem;