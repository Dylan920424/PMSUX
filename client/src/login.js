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
        
        <div className="container">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        <button>
          Login with Canvas
        </button>
      </header>
    </div>
  );
}

export default App;
