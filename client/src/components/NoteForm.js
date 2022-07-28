import { useState } from "react";
import AddButton from "./AddButton";

const NoteForm = ({ handleNoteAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNoteAdd({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your task a title"
        />
        <form />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <AddButton type="submit" text="Add" />
      </form>
    </>
  );
};

export default NoteForm;
