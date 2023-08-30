// set Mode value
const mv1 = document.getElementById("u1_mode_value");
const mv2 = document.getElementById("u2_mode_value");

// get value through link
const urlParams = new URLSearchParams(window.location.search);
const value = urlParams.get("value");

mv1.innerHTML = value;

mv1.classList.add("puck_value_box");
mv2.classList.add("puck_value_box");

if (mv1.innerHTML === "0") {
  mv2.innerHTML = "X";
  mv1.style.color = "crimson";
  mv2.style.color = "blue";
} else {
  mv2.innerHTML = "0";
  mv2.style.color = "crimson";
  mv1.style.color = "blue";
}

// ********************************************
// ********************************************
// ********************************************

// main logic here
const gameBoard = document.getElementById("gameboard");

let currentPlayer = value === "0" ? "0" : "X";
let gameover = false;

const gameBoxArr = ["", "", "", "", "", "", "", "", ""];

let winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

const info = document.getElementById("info");
let innerBox = document.createElement("div");

// Create the celebration animation element
const celebrationAnimation = document.createElement("div");
celebrationAnimation.id = "celebration-animation";
gameBoard.appendChild(celebrationAnimation);

// this function create a gameBoard design
function gameScreenrender() {
  gameBoxArr.forEach((value, index) => {
    innerBox = document.createElement("div");
    innerBox.classList.add("inner_box");
    innerBox.id = index;
    innerBox.addEventListener("click", innerBoxClickWork);
    gameBoard.appendChild(innerBox); 
  });
}

// when inner box click what to do this function manages this task
function innerBoxClickWork(e) {
  if (gameover) {
    return;
  }
  const SelectedBox = e.target;
  const SelectIndex = SelectedBox.id;

  // This is the logic how we give user to enter X or 0
  if (gameBoxArr[SelectIndex] === "") {
    gameBoxArr[SelectIndex] = currentPlayer;
    if (currentPlayer === "0") {
      // Circle making code
      createCircle(SelectedBox);
    } else {
      // Cross making code
      createCross(SelectedBox);
    }

    // Check win or draw
    if (checkWin(currentPlayer)) {
      info.innerHTML = `User ${currentPlayer} wins!`;
      gameover = true;
      triggerCelebrationAnimation();
    } else if (isBoardFull()) {
      info.innerHTML = `It's a draw!`;
      gameover = true;
    } else {
      // Switch to the next player
      currentPlayer = currentPlayer === "0" ? "X" : "0";
      info.innerHTML = `User ${currentPlayer}'s Turn`;
    }
  }
}

// this function check the winner of the game
function checkWin(player) {
  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (
      gameBoxArr[a] === player &&
      gameBoxArr[b] === player &&
      gameBoxArr[c] === player
    ) {
      // Highlight the winning combination
      highlightWinningCombination(combo);
      return true;
    }
  }
  return false;
}

// Function to highlight the winning combination
function highlightWinningCombination(combination) {
  combination.forEach((index) => {
    const winningBox = document.getElementById(index);
    winningBox.classList.add("winning-box");
  });
}

// Function to trigger the celebration animation
function triggerCelebrationAnimation() {
  celebrationAnimation.classList.add("celebration");
}

// this function check our game board full or not
function isBoardFull() {
  return gameBoxArr.every((box) => box !== "");
}

// this function shows the initial message
function info_message_display() {
  info.innerHTML = `User 1 starts with ${value}'s`;
}

// circle making code
function createCircle(SelectedBox) {
  const circleDiv = document.createElement("div");
  circleDiv.classList.add("circle");
  SelectedBox.appendChild(circleDiv); 
}

// cross making code
function createCross(SelectedBox) {
  const crossDiv = document.createElement("div");
  crossDiv.classList.add("cross");
  SelectedBox.appendChild(crossDiv); 
}

// Call the info_message_display function to set the initial message
info_message_display();

// this is the game render function call
gameScreenrender();

// @rick saha Dev 2k23