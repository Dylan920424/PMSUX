import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import './chat.css';
import signout from './signout.svg';
import send from './send.svg';

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
        <div className="sign_out">
          Sign out
        </div>
        <div className="signout">
          <img src={signout} alt="Icon" className="icon" onClick={() => {navigate("/");}} />
        </div>
      </div>
    </div>
  )
}

function Card(props) {
  const [color, setColor] = useState('');
  const clickable = props.activeCard === null || props.activeCard === props.id;
  const handleClick = () => {
    if (clickable) {
      setColor(color === '' ? '#544964' : '');
      props.onClick(props.id);
    }
    
  };
  return (
    <div className="card">
      <div className="card-header" style={{ backgroundColor: color }} 
                          onClick={handleClick}>
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
  const [activeCard, setActiveCard] = useState(null);

  const cardsData = [
    { id: 1, title: 'COMM_ST 352', description: 'Social Network Analysis' },
    { id: 2, title: 'EARTH 202', description: 'Earth Science Revealed' },
    { id: 3, title: 'ECON 201', description: 'Intro to Macroeconomics' },
    { id: 4, title: 'COMP_SCI 213', description: 'Intro to Computer Systems' },
    { id: 5, title: 'Card 5', description: 'This is the description for Card 4.' }
  ];

  const handleCardClick = (cardId) => {
    setActiveCard(cardId === activeCard ? null : cardId);
  };
  return (
    <div className="card-list">
      {cardsData.map(card => (
        <Card key={card.id} 
              title={card.title} 
              description={card.description} 
              id={card.id} 
              activeCard={activeCard} 
              onClick={handleCardClick}/>
      ))}
    </div>
  );
}


function InitialMSG() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsVisible(false);
      } else if (event.key === 'Enter') {
        setIsVisible(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div className="big_cont">
          <div className="circ_cont">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
          <div className="sum_text">
            Choose one of your courses on the left and ask away!
          </div>
        </div>
      )}
    </>
  );
}


function ChatBox() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(`User entered: ${inputValue}`);
    setInputValue('');
    const newMessage = inputValue.trim();
    if (newMessage) { // add a condition to prevent empty messages
      setInputValue('');
      setMessages([...messages, newMessage]);
    }
  };

  return (
    <div className="chat-box">
      <div className="message-list">
        {messages.map((message, index) => (
          <div className = "user_msg">
          <div className = "user_bubble">
          <TextMessageResponse key={index} message={message} fromUser={true} />
          </div>
          </div>
          ))}
      
    </div>
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Type your question here!" />
        <div className="send">
        <img src={send} alt="Icon" className="icon"/>
        </div>
      </div>
    </form>
    </div>
  );
}

function TextMessageResponse({ message, fromUser }) {
  const messageClass = fromUser ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <p>{message}</p>
    </div>
  );
};

function Chat() {
  
  return (
    <div>
        <InitialMSG />
        <ChatBox />
        <Panel />
    </div>
  );
}

export default Chat;