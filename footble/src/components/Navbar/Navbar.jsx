import React from "react";
import "./Navbar.css";
import { ucl, help, settings, stats } from "../../assets";

const Navbar = (props) => {
  const settingsShow = () => {
    props.setShowSettings(true);
  };

  const helpShow = () => {
    props.setShowHelp(true);
  };

  const statsShow = () => {
    props.setShowStats(true);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logoContainer">
          <div className="logoText">Footble</div>
          <img className="logoImage" src={ucl}></img>
        </div>
        <ul className="buttonsContainer">
          <li>
            <button>
              <img src={stats} onClick={statsShow}></img>
            </button>
          </li>
          <li>
            <button onClick={settingsShow}>
              <img src={settings}></img>
            </button>
          </li>
          <li>
            <button onClick={helpShow}>
              <img src={help}></img>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
