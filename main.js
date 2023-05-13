document.querySelector(".welcome span").onclick = () => {
  let name = prompt("What's Your Name ?");
  if (name == null || name == "") {
    document.querySelector(".name span").innerHTML = "UnKnown";
  } else {
    document.querySelector(".name span").innerHTML = name;
  }
  document.querySelector(".welcome").remove();
  document
    .querySelectorAll(".card")
    .forEach((card) => card.classList.add("flipped"));
  setTimeout(() => {
    document
      .querySelectorAll(".card")
      .forEach((card) => card.classList.remove("flipped"));
  }, duration);
};

let duration = 1000;

let cardsContainer = document.querySelector(".game-container");

let cards = Array.from(cardsContainer.children);

let cardsOrder = [...Array(cards.length).keys()];

let orderArr = [];

for (let i = 0; i < cardsOrder.length; i++) {
  orderArr.push(Math.floor(Math.random() * cardsOrder.length));
}

cards.forEach((card, index) => {
  card.style.order = orderArr[index];
  card.addEventListener("click", () => {
    card.classList.add("flipped");
    let flippedCards = cards.filter((flippedCard) =>
      flippedCard.classList.contains("flipped")
    );
    if (flippedCards.length === 2) {
      stopClicking();
      matchedCards(flippedCards[0], flippedCards[1]);
    }
  });
});

function matchedCards(firstCard, secondCard) {
  let worngTries = document.querySelector(".tries span");
  if (firstCard.dataset.social === secondCard.dataset.social) {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    if (document.querySelectorAll(".matched").length === 20) {
      let gameOver = document.createElement("div");
      gameOver.className = "congrat";
      let span = document.createElement("span");
      span.textContent = "Congratulations✨";
      gameOver.appendChild(span);
      document.body.appendChild(gameOver);
      span.onclick = () => {
        window.location.reload();
      };
    }

    document.getElementById("success").play();
  } else {
    worngTries.innerHTML++;
    document.getElementById("fail").play();
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
    }, duration);
  }

  if (worngTries.innerHTML == 10) {
    let gameOver = document.createElement("div");
    gameOver.className = "game-over";
    let span = document.createElement("span");
    span.textContent = "Game Over";
    gameOver.appendChild(span);
    document.body.appendChild(gameOver);
    span.onclick = () => {
      window.location.reload();
    };
  }
}

function stopClicking() {
  cardsContainer.classList.add("stopped");
  setTimeout(() => {
    cardsContainer.classList.remove("stopped");
  }, duration);
}
