function updateStats() {
    const plays = document.getElementById("plays");
    const wins = document.getElementById("wins");

    plays.textContent = localStorage.getItem("plays");
    wins.textContent = localStorage.getItem("wins");
}

function updateScores() {
    const score1 = document.getElementById("score1");
    const date1 = document.getElementById("date1");
    const score2 = document.getElementById("score2");
    const date2 = document.getElementById("date2");
    const score3 = document.getElementById("score3");
    const date3 = document.getElementById("date3");

    score1.textContent = localStorage.getItem("score1");
    date1.textContent = localStorage.getItem("date1");
    score2.textContent = localStorage.getItem("score2");
    date2.textContent = localStorage.getItem("date2");
    score3.textContent = localStorage.getItem("score3");
    date3.textContent = localStorage.getItem("date3");
};

updateStats();
updateScores();