import React, { useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';

import './play.css';

export function Game(props) {
    const [status, setStatus] = React.useState(false);
    const [button, setButton] = React.useState('Play');
    const [timerInterval, setTimerInterval] = React.useState(null);
    const [minutes, setMinutes] = React.useState(3);
    const [seconds, setSeconds] = React.useState(0);    
    const [score, setScore] = React.useState(0);    
    const [word, setWord] = React.useState(['_', '_', '_', '_', '_', '_', '_']);
    const [list, setList] = React.useState([]);
    const [extraInterval, setExtraInterval] = React.useState(null);
    const [extraLetters, setExtraLetters] = React.useState(['_', '_']);
    const [mainLetters, setMainLetters] = React.useState(['_', '_', '_', '_', '_', '_', '_']);

    function getLetter() {
        const weightedLetters = [
          { letter: 'A', weight: 10 },
          { letter: 'B', weight: 3 },
          { letter: 'C', weight: 5 },
          { letter: 'D', weight: 6 },
          { letter: 'E', weight: 14 },
          { letter: 'F', weight: 4 },
          { letter: 'G', weight: 4 },
          { letter: 'H', weight: 8 },
          { letter: 'I', weight: 9 },
          { letter: 'J', weight: 2 },
          { letter: 'K', weight: 3 },
          { letter: 'L', weight: 6 },
          { letter: 'M', weight: 5 },
          { letter: 'N', weight: 9 },
          { letter: 'O', weight: 10 },
          { letter: 'P', weight: 4 },
          { letter: 'Q', weight: 2 },
          { letter: 'R', weight: 8 },
          { letter: 'S', weight: 8 },
          { letter: 'T', weight: 11 },
          { letter: 'U', weight: 5 },
          { letter: 'V', weight: 3 },
          { letter: 'W', weight: 4 },
          { letter: 'X', weight: 2 },
          { letter: 'Y', weight: 4 },
          { letter: 'Z', weight: 2 },
        ];
        const totalWeight = weightedLetters.reduce((total, letter) => total + letter.weight, 0);      
        const random = Math.random() * totalWeight;      
        let currentWeight = 0;
        for (const letter of weightedLetters) {
          currentWeight += letter.weight;
          if (random <= currentWeight) {
            return letter.letter;
          }
        }         
    }

    function setLetters() {
        const newLetters = Array.from({ length: 5 }, () => getLetter());
        setMainLetters([...newLetters]);
    }

    function setExtras() {
        let newLetters = Array.from({ length: 2 }, () => getLetter());
        setExtraLetters([...newLetters]);
        setExtraInterval(setInterval(() => {
            newLetters = Array.from({ length: 2 }, () => getLetter());
            setExtraLetters([...newLetters]);
        }, 60 * 1000));
    }

    function addToList(guess) {
        setList(list.concat(guess));
    }

    function updatePoints(guess) {
        switch (guess.length) {
            case 3:
                setScore(prevScore => prevScore + 1);
                break;
            case 4:
                setScore(prevScore => prevScore + 2);
                break;
            case 5:
                setScore(prevScore => prevScore + 3)
                break;
            case 6:
                setScore(prevScore => prevScore + 4);
                break;
            case 7:
                setScore(prevScore => prevScore + 5);
                break;
        }
    }

    async function record() {

        const userName = localStorage.getItem('userName');
       
        let stats = {};
        try {
            const response = await fetch(`/api/stats/${userName}`);
            stats = await response.json();
        } catch {
            console.log('Error');
        }

        let plays = stats.plays;
        plays += 1;
    
        let wins = stats.wins;
        if (score >= 35) {            
            wins += 1;
        }

        let scores = stats.scores;
        if (score > scores[2]) {
            if (score > scores[1]) {
                if (score > scores[0]) {
                    scores[2] = scores[1];
                    scores[1] = scores[0];
                    scores[0] = score;                    
                } else {
                    scores[2] = scores[1];
                    scores[1] = score;                 
                }
            } else {
                scores[2] = score;
            }            
        }
        
        const updatedStats = {
            plays,
            wins,
            scores
        };

        try {
            await fetch(`/api/stats/${userName}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedStats),
              });
        } catch {
            console.log('Error');
        }
    }

    function reset() {        
        resetTimer();
        setScore(0);
        setWord(['_', '_', '_', '_', '_', '_', '_'])
        clearInterval(extraInterval);
        setExtraInterval(null);        
    }

    function play() {
        if (status === false) {
            reset();
            setStatus(true);
            setButton('Reset');
            setExtras();
            setLetters();
            startTimer();
        } else {
            setStatus(false);
            setButton('Play');
            reset();
        }
    }

    React.useEffect(() => {
        if (timerInterval !== null) {
            const interval = setInterval(() => {
                if (minutes === 0 && seconds === 0) {
                    setStatus(false);
                    setButton('Play');
                    clearInterval(timerInterval);
                    setTimerInterval(null);
                    clearInterval(extraInterval);
                    setExtraInterval(null);
                    record();
                } else if (seconds === 0 && minutes > 0) {
                    setMinutes(prevMinutes => prevMinutes - 1);
                    setSeconds(59);
                } else {
                    setSeconds(prevSeconds => prevSeconds - 1);
                }
            }, 1000);
      
            return () => clearInterval(interval);
        }
    }, [timerInterval, minutes, seconds]);

    function startTimer() {
        setMinutes(3);
        setSeconds(0);
        if (timerInterval === null) {
            const intervalId = setInterval(() => {
            setTimerInterval(intervalId);
            }, 1000);
        }
    }

    function resetTimer() {
        if (timerInterval !== null) {
            clearInterval(timerInterval);
            setTimerInterval(null);
        }
        setMinutes(3);
        setSeconds(0);
    }

    function addLetter(letter) {
        if (status === true) {
            let updatedWord = [...word];
            for (let i = 0; i < 7; i++) {
                if (updatedWord[i] === '_') {
                    updatedWord[i] = letter;
                    break;                   
                }
            }
            setWord([...updatedWord]);
        }
    }
    
    function deleteLetter() {
        if (status === true) {
            let updatedWord = [...word];
            for (let i = 0; i < 8; i++) {
                if (updatedWord[i] === '_' || updatedWord[i] === undefined) {
                    updatedWord[i - 1] = '_';
                    break;
                }
            }
            setWord([...updatedWord]);
        }
    }
    
    function enterWord() {
        if (status === true) {
            let guess = '';
            let resetWord = [...word];
            for (let i = 0; i < 7; i++) {
                if (resetWord[i] === '_') {
                    break;
                }
                guess += resetWord[i];
                resetWord[i] = '_';
            }
            setWord([...resetWord]);
            if (guess.length > 2 && !list.includes(guess)) {
                console.log('https://api.dictionaryapi.dev/api/v2/entries/en/' + guess)
                fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + guess)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.title === 'No Definitions Found') {
                        console.log('Rejected: ' + guess);
                    } else {
                        console.log('Accepted: ' + guess);
                        addToList(guess);
                        updatePoints(guess);
                    }
                })
                .catch(error => {
                    console.error('Fetch Error:', error);
                });
            }
        }
    }

    return (
        <main className="container-fluid justify-content-start align-items-center text-center py-5">
            <div className="container-fluid py-3">
                <Button variant="outline-dark" className="mt-4" id="play" onClick={() => play()}>{ button }</Button>
            </div>
            
            <div className="row">
                <div className="col-6 p-3" id="timer-container">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-stopwatch" viewBox="0 0 16 16">
                        <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z"/>
                        <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z"/>
                        </svg>
                    </div>
                    <div id="timer">{ `${minutes.toString().padStart(1, '0')}:${seconds.toString().padStart(2, '0')}` }</div>
                </div>
                <div className="col-6 p-3" id="score-container">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                        </svg>
                    </div>
                    <div id="score">{ score }</div>
                </div>
            </div>         

            <hr style={{width: "75%"}} />

            <div className="container-fluid row pt-4 pb-5">
                <h1 id="word">{ word.join(' ') }</h1>                 
            </div>

            <div className="card border-dark py-4 px-5">
                <div className="container-fluid py-2">
                    <Button variant="outline-dark m-1" id="extra1" onClick={() => addLetter(extraLetters[0])}>{ extraLetters[0] }</Button>
                    <Button variant="outline-dark m-1" id="extra2" onClick={() => addLetter(extraLetters[1])}>{ extraLetters[1] }</Button>
                </div>
            
                <div className="container-fluid pt-2 pb-4">
                    <Button variant="outline-dark m-1" id="letter1" onClick={() => addLetter(mainLetters[0])}>{ mainLetters[0] }</Button>
                    <Button variant="outline-dark m-1" id="letter2" onClick={() => addLetter(mainLetters[1])}>{ mainLetters[1] }</Button>
                    <Button variant="outline-dark m-1" id="letter3" onClick={() => addLetter(mainLetters[2])}>{ mainLetters[2] }</Button>
                    <Button variant="outline-dark m-1" id="letter4" onClick={() => addLetter(mainLetters[3])}>{ mainLetters[3] }</Button>
                    <Button variant="outline-dark m-1" id="letter5" onClick={() => addLetter(mainLetters[4])}>{ mainLetters[4] }</Button>
                </div>
            
                <div className="row">
                    <Button variant="outline-dark col m-2" id="delete" onClick={() => deleteLetter()}>Delete</Button>
                    <Button variant="outline-dark col m-2" id="enter" onClick={() => enterWord()}>Enter</Button>
                </div>
            </div>            
        </main>
    );
}