import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./Header.css";
import { logo, nologo } from "../../assets";
import {
  Navbar,
  Feedback,
  Banner,
  Settings,
  Help,
  Stats,
} from "../../components";
import useFootble from "../../hooks/useFootble";

const Header = (props) => {
  const {
    currentGuess,
    setCurrentGuess,
    submitGuess,
    guesses,
    isCorrect,
    turn,
    reset,
    games,
    setTurn,
    hard,
    setHard,
  } = useFootble(props.solution, [...props.json, ...props.extras]);

  //   console.log(props.json);

  const change = (event) => {
    setCurrentGuess(event);
  };

  useEffect(() => {
    if (currentGuess != "") {
      submitGuess();
    }
  }, [currentGuess]);

  const [showModal, setShowModal] = useState(false);

  const [showSettings, setShowSettings] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  const [showHelp, setShowHelp] = useState(false);

  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    if (isCorrect) {
      setTimeout(() => setShowModal(true), 1000);
    }
    if (turn > 4) {
      setTurn(6);
      setTimeout(() => setShowModal(true), 1000);
    }
  }, [isCorrect, turn]);

  const playAgain = () => {
    props.pickAgain();
    reset();
    setShowModal(false);
  };

  const filterOptions = (option, searchText) => {
    let aliasMatch = false;
    for (const alias of option.value) {
      if (alias.toLowerCase().includes(searchText.toLowerCase())) {
        aliasMatch = true;
      }
    }
    return option.label.toLowerCase().includes(searchText.toLowerCase()) ||
      aliasMatch
      ? true
      : false;
  };

  const [squads, setSquads] = useState(
    props.json.map((team) => {
      return { value: team.aliases, label: team.name };
    })
  );

  useEffect(() => {
    if (props.allTeams) {
      const teams = [...props.json, ...props.extras];
      setSquads(
        teams.map((team) => {
          return { value: team.aliases, label: team.name };
        })
      );
    } else {
      setSquads(
        props.json.map((team) => {
          return { value: team.aliases, label: team.name };
        })
      );
    }
  }, [props.allTeams]);

  const customStyles = {
    menuList: (provided, state) => ({
      ...provided,
      backgroundColor: "#00004b",
      color: state.isFocused ? "#0000a0" : "white",
      borderStyle: "solid",
      borderColor: "#0000a0",
      borderRadius: "20px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#00004b",
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "#00004b",
      borderStyle: "none",
      borderRadius: "20px",
      color: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#0000a0" : "white",
    }),
    input: (provided) => ({
      ...provided,
      color: "white",
    }),
  };

  return (
    <>
      <header>
        <Navbar
          setShowSettings={setShowSettings}
          setShowHelp={setShowHelp}
          setShowStats={setShowStats}
        />
        <div className="wrapper">
          <div className="displayContainer">
            <div className="imageContainer">
              <h1 className="displayText">Guess the Champions League Team</h1>
              {!showLogo ? (
                <img
                  className="displayImage"
                  src={logo[props.solution.id - 1]}
                ></img>
              ) : (
                <img
                  className="displayImage"
                  src={nologo[props.solution.id - 1]}
                ></img>
              )}
            </div>
            {!showModal && (
              <div className="displayGuess">
                <Select
                  autoFocus={true}
                  blurInputOnSelect={true}
                  options={squads}
                  onChange={(e) => change(e.label)}
                  placeholder="Enter a team name"
                  filterOption={filterOptions}
                  styles={customStyles}
                />
              </div>
            )}
          </div>
          <Feedback guesses={guesses} solution={props.solution} />
        </div>
        {showModal && (
          <Banner
            isCorrect={isCorrect}
            turn={turn}
            solution={props.solution.name}
            playAgain={playAgain}
            allDone={props.allDone}
            baseDone={props.baseDone}
            allTeams={props.allTeams}
            setAllTeams={props.setAllTeams}
          ></Banner>
        )}
        {showSettings && (
          <Settings
            setShowSettings={setShowSettings}
            showLogo={showLogo}
            setShowLogo={setShowLogo}
            hard={hard}
            setHard={setHard}
            allTeams={props.allTeams}
            setAllTeams={props.setAllTeams}
          ></Settings>
        )}
        {showHelp && <Help setShowHelp={setShowHelp}></Help>}
        {showStats && <Stats setShowStats={setShowStats} games={games}></Stats>}
      </header>
    </>
  );
};

export default Header;
