import React from 'react';
import './stats.css';

export function Stats() {
  const [stats, setStats] = React.useState({});
  const userName = localStorage.getItem('userName');

  React.useEffect(() => {
      fetch(`/api/stats/${userName}`)
        .then((response) => response.json())
        .then((stats) => {
          setStats(stats);
          localStorage.setItem('stats', JSON.stringify(stats));
      })
      .catch(() => {
        const statsText = localStorage.getItem('stats');
        if (statsText) {
          setStats(JSON.parse(statsText));
        }
      });
    }, []);

  return (
    <main className="container-fluid justify-content-start align-items-center mt-2 pt-4">
      <h2 id="user" className="text-center m-4 p-4">{ stats.username }'s Stats</h2>
      <table className="table table-responsive text-center mb-4" id="stats">
        <thead>
          <tr>
            <th>Plays</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td id="plays">{ stats.plays }</td>
            <td id="wins">{ stats.wins }</td>
          </tr>
        </tbody>
      </table>
      <table className="table table-responsive text-center mt-4" id="highscores">
        <thead>
          <tr>
            <th>#</th>
            <th>Score</th>
          </tr>
        </thead>
          <tbody>
            <tr>
                <td>1</td>
                <td id="score1">{ stats.scores?.[0] }</td>
            </tr>
            <tr>
              <td>2</td>
              <td id="score2">{ stats.scores?.[1] }</td>
            </tr>
            <tr>
              <td>3</td>
              <td id="score3">{ stats.scores?.[2] }</td>
            </tr>
          </tbody>
      </table>
    </main>
  );  
}