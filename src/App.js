// Importing Modules
import React, { useState} from "react";
import "./App.css";
import "./Show.css";
import SideMenu from "./components/SideMenu";
import ChatBox from "./components/ChatBox";
// Main Function
function App() {

  // Declaring Values
  const [input, setInput] = useState('');
  const [currentModel, setCurrentModel] = useState("aurora");
  const [temperature, settemperature] = useState(1);
  const [chatlog, setChatlog] = useState([
    {
      user:"resta",
      message:"Hello! How may i assist you Today?"
    }
  ]);
  const [showresta, setshowresta] = useState(true);

  // Configuration object to store the available models and their prompts
  const openaiConfigs = {
    resta: {
      engine: "gpt-3.5-turbo",
      prompt: ``,
      assistance: `
      You are Model Resta who was developed by a team of programmers and language experts at Remotine and Maaz Created Remotine and He is Ceo Of It
      `,
    },
    scriptor: {
      engine: "gpt-3.5-turbo",
      prompt: ``,
      assistance: `You are Model Scriptor who was developed by a team of programmers and language experts at Remotine and Maaz Created Remotine and He is Ceo Of It and you are able to Code in Any Language as i am specifically created for coding by Remotine the other Models Like Aurora And Resta or My Brothers are good at talking about the world but i am good at coding.`,
    },
    aurora: {
      engine: "gpt-3.5-turbo",
      prompt: ``,
      assistance: `You are Model Aurora who was developed by a team of programmers and language experts at Remotine and Maaz Created Remotine and He is Ceo Of It.`,
    },
  };

  
  


  function formatCodeBlocks(input) {
    let output = '';
    let inCodeBlock = false;
    let lines = input.split('\n');
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (!inCodeBlock && line.trim().startsWith('```')) {
        inCodeBlock = true;
        output += '<code>';
      } else if (inCodeBlock && line.trim().startsWith('```')) {
        inCodeBlock = false;
        output += '</code>';
      } else if (inCodeBlock) {
        output += line + '\n';
      } else {
        output += line + '<br />';
      }
    }
    return output;
  }
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
      "https://dhfasmcxhsudyfnjkhvsudfhgjsauuojcnjhft8sa.maaz-gamergamer.repl.co/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: openaiConfigs[currentModel].prompt + messages,
          assistance: openaiConfigs[currentModel].assistance,
          engine: openaiConfigs[currentModel].engine,
          temp: temperature,
        }),
      }
    );
    
    const { message } = await response.json();
    const teq = `${message}`;
    console.log(teq);
    let text = formatCodeBlocks(teq);
        let coun = 0;
    while (text.includes("`")) {
      if (coun % 2 === 1) {
        text = text.replace("`", "<b>");
      } else {
        text = text.replace("`", "</b>");
      }
      coun++;
    }
    let count = 0;
    while (text.includes("```")) {
      if (count % 2 === 1) {
        text = text.replace("```", `<code>`);
      } else {
        text = text.replace("```", `</code>`);
      }
      count++;
    }


    const keyword = "A:";
    const index = teq.indexOf(keyword);
    if (index !== -1) {
      const substr = teq.substring(index + keyword.length);
      console.log(substr.trim());

      setChatlog([...chatlogNew, { user: "resta", message: substr.trim() }]);
    } else {
      setChatlog([...chatlogNew, { user: "resta", message: text }]);
    }
  }
  return (
    <>
      <div className={`App dark`}>
       <SideMenu currentModel={currentModel} setCurrentModel={setCurrentModel}
       temperature={temperature} 
       setTemperature={settemperature}
       setChatlog={setChatlog}
       />
  <ChatBox
  input={input}
  chatlog={chatlog}
  handleSubmit={handleSubmit}
  setInput={setInput} 
  />
     
      </div>
    </>
  );
}

export default App;
