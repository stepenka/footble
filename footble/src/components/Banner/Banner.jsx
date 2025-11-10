import React from "react";
import "./Banner.css";

const Banner = (props) => {
  return (
    <div className="modal">
      {props.isCorrect && (
        <div className="modalContainer">
          <h1>Congratulations!</h1>
          <p>
            The solution was: <span className="solution">{props.solution}</span>
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
      {!props.isCorrect && (
        <div className="modalContainer">
          <h1>Unfortunate...</h1>
          <p>
            The solution was: <span className="solution">{props.solution}</span>
          </p>
          <p>Maybe next time</p>
          <div className="playContainer">
            <button className="playButton" onClick={props.playAgain}>
              Play again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
