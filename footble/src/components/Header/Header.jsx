import React, { useEffect, useState } from "react";
import "./Header.css";
import { squads } from "../../assets";
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
  } = useFootble(props.solution, props.json);

  const [buttonStatus, setButtonStatus] = useState(false);

  const change = (event) => {
    setCurrentGuess(event.target.value);
    searchTeams(event.target.value);

    let inDB = false;
    for (const squad of props.json) {
      if (event.target.value === squad.name) {
        inDB = true;
      }
    }
    if (inDB) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const [showSettings, setShowSettings] = useState(false);
  const [saturation, setSaturation] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const [dbTeams, setDbTeams] = useState([]);

  //   Search the local db and filter to provide auto complete suggestions
  const searchTeams = (searchDb) => {
    // Get matches for current input
    let matches = props.json.filter((team) => {
      const regex = new RegExp(`^${searchDb}`, "gi");
      return team.name.match(regex);
    });

    let aliasMatches = props.json.filter((team) => {
      const regex = new RegExp(`^${searchDb}`, "gi");
      for (const alias of team.aliases) {
        return alias.match(regex);
      }
    });

    matches = new Set([...matches, ...aliasMatches]);

    if (searchDb.length === 0) {
      matches = [];
    }

    setDbTeams([...matches]);
  };

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
              {!saturation ? (
                <img
                  className="displayImage"
                  src={squads[props.solution.id - 1]}
                ></img>
              ) : (
                <img
                  className="displayImageSaturated"
                  src={squads[props.solution.id - 1]}
                ></img>
              )}
            </div>
            {!showModal && (
              <div className="displayGuess">
                <input
                  onChange={change}
                  value={currentGuess}
                  placeholder="Enter a team name"
                  className="guessEntry"
                  id="input"
                  list="matchList"
                ></input>
                <button
                  className="guessButton"
                  onClick={submitGuess}
                  disabled={!buttonStatus}
                >
                  Guess
                </button>
              </div>
            )}
            <datalist id="matchList">
              {dbTeams.map((dbTeam) => (
                <option key={dbTeam.id} value={dbTeam.name}>
                  {dbTeam.name}
                </option>
              ))}
            </datalist>
          </div>
          <Feedback guesses={guesses} solution={props.solution} />
        </div>
        {showModal && (
          <Banner
            isCorrect={isCorrect}
            turn={turn}
            solution={props.solution.name}
            playAgain={playAgain}
          ></Banner>
        )}
        {showSettings && (
          <Settings
            setShowSettings={setShowSettings}
            saturation={saturation}
            setSaturation={setSaturation}
          ></Settings>
        )}
        {showHelp && <Help setShowHelp={setShowHelp}></Help>}
        {showStats && <Stats setShowStats={setShowStats} games={games}></Stats>}
      </header>
    </>
  );
};

export default Header;
