async function loadScores() {
    try {
        const response = await fetch('/api/stats');
        let stats = await response.json();
        localStorage.setItem("plays", JSON.stringify(stats.plays));
        localStorage.setItem("wins", JSON.stringify(stats.wins));
        localStorage.setItem("score1", JSON.stringify(stats.scores[0]));
        localStorage.setItem("score2", JSON.stringify(stats.scores[1]));
        localStorage.setItem("score3", JSON.stringify(stats.scores[2]));
    } catch {
        console.log("Error");
    }
}

function updateUser() {
    const user = document.getElementById("user");
    user.innerText = localStorage.getItem("username") + "'s Stats";
}

function updateStats() {
    const plays = document.getElementById("plays");
    const wins = document.getElementById("wins");
    plays.innerText = localStorage.getItem("plays");
    wins.innerText = localStorage.getItem("wins");
}

function updateScores() {
    const score1 = document.getElementById("score1");
    const score2 = document.getElementById("score2");
    const score3 = document.getElementById("score3");    
    score1.innerText = localStorage.getItem("score1");
    score2.innerText = localStorage.getItem("score2");
    score3.innerText = localStorage.getItem("score3");
};

loadScores();
updateUser();
updateStats();
updateScores();