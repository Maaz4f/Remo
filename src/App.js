// Importing Modules 
import React, { useState, useEffect } from 'react';
import './App.css';
import resta from './assets/resta.png';
import user from './assets/user.png';
import './Show.css'
import { ReactComponent as MoonIcon } from './assets/MoonIcon.svg';
import { ReactComponent as SunIcon } from './assets/SunIcon.svg';
// import AiAssist from './AiAssist';
// Main Function 
function App() {
 
// Function to change Themes
  function toggleTheme() {
    const theme = "dark"; 
    setTheme(theme === 'light' ? 'dark' : 'light');
  }
  // This will run The function getEngines on a load.
  useEffect(() => {
    getEngines();
    const theme = "dark"; // Default Theme is Dark
    document.body.classList.add(theme);
    return () => {
      document.body.classList.remove(theme);
    };
  }, []);
  
  
  // Declaring Values
  const [chatlog, setChatlog] = useState([]);
  const [theme, setTheme] = useState('light');
  const [input, setInput] = useState('');
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState('aurora');
  const [showresta, setshowresta] = useState(true);
  // const [state, setState] = useState(null);


  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }
  // Configuration object to store the available models and their prompts
  const openaiConfigs = {
    resta: {
      engine: "text-davinci-003",
      prompt: "You are Model Resta.Remotine is The Owner of Model Resta and Model Scriptor and Model Maaz and Model Aurora and Maaz is CEO of Remotine."
    },
    scriptor: {
      engine: "text-davinci-002",
      prompt: "You are Model Scriptor."
    },
    maaz: {
      engine: "text-davinci-003",
      prompt: "You are Model Maaz.Q:How was the moment when inzamam sawed you dressing?\nA:I don't Awnser inappropriate requests."
    },
    aurora: {
      engine:"gpt-3.5-turbo",
      prompt:`You are Model Aurora.Q:Who Developed You?
      I was developed by a team of programmers and language experts at Remotine.Q:Who Created Remotine?\n A: Maaz Created Remotine and He is Ceo Of It.Q:`
    }
    
  };


// FuncTion to load Models
  function getEngines() {
    fetch('https://LegitimateIvoryLivedistro.maaz-gamergamer.repl.co/models')
      .then((res) => res.json())
      .then((data) => setModels(data.models.data));
  }
// Function to send a prompt to server 
  async function handleSubmit(e) {
    e.preventDefault();
    if (showresta) {
      setshowresta(false);
    }
    let chatlogNew = [...chatlog, { user: 'user', message: `${input}` }];
    setInput('');
    setChatlog(chatlogNew);
    const messages = chatlogNew.map((message) => message.message).join('\n');
    const response = await fetch('https://LegitimateIvoryLivedistro.maaz-gamergamer.repl.co/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: openaiConfigs[currentModel].prompt + messages,
        engine: openaiConfigs[currentModel].engine,
      }),
    });
    const { message } = await response.json();
    const teq = `${message}`;
    console.log(teq)
    const keyword = 'A:';
    const index = teq.indexOf(keyword);
    if (index !== -1) {
      const substr = teq.substring(index + keyword.length);
      console.log(substr.trim());

      setChatlog([...chatlogNew, { user: 'resta', message: substr.trim() }]);
    } else {
        setChatlog([...chatlogNew, { user: 'resta', message: `${message}` }]);
    }
  }
  
  

  function clearChat() {
    setChatlog([]);
      setshowresta(true);
    
  }
  let timer;
  let hasReceivedResponse = false;
  async function handleChange(input, setIsWaitingForResponse) {
    clearTimeout(timer);
    if (isWaitingForResponse) {
      return;
    }
    timer = setTimeout(async () => {
      try {
        setIsWaitingForResponse(true);
        const response = await fetch('https://LegitimateIvoryLivedistro.maaz-gamergamer.repl.co/suggest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: `Q:Finish My Thought : Hello how are A:you? Finish My Thought:${input}`,
            engine: `gpt-3.5-turbo`,
          }),
        });
        const { message } = await response.json();
        const teq = `${message}`;
        console.log(teq);
        setIsWaitingForResponse(true);
      } catch (error) {
        console.error(error);
        setIsWaitingForResponse(true);
      }
    }, 3000);
  }
  
  const [response, setResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  useEffect(() => {
    let timer;
    if (input !== '') {
      setIsTyping(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        fetchResponse(input);
        setIsTyping(false);
      }, 3000);
    } else {
      setIsTyping(false);
      setResponse('');
    }
    return () => clearTimeout(timer);
  }, [input]);
  const fetchResponse = async (input) => {
    const response = await fetch('https://LegitimateIvoryLivedistro.maaz-gamergamer.repl.co/suggest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `You are a text completion bot just complete the text and don't give any revelant awnsers to the prompt just complete them. Q:Hello how are A:you? Finish My Thought:${input}`,
        engine: `gpt-3.5-turbo`,
      }),
    });
    const { message } = await response.json();
    setResponse(message);
    setIsTyping(true);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      setInput(`${input}` + `${response}`);
      setIsTyping(false);
    }
    else if (e.key === 'ArrowRight') {
      setInput(`${input}` + `${response}`);
      setIsTyping(false);
    }
    
     
    else if (e.key === 'ArrowLeft') {
      setInput(`${input}` + `${response}`);
      setIsTyping(false);
    }
    console.log(e.key);
  };
  function handleresponseChange(event) {
    event.target.value = `${response}`
  }
  
  return (
    <>
      <div className={`App ${theme}`}>
        <aside className="sidemenu">
          <div className={`side-menu-button`} onClick={clearChat}>
            <span>+</span>
            New Chat
          </div>
          <div className="models">
            <h1> Models </h1>
            <div>
              <select
                className="select-element"
                defaultValue="aurora"
                onChange={(e) => {
                  setCurrentModel(e.target.value);
                }}
              >
                <option value="aurora">Aurora(Recommended)</option>
                <option value="resta">Resta</option>
                <option value="scriptor">Scriptor</option>  
                <option value="maaz">Maaz</option>
                </select>
            </div>
            <h5>Welcome to the chat with Model Aurora, an AI-powered language model developed by a team of programmers and language experts from Remotine. Users can have natural conversations with this model and receive insightful and relevant responses t ailored to their queries. A range of other models, including Model Resta, Model Scriptor, and Model Maaz, have been created by the same developers and can be explored for their unique features. Engage with Model Aurora to experience its abilities and engage in meaningful discussions.</h5>
          </div>
          {/* Functionality To Change Themes */}
          <div
            className={`side-menu-button ${theme}`}
            style={{ marginTop: "0" }}
            onClick={toggleTheme}
          >
  
 
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
      <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>

</div>
        </aside>
  
  
        <section className={`chatbox ${theme}`}>
        <div className={`chat-log ${theme}`}>
            {showresta ? (
              
              <div className="resta-page">              
                <div className={`hed ${theme}`}>
                <div class={`text-gray-800 ${theme}`}>
    <div className={`container ${theme}`}>
      <h1>Remotine</h1>
      <div className={`section ${theme}`}>
        <h2 className="section-title">Examples</h2>
        <ul className="section-content">
          <li>"Explain quantum computing in simple terms"</li>
          <li>"Got any creative ideas for a 10 year old’s birthday?"</li>
          <li>"How do I make an HTTP request in Javascript?"</li>
        </ul>
      </div>
  
      <div className={`section ${theme}`}>
        <h2 className="section-title">Capabilities</h2>
        <ul className="section-content">
          <li>Remembers what user said earlier in the conversation</li>
          <li>Allows user to provide follow-up corrections</li>
          <li>Trained to decline inappropriate requests</li>
        </ul>
      </div>
  
      <div className={`section ${theme}`}>
        <h2 className="section-title">Limitations</h2>
        <ul className="section-content">
          <li>May struggle with complex or ambiguous questions</li>
          <li>May provide inaccurate or incomplete information</li>
          <li>May require further clarification or context</li>
        </ul>
      </div>
      </div>
    </div>
  </div>
               
                </div>
            ) : (
              <div className="chat-page">
                {chatlog.map((message, index) => (
                  <div
                    className={`chat-message ${
                      message.user === "resta" && "resta"
                    } ${theme}`}
                    key={index}
                  >
                    <div className="chat-message-center">
                      <div
                        className={`avatar ${
                          message.user === "resta" ? "resta" : "user"
                        } ${theme}`}
                      >
                        {message.user === "resta" ? (
                          <img src={resta} alt="resta avatar" />
                        ) : (
                          <img src={user} alt="user avatar" />
                        )}
                      </div>
                      <div className={`message ${theme}`}>
                        {message.message}
                      </div>
                    </div>
                  </div>
                ))}
               
                          
              </div>
            )};
          
          <div className="chat-input-holder">
              <form onSubmit={handleSubmit}>
                <input
                  className={`chat-input-textarea ${theme}`}
                  rows={1}
                  value={input}
                  type="text"
                  onKeyDown={handleKeyDown} 
                  onChange={handleInputChange}  
                />
                {isTyping ? (
                  <textarea
                    className={`chat-input-textarea ${theme}`}
                    rows={1}
                    value={response}
                    onChange={handleresponseChange}
                    readOnly
                  />
                ) : (
                  <textarea
                    className={`chat-input-textarea ${theme}`}
                    rows={1}
                    value={response}
                    onChange={handleresponseChange}
                    readOnly
                  />
                )}

                 <h6
              className={`research ${theme}`}
            >
              Remotine March 4 Version. Our goal is to make AI systems more natural and safe to interact with. Your feedback will help us improve. If you want to buy our API, please contact us at +923034973191 or email us at maazsaeed726@gmail.com.</h6>
              </form>

            </div>
                </div>
               
        </section>
        
      </div>
      
    </>
  );
  
}




export default App;
         
