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

  const teamsChange = () => {
    if (props.allTeams) {
      props.setAllTeams(false);
    } else {
      props.setAllTeams(true);
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
          <ul>
            <li>
              <p>Hide Logos</p>
              <div className="toggleContainer">
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
            </li>
            <li>
              <p>Include all teams</p>
              <div className="toggleContainer">
                <input
                  className="toggle"
                  type="checkbox"
                  id={"toggle2"}
                  checked={props.allTeams}
                  onChange={teamsChange}
                />
                <label
                  className="toggleLabel"
                  htmlFor={`toggle2`}
                  style={{ background: props.allTeams && "#0000a0" }}
                >
                  <span className="toggleButton" />
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;
