import React from 'react';
import resta from "../assets/resta.png";
import user from "../assets/user.png";

function ChatBox({ chatlog, input, handleSubmit, setInput }) {
  return (
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
              
                <div dangerouslySetInnerHTML={{ __html: message.message }} className={`message dark `}></div>
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
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button className="Submit" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ChatBox;
