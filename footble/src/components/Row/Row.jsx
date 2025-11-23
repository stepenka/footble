import React, { useState, useEffect } from "react";
import "./Row.css";
import {
  wrong,
  correct,
  north,
  northeast,
  northwest,
  south,
  southeast,
  southwest,
  east,
  west,
  center,
} from "../../assets";
import { getDistance, getCompassDirection } from "geolib";

const Row = (props) => {
  const [nameImage, setNameImage] = useState(wrong);
  const [countryImage, setCountryImage] = useState(wrong);
  const [directionImage, setDirectionImage] = useState(north);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (props.guess.name === props.solution.name) {
      setNameImage(correct);
    }
    if (props.guess.country === props.solution.country) {
      setCountryImage(correct);
    }
    const direction = getCompassDirection(
      {
        latitude: props.guess.coords[0],
        longitude: props.guess.coords[1],
      },
      {
        latitude: props.solution.coords[0],
        longitude: props.solution.coords[1],
      }
    );

    const distanceMeters = getDistance(
      {
        latitude: props.guess.coords[0],
        longitude: props.guess.coords[1],
      },
      {
        latitude: props.solution.coords[0],
        longitude: props.solution.coords[1],
      },
      1000
    );
    setDistance(distanceMeters / 1000);

    if (distanceMeters === 0) {
      setDirectionImage(center);
    } else if (direction === "N") {
      setDirectionImage(north);
    } else if (direction === "S") {
      setDirectionImage(south);
    } else if (direction === "E") {
      setDirectionImage(east);
    } else if (direction === "W") {
      setDirectionImage(west);
    } else if (
      direction === "NE" ||
      direction === "NNE" ||
      direction === "ENE"
    ) {
      setDirectionImage(northeast);
    } else if (
      direction === "NW" ||
      direction === "NNW" ||
      direction === "WNW"
    ) {
      setDirectionImage(northwest);
    } else if (
      direction === "SE" ||
      direction === "SSE" ||
      direction === "ESE"
    ) {
      setDirectionImage(southeast);
    } else if (
      direction === "SW" ||
      direction === "SSW" ||
      direction === "WSW"
    ) {
      setDirectionImage(southwest);
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
        <div className="value">
          {props.guess.city}, {props.guess.country}
        </div>
        <div className="symbolContainer">
          <img className="symbol" src={countryImage}></img>
        </div>
      </div>
      <div className="container">
        <div className="value">
          {distance}
          KM
        </div>
        <div className="symbolContainer">
          <img className="directionSymbol" src={directionImage}></img>
        </div>
      </div>
    </div>
  );
};

export default Row;
