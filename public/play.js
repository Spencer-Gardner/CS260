"use strict";

const playButton = document.getElementById("play");
let active = false;

const timerElement = document.getElementById("timer");
let minutes = 3;
let seconds = 0;
let timerInterval;

const display = document.getElementById("word");
let word = display.innerText.split(' ');


// GAME...
class Game {
    extra1;
    extra2;
    list;
    score;

    constructor() {
        this.extra1 = undefined;
        this.extra2 = undefined;
        this.list = [];
        this.score = 0;
    }

    getLetter(id) {
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
            document.getElementById(id).innerText = letter.letter;
            return letter.letter;
          }
        }         
    }

    setExtras() {
        this.extra1 = setInterval(() => {
            this.getLetter("extra1");
        }, 60 * 1000);
        this.extra2 = setInterval(() => {
            this.getLetter("extra2");
        }, 60 * 1000);
    }
    
    setLetters() {
        this.getLetter("letter1");
        this.getLetter("letter2");
        this.getLetter("letter3");
        this.getLetter("letter4");
        this.getLetter("letter5");
        this.getLetter("extra1");
        this.getLetter("extra2");
    }

    addWord(guess) {
        this.list.push(guess);
    }

    updateScore(guess) {
        switch (guess.length) {
            case 3:
                this.score += 1;
                break;
            case 4:
                this.score += 2;
                break;
            case 5:
                this.score += 3;
                break;
            case 6:
                this.score += 4;
                break;
            case 7:
                this.score += 5;
                break;
        }
        document.getElementById("score").innerText = this.score;
    }
    
    async end() {
        clearInterval(this.extra1);
        clearInterval(this.extra2);
       
        let stats = {};
        try {
            const response = await fetch('/api/stats');
            stats = await response.json();
        } catch {
            console.log("Error");
        }

        let plays = stats.plays;
        plays += 1;     
        localStorage.setItem("plays", plays);
    
        let wins = stats.wins;
        if (this.score > 35) {            
            wins += 1;
            localStorage.setItem("wins", wins);
        }

        let scores = stats.scores;
        if (this.score > scores[2]) {
            if (this.score > scores[1]) {
                if (this.score > scores[0]) {
                    scores[2] = scores[1];
                    localStorage.setItem("score3", scores[1]);
                    scores[1] = scores[0];
                    localStorage.setItem("score2", scores[0]);
                    scores[0] = this.score;
                    localStorage.setItem("score1", this.score);                    
                } else {
                    scores[2] = scores[1];
                    localStorage.setItem("score3", scores[1]);
                    scores[1] = this.score;
                    localStorage.setItem("score2", this.score);                    
                }
            } else {
                scores[2] = this.score;
                localStorage.setItem("score3", this.score);
            }            
        }
        
        const updatedStats = {
            plays,
            wins,
            scores
        };

        try {
            await fetch('/api/stats', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedStats),
              });
        } catch {
            console.log("Error");
        }
    }

    reset() {
        clearInterval(this.extra1);
        clearInterval(this.extra2);
        this.score = 0;
        document.getElementById("score").innerText = "--";
        word = ['_', '_', '_', '_', '_', '_', '_']
        display.innerText = word.join(' ');        
    }
}

const game = new Game();


// PLAY...

function play() {
    if (active === false) {
        active = true;
        playButton.innerText = "Reset";
        startTimer();
        game.reset();
        game.setLetters();
        game.setExtras();        
    } else {
        active = false;      
        playButton.innerText = "Play";
        resetTimer();
        game.reset();       
    }
}


// TIMER...

function startTimer() {
    timerElement.innerText = "03:00";
    minutes = 3;
    seconds = 0;        
    function updateTimer() {
    if (minutes === 0 && seconds === 0) {
        active = false;
        playButton.innerText = "Play";
        clearInterval(timerInterval);        
        game.end();
    } else if (seconds === 0) {
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }   
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerElement.innerText = timeString;
    }
    timerInterval = setInterval(updateTimer, 1000);
}

 function resetTimer() {
    clearInterval(timerInterval);
    timerElement.innerText = "03:00";
    minutes = 3;
    seconds = 0;
}    


// KEYBOARD...

function addLetter(id) {
    if (active === true) {
        const letter = document.getElementById(id).innerText;
        for (let i = 0; i < 7; i++) {
            if (word[i] === '_') {
                word[i] = letter;
                display.innerText = word.join(' ');
                break;
            }
        }
    }
}

function deleteLetter() {
    if (active === true) {
        for (let i = 0; i < 8; i++) {
            if (word[i] === '_' || word[i] === undefined) {
                word[i-1] = '_';
                display.innerText = word.join(' ');
                break;
            }
        }
    }
}

function enterWord() {
    if (active === true) {
        let guess = "";
        for (let i = 0; i < 7; i++) {
            if (word[i] === '_') {
                break;
            }
            guess += word[i];
            word[i] = '_';
        }
        display.innerText = word.join(' ');
        if (guess.length > 2 && !game.list.includes(guess)) {
            console.log("https://api.dictionaryapi.dev/api/v2/entries/en/" + guess)
            fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + guess)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then(data => {
                if (data.title === "No Definitions Found") {
                    console.log("Rejected: " + guess);
                } else {
                    console.log("Accepted: " + guess);
                    game.addWord(guess);
                    game.updateScore(guess);
                }
            })
            .catch(error => {
                console.error('Fetch Error:', error);
            });
        }
    }
}

