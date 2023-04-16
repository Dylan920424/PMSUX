import logo from './logo.svg';
import './login.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h2 className='welcome_text'>
        Welcome to Office Hours!
        </h2>
        <img src={logo} className="App-logo" alt="logo" />
        
        <div className="circle"></div>

        <h1>
          Login
        </h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React fu!
        </a>
      </header>
    </div>
  );
}



export default App;
