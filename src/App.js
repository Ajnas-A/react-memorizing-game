import React, { useState, useEffect, useRef } from 'react';
import Counter from './Components/Counter';
import _ from 'lodash';
import './style.css';

export default function App() {
  const [score, setScore] = useState(0);
  const [initialArray, setInitialArray] = useState([]);
  const [round, setRound] = useState(0);
  const [clickCounter, setClickCounter] = useState(0);
  const [complete, setComplete] = useState(false);
  const [event, setEvent] = useState([]);
  const newArray = [1, 2, 4, 4, 5, 6, 7, 8, 9];

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const removeColor = async (arr) => {
    let newArr = [...arr];
    let tile = newArr.shift();
    while (tile) {
      await timeout(300);
      tile.classList.add('bg-red-500');
      tile = newArr.shift();
    }
    return null;
  };

  const handleStartClick = async (e, k) => {
    if (!clickCounter > 10) return;

    if (round > 0 && clickCounter < round) {
      e.target.classList.add('bg-red-500');
      await timeout(500);
      e.target.classList.remove('bg-red-500');
      setClickCounter(clickCounter + 1);
      setEvent([...event, e.target.getAttribute('id')]);
    }
  };

  const resetGame = (para) => {
    if (para === 'button') {
      setRound(0);
      setComplete(false);
    }

    setScore(0);
    setInitialArray([]);
    setClickCounter(0);
    setEvent([]);
  };

  const lightUpSquare = async (square) => {
    const doc = document.getElementById(square);
    doc.classList.add('bg-red-500');
    await timeout(500);
    doc.classList.remove('bg-red-500');
  };

  const startRound = async (round) => {
    let i = 0;
    let arr = [];
    while (i < round) {
      let random = (Math.ceil(Math.random(i + 1) * 9) - 1).toString();
      arr.push(random);
      i++;
    }
    setInitialArray(arr);
  };

  useEffect(() => {
    if (event.length === 0) return;

    if (event.length === initialArray.length) {
      if (_.isEqual(event, initialArray)) {
        setScore(score + 1);
        setInitialArray([]);
        setRound(round + 1);
        setClickCounter(0);
        setEvent([]);
      }
      return;
    }

    let temp = initialArray.slice(0, clickCounter);
    if (!_.isEqual(event, temp)) {
      setComplete(true);
      resetGame('failed');
    }
  }, [event]);

  useEffect(() => {
    if (round !== initialArray.length) return;
    const funct = async () => {
      for (let i of initialArray) {
        await timeout(500);
        lightUpSquare(i);
        await timeout(500);
      }
    };
    funct();
  }, [initialArray]);

  useEffect(() => {
    if (round !== 0) startRound(round);
  }, [round]);

  const handleButtonClick = () => {
    if (round >= 3) return setComplete(true);
    setRound(round + 1);
  };

  return (
    <div className="flex flex-col space-y-3 p-2">
      <div className="grid grid-cols-3 w-full">
        {newArray.map((e, key) => {
          return (
            <div
              onClick={(e) => handleStartClick(e, key)}
              key={key}
              id={key}
              className={`h-20 w-20 w-full border`}
            ></div>
          );
        })}
      </div>

      <button
        onClick={() => {
          handleButtonClick();
        }}
        className="bg-green-300 p-2 rounded mt-5 flex items-center justify-center w-full"
      >
        Start
      </button>
      <button
        className="bg-red-500 w-full p-2 rounded"
        onClick={() => {
          resetGame('button');
        }}
      >
        Reset
      </button>

      {complete && (
        <div>
          <h1>Game over score below</h1>
        </div>
      )}

      <h1>
        Round = {round} / clicks = {clickCounter}
      </h1>

      <p className="flex items-center justify-center mt-5">{score}</p>

     
    </div>
  );
}
