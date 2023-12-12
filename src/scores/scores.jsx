import React from 'react';
import './scores.css';

export function Scores() {
  const [scores, setScores] = React.useState([]);

  //useEffect will be done when it renders called async
  React.useEffect(() => {
    fetch('/api/scores')
      .then((response) => response.json())
      .then((scores) => {
        setScores(scores);
        localStorage.setItem('scores', JSON.stringify(scores));
      })
      .catch(() => {  //if it fails to fetch then see if in local storage and upload
        console.log("Error loading scores...")
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
          setScores(JSON.parse(scoresText));
        }
      });
  }, []);

  //render an array w/ react
  const scoreRows = [];
  if (scores.length) {
    for (const [i, score] of scores.entries()) {
      scoreRows.push(
        <tr key={i} className='score-tr'>
          <td>{i}</td>
          <td>{score.name.split('@')[0]}</td>
          <td>{score.score}</td>
        </tr>
      );
    }
  } else {
    scoreRows.push(
      <tr key='0'>
        <td colSpan='4'>Be the first to Score</td>
      </tr>
    )
  }

  return (
    <main>
      <table className="score-tbl">
        <thead>
          <tr className="score-tr">
            <td className="score-hd">#</td>
            <td className="score-hd">Name</td>
            <td className="score-hd">Words Guessed</td>
          </tr>
        </thead>
        <tbody id="scores">{scoreRows}
        </tbody>
      </table>
    </main>
  );
}