document.addEventListener("DOMContentLoaded", () => {
  // card options
  const cardArray = [
    {
      name: "facebook",
      img: "./assets/img/facebook_pic.png",
    },
    {
      name: "facebook",
      img: "./assets/img/facebook_pic.png",
    },
    {
      name: "instagram",
      img: "./assets/img/instagram_pic.png",
    },
    {
      name: "instagram",
      img: "./assets/img/instagram_pic.png",
    },
    {
      name: "messenger",
      img: "./assets/img/messenger_icon.png",
    },
    {
      name: "messenger",
      img: "./assets/img/messenger_icon.png",
    },
    {
      name: "twitter",
      img: "./assets/img/twitter_pic.png",
    },
    {
      name: "twitter",
      img: "./assets/img/twitter_pic.png",
    },
    {
      name: "imo",
      img: "./assets/img/imo_icon.png",
    },
    {
      name: "imo",
      img: "./assets/img/imo_icon.png",
    },
    {
      name: "youtube",
      img: "./assets/img/youtube_pic.png",
    },
    {
      name: "youtube",
      img: "./assets/img/youtube_pic.png",
    },
  ];

  // sorting card array randomly
  cardArray.sort(() => 0.5 - Math.random());

  // select element
  const grid = document.querySelector(".grid");
  const resultDisplay = document.getElementById("result");

  var cardChosen = [];
  var cardChosenId = [];
  var cardWin = [];

  // create your board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      var card = document.createElement("img");
      card.setAttribute("src", "./assets/img/qr_home.png");
      card.setAttribute("width", "100px");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);

      grid.appendChild(card);
    }
  }

  // check for match
  function checkForMath() {
    var cards = document.querySelectorAll("img");

    const optionOneId = cardChosenId[0];
    const optionTwoId = cardChosenId[1];

    if (cardChosen[0] === cardChosen[1]) {
      alert("Oh! You a match found.");
      cards[optionOneId].setAttribute("src", "./assets/img/like_icon.png");
      cards[optionTwoId].setAttribute("src", "./assets/img/like_icon.png");
      cardWin.push(cardChosen);
    } else {
      try {
        cards[optionOneId].setAttribute("src", "./assets/img/qr_home.png");
        cards[optionTwoId].setAttribute("src", "./assets/img/qr_home.png");
      } catch (e) {
        console.log(e);
      }

      alert("Sorry! No match. Try again.");
    }

    cardChosen = [];
    cardChosenId = [];

    resultDisplay.textContent = cardWin.length;
    if (cardWin.length === cardArray.length / 2) {
      resultDisplay.textContent = "Congratulation! You found them all.";
    }
  }

  // flip your card
  function flipCard() {
    var cardId = this.getAttribute("data-id");
    cardChosen.push(cardArray[cardId].name);
    cardChosenId.push(cardId);

    this.setAttribute("src", cardArray[cardId].img);
    if (cardChosen.length === 2) {
      setTimeout(checkForMath, 500);
    }
  }

  createBoard();
});
