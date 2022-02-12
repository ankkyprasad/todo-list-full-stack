import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { resourceLimits } from "worker_threads";
import { UserContext } from "../App";

const Login = () => {
  const [, setUser] = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [invalidUser, setInvalidUser] = useState<String>("");

  const navigate = useNavigate();

  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const result = await fetch("/user/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((res) => res.json());

    setUser({ token: result.token });

    if (result.token) navigate("/");
    else {
      setInvalidUser(result.error);
      setTimeout(() => {
        setInvalidUser("");
      }, 5000);
    }
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-title">
          <h2>login</h2>
        </div>
        <div className="form-container">
          <form onSubmit={submitHandler}>
            <label>username</label>
            <input
              type="text"
              required
              autoComplete="nope"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {invalidUser && (
              <span className="invalid-user-error">{invalidUser}!!!</span>
            )}

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
