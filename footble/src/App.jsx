import React, { useEffect, useState } from "react";
import { Header } from "./components";
import json from "./data/db.json";

const App = () => {
  const [solution, setSolution] = useState(null);
  const [teams, setTeams] = useState(null);
  const [allTeams, setAllTeams] = useState(false);
  const [extras, setExtras] = useState(null);
  const [baseDone, setBaseDone] = useState(false);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    const teamData = JSON.parse(JSON.stringify(json.teams));
    const randomSolution =
      teamData[Math.floor(Math.random() * teamData.length)];
    setSolution(randomSolution);
    teamData.splice(teamData.indexOf(randomSolution), 1);
    setTeams(teamData);
    setExtras(JSON.parse(JSON.stringify(json.extras)));
  }, [setSolution]);

  const pickAgain = () => {
    let solutionArray;
    if (allTeams) {
      solutionArray = [...teams, ...extras];
    } else {
      solutionArray = teams;
    }
    let randomSolution =
      solutionArray[Math.floor(Math.random() * solutionArray.length)];
    if (teams.some((team) => team.name === randomSolution.name)) {
      teams.splice(teams.indexOf(randomSolution), 1);
      setTeams(teams);
    } else {
      extras.splice(extras.indexOf(randomSolution), 1);
      setExtras(extras);
      solutionArray.splice(solutionArray.indexOf(randomSolution), 1);
    }
    setSolution(randomSolution);
    if (solutionArray.length == 0 && !allTeams) {
      setBaseDone(true);
    } else if (solutionArray.length == 0 && allTeams) {
      setAllDone(true);
    }
  };

  return (
    <>
      {solution && (
        <Header
          solution={solution}
          json={json.teams}
          extras={json.extras}
          pickAgain={pickAgain}
          allTeams={allTeams}
          setAllTeams={setAllTeams}
          allDone={allDone}
          baseDone={baseDone}
          easyLeft={teams.length}
          hardLeft={extras.length}
        />
      )}
    </>
  );
};

export default App;
