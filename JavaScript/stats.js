function updateStats() {
    const table = document.getElementById("stats");
    table.row[2].cell[1] = localStorage.getItem("plays");
    table.row[2].cell[2] = localStorage.getItem("wins");
};

function updateScores() {
    const table = document.getElementById("highscores");
    table.row[2].cell[2] = localStorage.getItem("score1");
    table.row[2].cell[3] = localStorage.getItem("date1");
    table.row[3].cell[2] = localStorage.getItem("score2");
    table.row[3].cell[3] = localStorage.getItem("date2");
    table.row[4].cell[2] = localStorage.getItem("score3");
    table.row[4].cell[3] = localStorage.getItem("date3");
};