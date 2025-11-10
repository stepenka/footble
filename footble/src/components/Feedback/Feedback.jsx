import React from "react";
import "./Feedback.css";
import { Row } from "../../components";

const Feedback = (props) => {
  return (
    <>
      <div className="feedbackContainer">
        <ul className="feedbackList">
          <li>
            {props.guesses[0] ? (
              <Row guess={props.guesses[0]} solution={props.solution}></Row>
            ) : (
              <div className="blank"></div>
            )}
          </li>
          <li>
            {props.guesses[1] ? (
              <Row guess={props.guesses[1]} solution={props.solution}></Row>
            ) : (
              <div className="blank"></div>
            )}
          </li>
          <li>
            {props.guesses[2] ? (
              <Row guess={props.guesses[2]} solution={props.solution}></Row>
            ) : (
              <div className="blank"></div>
            )}
          </li>
          <li>
            {props.guesses[3] ? (
              <Row guess={props.guesses[3]} solution={props.solution}></Row>
            ) : (
              <div className="blank"></div>
            )}
          </li>
          <li>
            {props.guesses[4] ? (
              <Row guess={props.guesses[4]} solution={props.solution}></Row>
            ) : (
              <div className="blank"></div>
            )}
          </li>
          <li></li>
        </ul>
      </div>
    </>
  );
};

export default Feedback;
