// Importing Modules
import React, { useState, useEffect } from "react";
import "./App.css";
import resta from "./assets/resta.png";
import user from "./assets/user.png";
import "./Show.css";
import { ReactComponent as MoonIcon } from "./assets/MoonIcon.svg";
import { ReactComponent as SunIcon } from "./assets/SunIcon.svg";
// import AiAssist from './AiAssist';
// Main Function
function App() {
  // Function to change Themes
  function toggleTheme() {
    const theme = "dark";
    setTheme(theme === "light" ? "dark" : "light");
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
  const [theme, setTheme] = useState("light");
  const [input, setInput] = useState("");
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState("aurora");
  const [showresta, setshowresta] = useState(true);
  const [temperature, settemperature] = useState(1);
  // const [state, setState] = useState(null);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }
  // Configuration object to store the available models and their prompts
  const openaiConfigs = {
    resta: {
      engine: "gpt-3.5-turbo",
      prompt: `You are Model Resta.Q:Who Developed You?
      I was developed by a team of programmers and language experts at Remotine.Q:Who Created Remotine?\n A: Maaz Created Remotine and He is Ceo Of It.Q:`,
    },
    scriptor: {
      engine: "gpt-3.5-turbo",
      prompt: `You are Model Scriptor.Q:Who Developed You?
      I was developed by a team of programmers and language experts at Remotine.Q:Who Created Remotine?\n A: Maaz Created Remotine and He is Ceo Of It.Q:What can you do?
        A:I can Code in Any Language as i am specifically created for coding by Remotine the other Models Like Aurora And Resta or My Brothers are good at talking about the world but i am good at coding.`,
    },
    aurora: {
      engine: "gpt-3.5-turbo",
      prompt: `You are Model Aurora.Q:Who Developed You?
      I was developed by a team of programmers and language experts at Remotine.Q:Who Created Remotine?\n A: Maaz Created Remotine and He is Ceo Of It.Q:`,
    },
  };

  // FuncTion to load Models
  function getEngines() {
    fetch("https://LegitimateIvoryLivedistro.maaz-gamergamer.repl.co/models")
      .then((res) => res.json())
      .then((data) => setModels(data.models.data));
  }
  // Function to send a prompt to server
  async function handleSubmit(e) {
    e.preventDefault();
    if (showresta) {
      setshowresta(false);
    }
    let chatlogNew = [...chatlog, { user: "user", message: `${input}` }];
    setInput("");
    setChatlog(chatlogNew);
    const messages = chatlogNew.map((message) => message.message).join("\n");
    const response = await fetch(
      "https://LegitimateIvoryLivedistro.maaz-gamergamer.repl.co/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: openaiConfigs[currentModel].prompt + messages,
          engine: openaiConfigs[currentModel].engine, 
          temp : temperature,
        }),
      }
    );
    const { message } = await response.json();
    const teq = `${message}`;
    console.log(teq);
    const keyword = "A:";
    const index = teq.indexOf(keyword);
    if (index !== -1) {
      const substr = teq.substring(index + keyword.length);
      console.log(substr.trim());

      setChatlog([...chatlogNew, { user: "resta", message: substr.trim() }]);
    } else {
      setChatlog([...chatlogNew, { user: "resta", message: `${message}` }]);
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
        const response = await fetch(
          "https://LegitimateIvoryLivedistro.maaz-gamergamer.repl.co/suggest",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: `Q:Finish My Thought : Hello how are A:you? Finish My Thought:${input}`,
              engine: `gpt-3.5-turbo`,
            }),
          }
        );
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

  const [response, setResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  useEffect(() => {
    let timer;
    if (input !== "") {
      setIsTyping(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        fetchResponse(input);
        setIsTyping(false);
      }, 3000);
    } else {
      setIsTyping(false);
      setResponse("");
    }
    return () => clearTimeout(timer);
  }, [input]);
  const fetchResponse = async (input) => {
    const response = await fetch(
      "https://LegitimateIvoryLivedistro.maaz-gamergamer.repl.co/suggest",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `You are a text completion bot just complete the text and don't give any revelant awnsers to the prompt just complete them. Q:Hello how are A:you? Finish My Thought:${input}`,
          engine: `gpt-3.5-turbo`,
        }),
      }
    );
    const { message } = await response.json();
    setResponse(message);
    setIsTyping(true);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      setInput(`${input}` + `${response}`);
      setIsTyping(false);
    } else if (e.key === "ArrowRight") {
      setInput(`${input}` + `${response}`);
      setIsTyping(false);
    } else if (e.key === "ArrowLeft") {
      setInput(`${input}` + `${response}`);
      setIsTyping(false);
    }
    console.log(e.key);
  };
  function handleresponseChange(event) {
    event.target.value = `${response}`;
  }

  return (
    <>
      <div className={`App dark`}>
        <aside className="sidemenu">
          <div className={`side-menu-button`} onClick={clearChat}>
            <span>+</span>
            New Chat
          </div>
          <div className="models">
            <h3> Models </h3>
            <div>
              <select
              id="select-element"
                className="select-element"
                defaultValue="aurora"
                onChange={(e) => {
                  setCurrentModel(e.target.value);
                }}
              >
                <option value="aurora">Aurora(Recommended)</option>
                <option value="resta">Resta</option>
                <option value="scriptor">Scriptor</option>
              </select>
              <div
                className="main-option"
                onClick={() => {
                  setCurrentModel("aurora");
                  const selectElement = document.getElementById("select-element");
                  selectElement.value = "aurora";
                  console.log("buttonClikced")
                }}
              >
                <span>Smart - Aurora</span>
              </div>

              <div
                className="main-option"
                onClick={() => {
                  setCurrentModel("scriptor");
                  const selectElement = document.getElementById("select-element");
                  selectElement.value = "scriptor";
                  console.log("buttonClikced")
                }}
              >
                <span>Code - Scriptor</span>
              </div>
            </div>
            <h5 className="Res">
              The Model parameter controls the engine used to generate the
              response.Aurora produces best results.
            </h5>
          </div>
         <div className="temperature">
         <div>
              <select
              id="select-element-temperature"
                className="select-element"
                defaultValue="1"
                onChange={(e) => {
                  settemperature(e.target.value);
                } }
              >
                <option value="0">0</option>
                <option value="0.5">0.5</option>
                <option value="1">1</option>
              </select>
              <div
                className="main-option"
                onClick={() => {
                  settemperature(0);
                  const selectElement = document.getElementById("select-element-temperature");
                  selectElement.value = "0";
                  console.log("buttonClikced")
                }}
              >
                <span>0 - Logical</span>
              </div>
              <div
                className="main-option"
                onClick={() => {
                  settemperature(0.5);
                  const selectElement = document.getElementById("select-element-temperature");
                  selectElement.value = "0.5";
                  console.log("buttonClikced")
                }}
              >
                <span>0.5 - Balanced</span>
              </div>

              <div
                className="main-option"
                onClick={() => {
                  settemperature(1);
                  const selectElement = document.getElementById("select-element-temperature");
                  selectElement.value = "1";
                  console.log("buttonClikced")
                }}
            >
                <span>1 - Creative </span>
              </div>
            </div>
            <h5 className="Res">
             The temperature parameter controls the randomness of the model 0 is the most Logical and 1 is the most Creative.
</h5>
         </div>
        </aside>

        <section className={`chatbox dark`}>
          <div className={`chat-log dark`}>
            <div className="chat-page">
              {chatlog.map((message, index) => (
                <div
                  className={`chat-message ${
                    message.user === "resta" && "resta"
                  } dark`}
                  key={index}
                >
                  <div className="chat-message-center">
                    <div
                      className={`avatar ${
                        message.user === "resta" ? "resta" : "user"
                      } dark`}
                    >
                      {message.user === "resta" ? (
                        <img src={resta} alt="resta avatar" />
                      ) : (
                        <img src={user} alt="user avatar" />
                      )}
                    </div>
                    <div className={`message dark`}>{message.message}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-input-holder">
              <form onSubmit={handleSubmit}>
                <input
                  className={`chat-input-textarea dark`}
                  rows={1}
                  value={input}
                  type="text"
                  onKeyDown={handleKeyDown}
                  onChange={handleInputChange}
                />
                <button className="Submit" onClick={handleSubmit}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
