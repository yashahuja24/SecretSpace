import React, { useState, useEffect } from "react";

const EditModal = ({ show, onClose, onSave, note }) => {
  const [title, setTitle] = useState(note.title || "");
  const [description, setDescription] = useState(note.description || "");
  const [tag, setTag] = useState(note.tag || "");

  useEffect(() => {
    setTitle(note.title || "");
    setDescription(note.description || "");
    setTag(note.tag || "");
  }, [note]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-md relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-red-500"
        >
          &times;
        </button>
        <h2 className="text-2xl mb-4 font-semibold">Edit Note</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave({ ...note, title, description, tag });
          }}
          className="space-y-4"
        >
          <input
            type="text"
            className="w-full px-3 py-2 bg-gray-700 rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="w-full px-3 py-2 bg-gray-700 rounded"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <input
            type="text"
            className="w-full px-3 py-2 bg-gray-700 rounded"
            placeholder="Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;