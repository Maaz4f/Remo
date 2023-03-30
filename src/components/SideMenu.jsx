import { useState } from "react";

function SideMenu({ currentModel, setCurrentModel, temperature, setTemperature, setChatlog }) {
    const [showresta, setshowresta] = useState(true);

      function clearChat() {
        setChatlog([]);
        setshowresta(true);
        console.log("You have");
      }
  return (
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
            defaultValue={currentModel}
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
              const selectElement =
                document.getElementById("select-element");
              selectElement.value = "aurora";
            }}
          >
            <span>Smart - Aurora</span>
          </div>

          <div
            className="main-option"
            onClick={() => {
              setCurrentModel("scriptor");
              const selectElement =
                document.getElementById("select-element");
              selectElement.value = "scriptor";
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
            defaultValue={temperature}
            onChange={(e) => {
              setTemperature(e.target.value);
            }}
          >
            <option value="0">0</option>
            <option value="0.5">0.5</option>
            <option value="1">1</option>
          </select>
          <div
            className="main-option"
            onClick={() => {
              setTemperature(0);
              const selectElement = document.getElementById(
                "select-element-temperature"
              );
              selectElement.value = "0";
            }}
          >
            <span>0 - Logical</span>
          </div>
          <div
            className="main-option"
            onClick={() => {
              setTemperature(0.5);
              const selectElement = document.getElementById(
                "select-element-temperature"
              );
              selectElement.value = "0.5";
            }}
          >
            <span>0.5 - Balanced</span>
          </div>

          <div
            className="main-option"
            onClick={() => {
              setTemperature(1);
              const selectElement = document.getElementById(
                "select-element-temperature"
              );
              selectElement.value = "1";
            }}
          >
            <span>1 - Creative </span>
          </div>
        </div>
        <h5 className="Res">
          The temperature parameter controls the randomness of the model 0
          is the most Logical and 1 is the most Creative.
        </h5>
      </div>
    </aside>
  );
}
export default SideMenu;