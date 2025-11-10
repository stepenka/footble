import React, { useState, useEffect } from "react";
import "./Row.css";
import { wrong, correct } from "../../assets";

const Row = (props) => {
  const [nameImage, setNameImage] = useState(wrong);
  const [countryImage, setCountryImage] = useState(wrong);
  const [cityImage, setCityImage] = useState(wrong);

  useEffect(() => {
    if (props.guess.name === props.solution.name) {
      setNameImage(correct);
    }
    if (props.guess.country === props.solution.country) {
      setCountryImage(correct);
    }
    if (props.guess.city === props.solution.city) {
      setCityImage(correct);
    }
  }, [props]);

  return (
    <div className="rowContainer">
      <div className="container">
        <div className="value">{props.guess.name}</div>
        <div className="symbolContainer">
          <img className="symbol" src={nameImage}></img>
        </div>
      </div>
      <div className="container">
        <div className="value">{props.guess.country}</div>
        <div className="symbolContainer">
          <img className="symbol" src={countryImage}></img>
        </div>
      </div>
      <div className="container">
        <div className="value">{props.guess.city}</div>
        <div className="symbolContainer">
          <img className="symbol" src={cityImage}></img>
        </div>
      </div>
    </div>
  );
};

export default Row;
