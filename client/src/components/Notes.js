import Note from "./Note";

const Notes = ({ notes, handleNoteDelete }) => {
  return (
    <>
      {notes.map((note) => (
        <Note key={note.id} note={note} handleNoteDelete={handleNoteDelete} />
      ))}
    </>
  );
};
export default Notes;
