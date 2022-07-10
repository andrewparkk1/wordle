import { useEffect, useState } from 'react';
import './App.css';

const API = "https://enigmatic-plateau-37317.herokuapp.com/https://api.frontendexpert.io/api/fe/wordle-words";
const WORD_LENGTH = 5;

function App() {
  const [guesses, setGuesses] = useState(Array(6).fill(null))
  const [solution, setSolution] = useState('')
  const [results, setResults] = useState('')

  useEffect(() => {
    const fetchWord = async () => {
      const res = await fetch(API)
      const words = await res.json();
      const word = words[Math.floor(Math.random() * words.length)]
      setSolution(word)
    };
    fetchWord()
  }, [])

  //finish game
  useEffect(() => {
    //get it correct
    if (guesses.includes(solution)) {
      setResults("You have won. Good job. ")
      return
    }

    //last try
    if (guesses[5] !== null) {
      setResults("Game is over. The correct word was " + solution)
    }
    console.log(solution)
    
  }, [guesses])


  const handleSubmit = (e) => {
    e.preventDefault()
    const guess = e.target.guess.value.toUpperCase();

    let i = 0;
    while (guesses[i] !== null) {
      i++;
    }
    setGuesses(oldGuesses => {
      oldGuesses[i] = guess;
      return [...oldGuesses]
    })
    e.target.guess.value = ''
  }

  return (
    <div className="board">
      <h1 className='results'>{results}</h1>

      {guesses.map(guess => {
        return (<Line guess={guess ?? ''} solution={solution}></Line>)
      })}

      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="guess" />
          <button type='submit'>Submit</button>
        </form>
      </div>


    </div>
  );
}

function Line({ guess, solution }) {
  const arr = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === solution[i]) {
      arr.push(<div key={i} className='tile green'>{guess[i]}</div>)
      continue;
    }

    let added = false;
    for (let j = 0; j < WORD_LENGTH; j++) {
      if (guess[i] === solution[j] && i !== j) {
        arr.push(<div key={i} className='tile yellow'>{guess[i]}</div>)
        added = true;
        break;
      }
    }

    if (!added) {
      arr.push(<div key={i} className='tile'>{guess[i]}</div>)
    }
  }

  return (
    <div className='line'>
      {arr}
    </div>
  )

}




export default App;
