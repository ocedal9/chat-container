import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import "../styles/firstpage.css";

export default function firstpage() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to Generic Chat. Sign up or login in if you already have an
          account.
        </p>
        <Link className="App-link" to="/signup">
          Sign up
        </Link>
        <Link className="App-link" to="/login">
          Log in
        </Link>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}
