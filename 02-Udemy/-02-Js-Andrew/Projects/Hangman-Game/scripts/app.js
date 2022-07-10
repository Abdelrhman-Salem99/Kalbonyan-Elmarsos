const puzzleEl = document.querySelector("#puzzle");
const guessesEl = document.querySelector("#guesses");
let game1;

window.addEventListener("keypress", function (e) {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess);
  rander();
});

const rander = () => {
  puzzleEl.innerHTML = ``;
  guessesEl.textContent = game1.statusMessage;

  game1.puzzle.split("").forEach((letter) => {
    console.log(letter);
    const letterEl = document.createElement("span");
    letterEl.textContent = letter;
    puzzleEl.appendChild(letterEl);
  });
};

const startGame = async () => {
  const puzzle = await getPuzzle("2");
  game1 = new Hangman(puzzle, 5);
  rander();
};

document.querySelector("#reset").addEventListener("click", startGame);

startGame();

// Making an HTTP request

// getPuzzle("2")
//   .then((puzzle) => {
//     console.log(puzzle);
//   })
//   .catch((err) => {
//     console.log(`Error : ${err}`);
//   });

// getCurrentCountry()
//   .then((country) => {
//     console.log(country.name);
//   })
//   .catch((err) => {
//     console.log(`Error : ${err}`);
//   });
