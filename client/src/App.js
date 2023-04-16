import './App.css';
import  {BrowserRouter, Route, Routes} from 'react-router-dom';
import Chat from './pages/chat';
import Login from './pages/login';

function App() {
  return (
    <div className="App">
      <Login />
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Login/>} />
          <Route path = "/chat" element = {<Chat/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;