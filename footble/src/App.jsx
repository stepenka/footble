import React, { useEffect, useState } from "react";
import { Header } from "./components";
import json from "./data/db.json";

const App = () => {
  const [solution, setSolution] = useState(null);
  const [teams, setTeams] = useState(null);

  useEffect(() => {
    const teamData = json.teams;
    const randomSolution =
      teamData[Math.floor(Math.random() * teamData.length)];
    setSolution(randomSolution);
    setTeams(teamData);
  }, [setSolution]);

  const pickAgain = () => {
    let randomSolution = teams[Math.floor(Math.random() * teams.length)];
    while (randomSolution === solution) {
      randomSolution = teams[Math.floor(Math.random() * teams.length)];
    }
    setSolution(randomSolution);
  };

  return (
    <>
      {solution && (
        <Header solution={solution} json={teams} pickAgain={pickAgain} />
      )}
    </>
  );
};

export default App;
