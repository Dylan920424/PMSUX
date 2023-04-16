import React from "react";
import { useNavigate } from "react-router-dom";
import './Chat.css';

function Input() {
  return (
    <div>
      <form 
    className="query">
      </form>
    </div>
  )
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
    </div>
  );
}

export default Chat;
