import "./App.css";
import gptLogo from "./assets/chatgpt.svg"
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user_icon.png";
import gptIcon from "./assets/chatgptLogo.svg";
import React, { useState } from 'react';
import axios from 'axios';


function App() {

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      text:"Hi, How can I help you?",
      isBot: true,
    }
  ]);

  const handleMessageSubmit = async () => {
    //const json = JSON.stringify( {"prompt": "string"});
    //const input_message = "please tell me the fuel efficiency of the compact cars with regular fuelType, Regular Gasoline fuelType1 and built on 2013";
    
    const openai_query = "please construct a json object based on the text \"" + input + "\" where the properties are displ, VClass, guzzler, trany, fuelType, fuelType1, fuelType2 and year. The property values must be \"Not Applicable\" in case of not found.";

    /*const json = JSON.stringify({ displ : 0,
    VClass : "Compact cars",
    guzzler : "None",
    trany : "",
    fuelType : "Regular",
    fuelType1 : "Regular Gasoline",
    fuelType2 : "None",
    year : 2013 });
    */
  //  var res1 = 0;

    const openai_query_request_body = JSON.stringify({
      prompt: openai_query
    });
    await axios.post('https://darrenr.pythonanywhere.com/openai_query', openai_query_request_body, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      console.log("prediction: "+response.data.response);
      axios.post('https://darrenr.pythonanywhere.com/predict', response.data.response, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
       .then(function (res2) {
         console.log("prediction: "+res2.data);
         let prediction = Math.round(JSON.parse(res2.data).prediction*100)/100;
         setMessages([
          ...messages,
          {text:input, isBot:false},
          {text:"Fuel efficiency score is "+prediction,isBot:true}
        ])
       })
      .catch(function (error) {
        console.log(error);
      });
    
    })
    .catch(function (error) {
      console.log(error);
    });
    //const response = await sendMessageToOpenAI(input);
    // console.log("response: "+response)
    //  setMessages([
    //    ...messages,
    //    {text:input, isBot:false},
    //    {text:response,isBot:true}
    //  ])
  };

  

  return (
    <div className="App">
    <div className="sideBar">
        <div className="upperSideTop"><img src={gptLogo} alt="" className="logo" /><span className="brand">FuelEfficiency</span></div>
        {/*<div className="upperSideBottom"><text className="history">History</text></div>
         <div className="list">
            <div className="listItems"><img src="" alt="" className="item1"/>Can I know the fuel efficiency of Toyota corolla of 2014 cars</div>
            <div className="listItems"><img src="" alt="" className="item1"/>Can I know the fuel efficiency of Nissan leaf of 2021 cars</div>
        </div> */}
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