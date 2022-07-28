const Note = ({ note, handleNoteDelete }) => {
  return (
    <>
      <div>
        <h3>{note.title}</h3>
        <p>{note.description}</p>
      </div>
      <button type="button" onClick={() => handleNoteDelete(note.id)}>
        Delete
      </button>
    </>
  );
};

export default Note;
