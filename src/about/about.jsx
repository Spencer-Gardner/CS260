import React from 'react';
import './about.css';

export function About() {
    return (
      <main className="container-fluid justify-content-start align-items-center pt-4">
            <div className="text-center mx-5 pt-5 pb-5 px-5">
                <h1>About</h1>
                <p>
                    Welcome to Wordlock! Wordlock is a simple word game inspired by...
                </p>
            </div>
            <div className="text-center mx-5 px-5">
                <h4>Instructions</h4>
                <p>
                    To begin a game, press the play button found at the top of the play page. Each game begins by 
                    generating seven random letters to be used in forming words. These are displayed in the onscreen
                    keyboard. You will then have a total of 3 minutes to enter as many words as you can.
                    Letters may be used more than once. Each minute, the top two letters of the keyboard will change.
                    Words must contain at least three letters and may not be used more than once.
                    The scoring is as follows: 3 letters = 1 point, 4 letters = 2 points, 5 letters = 3 points,
                    6 letters = 4 points, and 7 letters = 5 points.
                    Scoring over 35 points is considered a "win". 
                    If you would like to stop and/or restart, press the reset button found in place of the play button. 
                </p>
            </div>
        </main>
    );
  }