import React, { useEffect, useState } from "react";
import "./Stats.css";
import { BarChart } from "@mui/x-charts/BarChart";

const Stats = (props) => {
  const closeStats = () => {
    props.setShowStats(false);
  };

  const [easyMap, setEasyMap] = useState({});
  const [hardMap, setHardMap] = useState({});

  const hardGames = props.games.filter((game) => {
    return game.hard ? true : false;
  });

  const easyGames = props.games.filter((game) => {
    return game.hard ? false : true;
  });

  useEffect(() => {
    const easyFreqMap = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    for (const value of easyGames) {
      easyFreqMap[value.turn] = (easyFreqMap[value.turn] ?? 0) + 1;
    }
    setEasyMap(easyFreqMap);

    const hardFreqMap = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    for (const value of hardGames) {
      hardFreqMap[value.turn] = (hardFreqMap[value.turn] ?? 0) + 1;
    }
    setHardMap(hardFreqMap);
  }, [props.games]);

  return (
    <div className="statsOverlay">
      <div className="statsContainer">
        <button className="closeStats" onClick={closeStats}>
          <span className="closeStatsText">Close</span>
        </button>
        <h1>Statistics</h1>
        <BarChart
          borderRadius={10}
          xAxis={[
            {
              id: "barCategories",
              data: ["1", "2", "3", "4", "5", "Losses"],
              label: "Turns",
            },
          ]}
          yAxis={[
            {
              label: "# of Games",
            },
          ]}
          series={[
            {
              data: [
                easyMap[1],
                easyMap[2],
                easyMap[3],
                easyMap[4],
                easyMap[5],
                easyMap[6],
              ],
              label: "With logos",
              color: "#00004b",
            },
            {
              data: [
                hardMap[1],
                hardMap[2],
                hardMap[3],
                hardMap[4],
                hardMap[5],
                hardMap[6],
              ],
              label: "No logos",
              color: "#FFD700",
            },
          ]}
          height={300}
        />
      </div>
    </div>
  );
};

export default Stats;
