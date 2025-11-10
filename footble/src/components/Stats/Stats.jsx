import React, { useEffect, useState } from "react";
import "./Stats.css";

const Stats = (props) => {
  const closeStats = () => {
    props.setShowStats(false);
  };

  const [map, setMap] = useState({});

  useEffect(() => {
    const freqMap = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    for (const value of props.games) {
      freqMap[value] = (freqMap[value] ?? 0) + 1;
    }
    setMap(freqMap);
  }, [props.games]);

  return (
    <div className="statsOverlay">
      <div className="statsContainer">
        <button className="closeStats" onClick={closeStats}>
          <span className="closeStatsText">Close</span>
        </button>
        <h1>Statistics</h1>
        <h3># of Guesses</h3>
        <p>1: {map[1]}</p>
        <p>2: {map[2]}</p>
        <p>3: {map[3]}</p>
        <p>4: {map[4]}</p>
        <p>5: {map[5]}</p>
        <p>Losses: {map[6]}</p>
      </div>
    </div>
  );
};

export default Stats;
