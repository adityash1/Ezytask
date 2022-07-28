import { useState } from "react";

const SignUpPage = (onSignUp) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (event) => {
    event.preventDefault();
    onSignUp({ username, name, password }).then(() => {
      setUsername("");
      setName("");
      setPassword("");
    });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          name
          <input
            type="text"
            value={name}
            name="name"
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
export default SignUpPage;
