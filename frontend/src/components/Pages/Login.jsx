import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import "./Login.css";
import CreateAccount from "./CreateAccount.jsx";

export default function Login() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        username: username,
        password: password
      })
    })
      .then(res => res.text())
      .then(result => {
        const trimmed = result.trim();

        if (!trimmed.startsWith("1")) {
          alert("Invalid username or password.");
          return;
        }

        const parts = trimmed.split(",");
        const userid = parts[1];

        localStorage.setItem("authenticated", "1");
        localStorage.setItem("userid", userid);

        navigate("/app", { replace: true });
      })

      .catch(error => {
        console.error(error);
        alert("Unable to connect to server.");
      });
  }


  const [buttonPopup, setButtonPopup] = useState(false);
  function handleAccountCreation() {

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
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <div className="authentication">
          <input name="username" placeholder="Username" type="text" required />
          <input name="password" placeholder="Password" type="password" required />
        </div>
        <div className="submissions">
          <button type="submit" className="button primary">Submit</button>
        </div>
      </form>

      <div className="accountCreation">
        <h3>Don't have an account yet?</h3>
        <button onClick={() => setButtonPopup(true)} className="button secondary">Create Account</button>
        <CreateAccount trigger={buttonPopup} setTrigger={setButtonPopup}>

        </CreateAccount>
      </div>
    </div>
  );
}