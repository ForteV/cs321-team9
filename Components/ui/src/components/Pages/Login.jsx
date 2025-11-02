import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // perform real auth here, for now just mark authenticated
    localStorage.setItem("authenticated", "1");
    navigate("/app", { replace: true });
  }

  return (
    <div className="logInPage">
      <header>
        <title>Medibase - LogIn</title>
        <h1>
            Medi<font color="#0000">Base</font>
        </h1>
      </header>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12}}>
        <div className="authentication">
          <input name="username" placeholder="Username" type="text" required />
          <input name="password" placeholder="Password" type="password" required />
        </div>
        <div className="submissions">
          <button type="submit" className="button primary">Create Account</button>
          <button type="submit" className="button primary">Submit</button>
        </div>
      </form>
    </div>
  );
}