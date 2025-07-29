const emojis = ["🐶", "🐱", "🦁", "🐷", "🐵", "🐸", "🐤", "🦊"];
let cards = [...emojis, ...emojis];
let flipped = [];
let matched = 0;
let moves = 0;
let seconds = 0;
let timerInterval;

const grid = document.getElementById("grid");
const movesCount = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const restartBtn = document.getElementById("restart");
const resultScreen = document.getElementById("result");
const finalTime = document.getElementById("final-time");
const finalMoves = document.getElementById("final-moves");
const playAgainBtn = document.getElementById("play-again");
const darkToggle = document.getElementById("dark-mode-toggle");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startGame() {
  grid.innerHTML = "";
  flipped = [];
  matched = 0;
  moves = 0;
  seconds = 0;
  movesCount.textContent = 0;
  timerDisplay.textContent = 0;
  resultScreen.classList.add("hidden");
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    seconds++;
    timerDisplay.textContent = seconds;
  }, 1000);

  shuffle(cards);
  cards.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;

    const front = document.createElement("div");
    front.classList.add("front");
    front.textContent = "❓";

    const back = document.createElement("div");
    back.classList.add("back");
    back.textContent = emoji;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", () => flipCard(card));

    grid.appendChild(card);
  });
}

function flipCard(card) {
  if (card.classList.contains("flipped") || flipped.length === 2) return;

  card.classList.add("flipped");
  flipped.push(card);

  if (flipped.length === 2) {
    moves++;
    movesCount.textContent = moves;

    const [card1, card2] = flipped;
    if (card1.dataset.emoji === card2.dataset.emoji) {
      matched += 2;
      flipped = [];

      if (matched === cards.length) {
        clearInterval(timerInterval);
        setTimeout(() => {
          finalTime.textContent = seconds;
          finalMoves.textContent = moves;
          resultScreen.classList.remove("hidden");
        }, 500);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flipped = [];
      }, 800);
    }
  }
}

restartBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", startGame);

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

startGame();
