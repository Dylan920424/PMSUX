import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import './chat.css';
import signout from './signout.svg';




function Panel() {
  const navigate = useNavigate();
  return (
    <div className="rectangle-pane">
        <div>
    <h1 className = "your_courses">
          Your Courses
        </h1>
        </div>
      <div className="App">
      <Class title="" description="" id="">
        </Class>
      </div>
      <div className="leave_lol">
        <div className="sign_out">Sign out</div>
        <img src={signout} alt="Icon" className="icon" onClick={() => {navigate("/");}} />
        </div>
    </div>
  )
}

function Card(props) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{props.title}</h3>
        <h4 className="card-description">{props.description}</h4>
        <p className="card-id">{props.id}</p>
      </div>
      <div className="card-body">
        {props.children}
      </div>
    </div>
  );
}

function Class(props) {
  const cardsData = [
    { id: 2, title: 'COMM_ST 352', description: 'Social Network Analysis' },
    { id: 2, title: 'EARTH 202', description: 'Earth Science Revealed' },
    { id: 2, title: 'ECON 201', description: 'Intro to Macroeconomics' },
    { id: 4, title: 'COMP_SCI 213', description: 'Intro to Computer Systems' },
    { id: 5, title: 'Card 4', description: 'This is the description for Card 4.' }
  ];

  return (
    <div className="card-list">
      {cardsData.map(card => (
        <Card key={card.id} title={card.title} description={card.description} />
      ))}
    </div>
  );
}

function ChatBox() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(`User entered: ${inputValue}`);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Type your question here!" />
        <button type="submit"><FaPaperPlane /></button>
      </div>
    </form>
  );
}

function Chat() {

  return (
    <div>
        <ChatBox />
        <Panel />
    </div>
  );
}

export default Chat;
