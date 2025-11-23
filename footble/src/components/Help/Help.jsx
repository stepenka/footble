import React from "react";
import "./Help.css";

const Help = (props) => {
  const closeHelp = () => {
    props.setShowHelp(false);
  };

  return (
    <div className="helpOverlay">
      <div className="helpContainer">
        <button className="closeHelp" onClick={closeHelp}>
          <span className="closeHelpText">Close</span>
        </button>
        <h1>How to play</h1>
        <p>Simply type in and select a team, then press the guess button.</p>
        <p>
          You will then receive some feedback telling you how your chosen team
          compares to the solution.
        </p>
        <p>
          The feedback indicates (in the following order): <br />
          The name of the team, their home city and nation, the distance and
          direction from the solution.
        </p>
      </div>
    </div>
  );
};

export default Help;
