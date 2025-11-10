import React from "react";
import "./Settings.css";

const Settings = (props) => {
  const saturationChange = () => {
    if (props.saturation) {
      props.setSaturation(false);
    } else {
      props.setSaturation(true);
    }
  };

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
          <p>Grayscale</p>
          <input
            className="toggle"
            type="checkbox"
            id={"toggle"}
            checked={props.saturation}
            onChange={saturationChange}
          />
          <label
            className="toggleLabel"
            htmlFor={`toggle`}
            style={{ background: props.saturation && "#0000a0" }}
          >
            <span className="toggleButton" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
