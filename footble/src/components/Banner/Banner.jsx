import React, { useEffect } from "react";
import "./Banner.css";
import { dap } from "../../assets";

const Banner = (props) => {
  const teamsChange = () => {
    if (props.allTeams) {
      props.setAllTeams(false);
    } else {
      props.setAllTeams(true);
    }
  };

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (
        e.key === "Enter" &&
        !props.allDone &&
        !(!props.allTeams && props.baseDone)
      ) {
        props.playAgain();
      }
    };

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="modal">
      {props.isCorrect &&
        !((props.baseDone && !props.allTeams) || props.allDone) && (
          <div className="modalContainer">
            <h1>Congratulations!</h1>
            <p>
              The solution was:{" "}
              <span className="solution">{props.solution}</span>
            </p>
            {props.turn === 1 ? (
              <p>You found the solution in {props.turn} guess</p>
            ) : (
              <p>You found the solution in {props.turn} guesses</p>
            )}
            <div className="playContainer">
              <button className="playButton" onClick={props.playAgain}>
                Play again
              </button>
            </div>
          </div>
        )}
      {!props.isCorrect &&
        !((props.baseDone && !props.allTeams) || props.allDone) && (
          <div className="modalContainer">
            <h1>Unfortunate...</h1>
            <p>
              The solution was:{" "}
              <span className="solution">{props.solution}</span>
            </p>
            <p>Maybe next time</p>
            <div className="playContainer">
              <button className="playButton" onClick={props.playAgain}>
                Play again
              </button>
            </div>
          </div>
        )}
      {props.isCorrect && props.baseDone && !props.allDone && !props.allTeams && (
        <div className="modalContainer">
          <h1>You know ball!</h1>
          <p>You guessed all the main teams.</p>
          <p>Try including the playoff teams now!</p>
          <ul>
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
          {props.allTeams && (
            <div className="playContainer">
              <button className="playButton" onClick={props.playAgain}>
                Play again
              </button>
            </div>
          )}
        </div>
      )}
      {!props.isCorrect && props.baseDone && !props.allDone && !props.allTeams && (
        <div className="modalContainer">
          <h1>Keep Going!</h1>
          <p>You guessed all the main teams.</p>
          <p>Try including the playoff teams now!</p>
          <ul>
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
          {props.allTeams && (
            <div className="playContainer">
              <button className="playButton" onClick={props.playAgain}>
                Play again
              </button>
            </div>
          )}
        </div>
      )}
      {props.isCorrect && props.allDone && (
        <div className="modalContainer">
          <h1>Elite ball knowledge!</h1>
          <p>You guessed every team.</p>
          <img className="dap" src={dap}></img>
        </div>
      )}
    </div>
  );
};

export default Banner;
