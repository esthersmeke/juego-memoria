const gridItems = document.querySelectorAll(".grid-item");
let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function checkForMatch() {
  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;
    if (card1.getAttribute("data-color") === card2.getAttribute("data-color")) {
      flippedCards.forEach((card) => {
        card.removeEventListener("click", flipCard);
        card.classList.add("matched");
        matchedCards.push(card);
      });
    }
  }
}

function flipCard() {
  if (!this.classList.contains("matched") && flippedCards.length < 2) {
    this.style.backgroundColor = this.getAttribute("data-color");
    flippedCards.push(this);
    checkForMatch();

    if (flippedCards.length === 2) {
      setTimeout(() => {
        flippedCards.forEach((card) => {
          if (!card.classList.contains("matched")) {
            card.style.backgroundColor = "lightgray";
          }
        });
        flippedCards = [];
      }, 1000);
    }
  }
}

function initializeGame() {
  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "pink",
    "cyan",
    "teal",
    "maroon",
    "navy",
    "lime",
    "indigo",
    "gold",
    "silver",
    "orchid",
  ];
  const shuffledColors = colors.concat(colors);
  shuffle(shuffledColors);

  gridItems.forEach((item, index) => {
    item.addEventListener("click", flipCard);
    item.style.backgroundColor = "lightgray";
    item.setAttribute("data-color", shuffledColors[index]);
    item.classList.remove("matched");
  });
}

initializeGame();
