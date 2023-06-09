import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import './chat.css';
import signout from './signout.svg';
import send from './send.svg';

function Panel(props) {
  const {cardsData, setCourse} = props;
  const navigate = useNavigate();
  return (
    <div className="rectangle-pane">
      <div>
        <h1 className = "your_courses">
          Your Courses
        </h1>
      </div>
      <div className="App">
        <Class cardsData={cardsData} setCourse={setCourse}>
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
  const {cardsData, setCourse} = props;

  const handleCardClick = (cardId) => {
    setActiveCard(cardId === activeCard ? null : cardId);
    setCourse(cardId);
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

function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div className={!message.fromUser ? "system-msg" : "user-msg"} key={index}>
          <div className={message.fromUser ? "user_bubble" : "system_bubble"}>
            <TextMessageResponse message={message.message} fromUser={message.fromUser} />
          </div>
        </div>
      ))}
    </div>
  );
}


function ChatBox(props) {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [answer, setAnswer] = useState('');
  const {contexts, course_id} = props;

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(`User entered: ${inputValue}`);
    const newMessage = inputValue.trim();
    if (newMessage) {
      setInputValue('');
      const userMessage = { message: newMessage, fromUser: true };
      const answer = await generateResponse(newMessage);
      console.log(answer);
      setMessages([...messages, userMessage, answer]);
      console.log(messages);
    }
  };
  
  const generateResponse = async (message) => {
    console.log(contexts);
    console.log(course_id);
    console.log(contexts[course_id]);
    try {
      const response = await fetch('/askQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({context: contexts[course_id], question: message})
      });
      const data = await response.json();
      return { message: data.answer, fromUser: false };
    } catch (error) {
      console.error(error);
      // Handle any errors here
    }
  };

  return (
    <div className="chat-box">
      <MessageList messages={messages} />
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
  const [cardsData, setCardsData] = useState([]);
  const [contexts, setContexts] = useState([]);
  const [course, setCourse] = useState(0);

  const onLoad = async () => {
    try {
      const response1 = await fetch('/loadUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });
      const data1 = await response1.json();
      setCardsData(data1.course);
  
      const courseIds = data1.course.map(cardData => cardData.id);
      console.log(courseIds)

      const response2 = await fetch('/loadBot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ course_ids: courseIds })
      });
      const data2 = await response2.json();
      setContexts(data2.context);
      console.log(contexts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onLoad();
  }, []);
  

  return (
    <div>
        <InitialMSG />
        <ChatBox contexts={contexts} course_id={course} setContexts={setContexts}/>
        <Panel cardsData={cardsData} setCourse={setCourse}/>
    </div>
  );
}

export default Chat;