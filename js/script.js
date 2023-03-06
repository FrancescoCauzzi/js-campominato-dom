let myContainerEl = document.querySelector(".__my-container");
let difficultyEl = document.getElementById("difficulty");
// console.log(difficultyEl.value);
let playBtnEl = document.getElementById("play-btn");
// console.log(playBtnEl);
let resetBtnEl = document.getElementById("reset");
// console.log(resetBtnEl);
// console.log(myContainerEl);
let finalOutputEl = document.getElementById("final-output");

// FUNZIONI

// function to generate 16 random numbers
function generateSetRandNumb(setSize, n) {
  let myNumSet = new Set();

  while (myNumSet.size < setSize) {
    let uniqueNum = Math.floor(Math.random() * (n ** 2 - 1) + 1);
    myNumSet.add(uniqueNum);
  }
  return myNumSet;
}

// function to add to the cell the class '.__pointer-events-none'
function removeClickFromCSS() {
  let myCells = myContainerEl.querySelectorAll(".__cella");
  for (let i = 0; i < myCells.length; i++) {
    myCells[i].classList.add("__pointer-events-none");
  }
}

// function to generate the grid

function generateSquareGrid(rows, className, type, elementRecevingAppend) {
  let mySet = generateSetRandNumb(16, rows);
  // console.log(mySet);

  let score = 0;
  for (let i = 0; i < rows ** 2; i++) {
    let elementToAppend = document.createElement(type);
    elementToAppend.classList.add(className);
    elementToAppend.style.width = `calc(100% / ${rows})`;
    elementToAppend.style.aspectRatio = `1/1`;
    elementToAppend.innerHTML = `${i + 1}`;
    elementRecevingAppend.append(elementToAppend);

    elementToAppend.addEventListener("click", function () {
      if (!mySet.has(Number(elementToAppend.innerHTML))) {
        elementToAppend.classList.toggle("__blue");
        score++;
      } else {
        elementToAppend.classList.add("__black");
        removeClickFromCSS();
        // qui gestistico l'output dello score
        finalOutputEl.style.display = "block";
        finalOutputEl.innerHTML = `Hai perso, il tuo punteggio è: ${score}. Clicca su reset per poter giocare di nuovo`;
        // console.log("Hai perso, il tuo punteggio è: " + score);
      }
      if (score === rows ** 2 - mySet.size) {
        // console.log("You won");
        removeClickFromCSS();
        // qui gestistico l'output dello score
        finalOutputEl.style.display = "block";
        finalOutputEl.innerHTML = `Hai vinto, il tuo punteggio è: ${
          rows ** 2 - mySet.size
        }. Clicca su reset per poter giocare di nuovo`;
      }
    });
  }
}

function handlePLayClick() {
  // event.preventDefault();
  if (Number(difficultyEl.value) === 1) {
    generateSquareGrid(10, "__cella", "div", myContainerEl);
  } else if (Number(difficultyEl.value) === 2) {
    generateSquareGrid(9, "__cella", "div", myContainerEl);
  } else if (Number(difficultyEl.value) === 3) {
    generateSquareGrid(7, "__cella", "div", myContainerEl);
  }
  playBtnEl.removeEventListener("click", handlePLayClick);
}

function handleResetClick() {
  //event.preventDefault();
  let cellsToRemove = myContainerEl.querySelectorAll(".__cella");
  //console.log(cellsToRemove);

  for (let i = 0; i < cellsToRemove.length; i++) {
    myContainerEl.removeChild(cellsToRemove[i]);
  }
  finalOutputEl.style.display = "none";
  playBtnEl.addEventListener("click", handlePLayClick);
}

// TRIGGERS
playBtnEl.addEventListener("click", handlePLayClick);

resetBtnEl.addEventListener("click", handleResetClick);
