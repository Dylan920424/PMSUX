import './login.css';
import { useNavigate } from 'react-router-dom';


function Login() {

  const nav = useNavigate();
  
  return (
    <div className="Login">
      <header className="Login-header">

        <h2 className='welcome_text'>
          Welcome to Office Hours!
        </h2>
        
        <div className="container">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>

        <button className = "login_button" 
          onClick={() => {nav("/chat");
        }}>
          Sign in with Canvas
        </button>

      </header>
    </div>
  );
}

export default Login;