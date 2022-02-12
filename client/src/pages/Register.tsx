import React, { useState, useEffect } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isDisabled, setIsDisabled] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [accountCreated, setAccountCreated] = useState("");

  const submitRegisterHandler = async (event: React.ChangeEvent<any>) => {
    event.preventDefault();

    const result = await fetch("/user/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    }).then((res) => res.json());

    if (result.error) {
      setUserMessage(result.error);
      setAccountCreated("");
    } else {
      setUserMessage("");
      setAccountCreated("User Created");
    }
    setTimeout(() => {
      setUserMessage("");
      setAccountCreated("");
    }, 5000);
  };

  useEffect(() => {
    if (password === confirmPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [password, confirmPassword]);

  return (
    <div className="register-page">
      <div className="register-content">
        <div className="register-title">
          <h2>Register</h2>
        </div>
        <div className="register-container">
          <form onSubmit={submitRegisterHandler}>
            <label>username</label>
            <input
              type="text"
              required
              autoComplete="nope"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>email</label>
            <input
              type="email"
              required
              autoComplete="nope"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>confirm password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {userMessage && (
              <span className="invalid-user-error">{userMessage}!!!</span>
            )}

            <button
              type="submit"
              disabled={isDisabled}
              className={
                (isDisabled ? "disable" : "") ||
                (accountCreated ? "account-created" : "")
              }
            >
              {accountCreated ? `${accountCreated}` : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
