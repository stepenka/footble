import React, { useEffect, useState } from "react";
import { Header } from "./components";

const App = () => {
  const [solution, setSolution] = useState(null);
  const [teams, setTeams] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5174/teams")
      .then((res) => res.json())
      .then((json) => {
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        setSolution(randomSolution);
        setTeams(json);
      });
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
