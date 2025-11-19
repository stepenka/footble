import React, { useEffect, useState } from "react";
import { Header } from "./components";
import json from "./data/db.json";

const App = () => {
  const [solution, setSolution] = useState(null);
  const [teams, setTeams] = useState(null);
  const [allTeams, setAllTeams] = useState(false);

  useEffect(() => {
    const teamData = json.teams;
    const randomSolution =
      teamData[Math.floor(Math.random() * teamData.length)];
    setSolution(randomSolution);
    setTeams(teamData);
  }, [setSolution]);

  const pickAgain = () => {
    let solutionArray;
    if (allTeams) {
      solutionArray = [...teams, ...json.extras];
    } else {
      solutionArray = teams;
    }
    let randomSolution =
      solutionArray[Math.floor(Math.random() * solutionArray.length)];
    // Add logic in to permanently remove teams from db
    while (randomSolution === solution) {
      randomSolution =
        solutionArray[Math.floor(Math.random() * solutionArray.length)];
    }
    setSolution(randomSolution);
  };

  return (
    <>
      {solution && (
        <Header
          solution={solution}
          json={teams}
          extras={json.extras}
          pickAgain={pickAgain}
          allTeams={allTeams}
          setAllTeams={setAllTeams}
        />
      )}
    </>
  );
};

export default App;
