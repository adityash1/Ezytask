import { useState, useEffect } from "react";
import Box from "@mui/material/Box";

import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";

import noteService from "./services/notes";
import loginService from "./services/login";
import signUpService from "./services/signup";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);

  // fetching notes from the server
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (credentials) => {
    const { username, password } = credentials;
    const user = await loginService.login({ username, password });
    window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
    noteService.setToken(user.token);
    setUser(user);
  };

  const handleSignUp = async (credentials) => {
    const { username, name, password } = credentials;
    const user = await signUpService.signup({ username, name, password });
    setUser(user);
  };

  // adding new note to the server
  const handleNoteAdd = (note) => {
    noteService.create(note).then((newNote) => {
      setNotes(notes.concat(newNote));
    });
  };

  // deleting note from the server
  const handleNoteDelete = (id) => {
    noteService.destruct(id).then(() => {
      setNotes(notes.filter((note) => note.id !== id));
    });
  };

  // const loginform = () => {
  //   return <LoginPage onLogin={handleLogin} />;
  // };

  // const noteform = () => {
  //   return <NoteForm onSubmit={handleNoteAdd} />;
  // };

  return (
    <Box>
      <Box>
        <LoginPage onLogin={handleLogin} />
      </Box>
      <Box>
        <SignUpPage onSignUp={handleSignUp} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          borderRadius: "15px",
        }}
      >
        <NoteForm onSubmit={handleNoteAdd} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          padding: "1rem",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Notes notes={notes} handleNoteDelete={handleNoteDelete} />
      </Box>
    </Box>
  );
};

export default App;
