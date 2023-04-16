import logo from './logo.svg';
import './login.css';
import Chat from './chat';
import {Link} from  "react-router-dom";
import  {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function Login() {
  return (
    <div className="Login">
      <header className="Login-header">

        <h2 className='welcome_text'>
          Welcome to Office Hours!
        </h2>
        
        <img src={logo} className="Login-logo" alt="logo" />
        
        <div className="container">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>

        <button className = "login_button">
          Sign in with Canvas
          <Link to = "/chat"> go to chat </Link> 
        </button>

      </header>
      <Router>
        <Routes>
        <Route path = "/" element = {<Login />} />
          <Route path = "/chat" element = {<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Login;