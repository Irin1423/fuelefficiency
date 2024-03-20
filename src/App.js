import "./App.css";
import gptLogo from "./assets/chatgpt.svg"
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user_icon.png";
import gptIcon from "./assets/chatgptLogo.svg";
import { sendMessageToOpenAI } from "./Openai";
import { useState } from "react";


function App() {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text:"Hi, I am chatGPT",
      isBot: true,
    }
  ]);

  const handleMessageSubmit = async () => {
    const response = await sendMessageToOpenAI(input);
    //console.log(response)
    setMessages([
      ...messages,
      {text:input, isBot:false},
      {text:response,isBot:true}
    ])
  };

  return (
    <div className="App">
    <div className="sideBar">
        <div className="upperSideTop"><img src={gptLogo} alt="" className="logo" /><span className="brand">FuelEfficiency</span></div>
        <div className="upperSideBottom"><text className="history">History</text></div>
        <div className="list">
            <div className="listItems"><img src="" alt="" className="item1"/>History-1</div>
            <div className="listItems"><img src="" alt="" className="item1"/>History-2</div>
            <div className="listItems"><img src="" alt="" className="item1"/>History-3</div>
        </div>
    </div>
    <div className="main">
      <div className="chats">
        {messages.map((message, i) => 
          <div key={i} className={message.isBot?"chat bot":"chat"}>
            <img className="chatImg" src={message.isBot?gptIcon:userIcon} alt="ChatGPT" /> <p className="text">{message.text}</p>
          </div>
        )}
      </div>
      <div className="chatFooter">
        <div className="inp">
          <input type="text" placeholder="Send a message" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
          <button className="send" onClick={handleMessageSubmit}>
            <img src={sendBtn} alt="Send"/>
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;