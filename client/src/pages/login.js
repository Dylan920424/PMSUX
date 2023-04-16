import React from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

function Login() {
  const navigate = useNavigate();

  return (
    <div className="Login">
      <header className="header">
        <h2 className='welcome_text'>
          Welcome to Office Hours!
        </h2>
    </header>

    <div className="container">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>

    <button className = "login_button" 
        onClick={() => {navigate("/chat");}}>
        Sign in with Canvas
      </button>
    </div>
  );
}

export default Login;
