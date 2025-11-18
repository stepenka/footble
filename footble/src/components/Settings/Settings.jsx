import React, { useEffect } from "react";
import "./Settings.css";

const Settings = (props) => {
  const logoChange = () => {
    if (props.showLogo) {
      props.setHard(false);
      props.setShowLogo(false);
    } else {
      props.setHard(true);
      props.setShowLogo(true);
    }
  };

  useEffect(() => {}, [props.hard]);

  const closeSettings = () => {
    props.setShowSettings(false);
  };

  return (
    <div className="overlay">
      <div className="settingsContainer">
        <button className="closeSettings" onClick={closeSettings}>
          <span className="closeSettingsText">Close</span>
        </button>
        <h1>Settings</h1>
        <h3>Difficulty</h3>
        <div className="difficultyContainer">
          <p>Hide Logos</p>
          <input
            className="toggle"
            type="checkbox"
            id={"toggle"}
            checked={props.showLogo}
            onChange={logoChange}
          />
          <label
            className="toggleLabel"
            htmlFor={`toggle`}
            style={{ background: props.showLogo && "#0000a0" }}
          >
            <span className="toggleButton" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
