import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import './chat.css';

function Input() {
  return (
    <div>
      <form 
        className="query">
      </form>
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
    { id: 2, title: 'Card 1', description: 'This is the description for Card 1.' },
    { id: 2, title: 'Card 2', description: 'This is the description for Card 2.' },
    { id: 2, title: 'Card 3', description: 'This is the description for Card 3.' },
    { id: 4, title: 'Card 4', description: 'This is the description for Card 4.' },
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
  const navigate = useNavigate();

  return (
    <div>
      <Input />
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Sign out
      </button>
      <div className="App">
        <Class />
        <ChatBox />
      </div>
    </div>
  );
}

export default Chat;
