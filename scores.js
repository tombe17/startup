function loadScores() {
    let scores = [];

    //const scoresText = localStorage.getItem('scores');
    //console.log(scoresText)

    const obj = { name: localStorage.userName, score: localStorage.score };
    const jObj = JSON.stringify(obj)

    localStorage.setItem("scores", jObj)
    let scoresText = localStorage.getItem("scores")
    console.log(scoresText)
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }
    console.log(scores)
  
    const tableBodyEl = document.querySelector('#scores');
    console.log(scores.length)
    for (const [i, score] of scores.entries()) {
      const positionTdEl = document.createElement('td');
      const nameTdEl = document.createElement('td');
      const scoreTdEl = document.createElement('td');

      positionTdEl.textContent = i + 1;
      nameTdEl.textContent = score.name;
      scoreTdEl.textContent = score.score;

      const rowEl = document.createElement('tr');
      rowEl.appendChild(positionTdEl);
      rowEl.appendChild(nameTdEl);
      rowEl.appendChild(scoreTdEl);

      rowEl.classList.add("score-tr")

      tableBodyEl.appendChild(rowEl);
    }

  }
  
  loadScores();
  