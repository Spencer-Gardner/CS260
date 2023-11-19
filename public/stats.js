'use strict';

const username = localStorage.getItem('username');

async function loadData() {
    let stats = {};
    try {
        const response = await fetch(`/api/stats/${username}`);
        stats = await response.json();
    } catch {
        console.log('Error');
    }
    updateUser();
    updateStats(stats);
    updateScores(stats);
}

function updateUser() {
    const user = document.getElementById('user');
    user.innerText = username + "'s Stats";
}

function updateStats(stats) {
    const plays = document.getElementById('plays');
    const wins = document.getElementById('wins');
    plays.innerText = stats.plays;
    wins.innerText = stats.wins;
}

function updateScores(stats) {
    const score1 = document.getElementById('score1');
    const score2 = document.getElementById('score2');
    const score3 = document.getElementById('score3');    
    score1.innerText = stats.scores[0];
    score2.innerText = stats.scores[1];
    score3.innerText = stats.scores[2];
};

loadData();