let myContainerEl = document.querySelector(".__my-container");
let difficultyEl = document.getElementById("difficulty");
// console.log(difficultyEl.value);
let playBtnEl = document.getElementById("play-btn");
// console.log(playBtnEl);
let resetBtnEl = document.getElementById("reset");
// console.log(resetBtnEl);
// console.log(myContainerEl);

// function to generate the grid
function generateSquareGrid(row, className, type, elementRecevingAppend) {
  for (let i = 0; i < row ** 2; i++) {
    let elementToAppend = document.createElement(type);
    elementToAppend.classList.add(className);
    elementToAppend.style.width = `calc(100% / ${row})`;
    elementToAppend.style.aspectRatio = `1/1`;
    elementToAppend.innerHTML = `${i + 1}`;
    elementRecevingAppend.append(elementToAppend);
    elementToAppend.addEventListener("click", function () {
      console.log(elementToAppend.innerHTML);
      elementToAppend.classList.toggle("__blue");
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

  for (let i = 0; i < cellsToRemove.length; i++) {
    myContainerEl.removeChild(cellsToRemove[i]);
  }
  playBtnEl.addEventListener("click", handlePLayClick);
}

playBtnEl.addEventListener("click", handlePLayClick);

resetBtnEl.addEventListener("click", handleResetClick);
