import { useState } from "react";

const useFootble = (solution, json) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(5)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [games, setGames] = useState([]);

  const provideFeedback = () => {
    let match = null;
    json.forEach((team) => {
      if (team.name === currentGuess) {
        match = team;
      }
    });
    return match;
  };

  const addNewGuess = (formattedGuess) => {
    if (formattedGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setCurrentGuess("");
  };

  const submitGuess = () => {
    if (turn > 4) {
      return;
    }
    if (history.includes(currentGuess)) {
      console.log("Already guessed that");
      return;
    }
    const formattedGuess = provideFeedback();
    addNewGuess(formattedGuess);
  };

  const storeData = () => {
    setGames((prevGames) => {
      return [...prevGames, turn];
    });
  };

  const reset = () => {
    storeData();
    setGuesses([...Array(5)]);
    setHistory([]);
    setCurrentGuess("");
    setTurn(0);
    setIsCorrect(false);
  };

  return {
    turn,
    currentGuess,
    setCurrentGuess,
    guesses,
    isCorrect,
    submitGuess,
    reset,
    games,
    setTurn,
  };
};

export default useFootble;
