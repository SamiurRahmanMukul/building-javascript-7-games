document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const displaySquares = document.querySelectorAll(".previous-grid div");
  const startBtn = document.querySelector("button");
  const scoreDisplay = document.querySelector(".score-display");
  const linesDisplay = document.querySelector(".lines-display");

  let squares = Array.from(grid.querySelectorAll("div"));

  const width = 10;
  const height = 20;

  let currentPosition = 4;
  let currentIndex = 0;
  let timerId;
  let score = 0;
  let lines = 0;

  // assign functions to keyCodes
  function control(e) {
    if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }

  document.addEventListener("keyup", control);

  // the tetrominoes
  const lTetrominoes = [
    [1, width + 1, width + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const zTetrominoes = [
    [0, width, width, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const tTetrominoes = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const oTetrominoes = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iTetrominoes = [
    [1, width + 1, width + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const theTetrominoes = [
    lTetrominoes,
    zTetrominoes,
    tTetrominoes,
    oTetrominoes,
    iTetrominoes,
  ];

  // randomly select tetrominoes
  let random = Math.floor(Math.random() * theTetrominoes.length);
  let currentRotation = 0;
  let current = theTetrominoes[random][currentRotation];

  // draw the shape
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("block");
    });
  }

  // unDraw the shape
  function undDraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("block");
    });
  }

  // move the shape
  function moveDown() {
    undDraw();
    currentPosition = currentPosition += width;
    draw();
    freeze();
  }

  // move left and prevent collections with shapes moving left
  function moveRight() {
    undDraw();
    const isAtRightEdge = current.some(
      (index) => (currentPosition + index) % width === width - 1
    );

    if (!isAtRightEdge) {
      currentPosition += 1;
    }
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains(".block2")
      )
    ) {
      currentPosition -= 1;
    }
    draw();
  }

  function moveLeft() {
    undDraw();
    const isAtLeftEdge = current.some(
      (index) => (currentPosition + index) % width === 0
    );
    if (!isAtLeftEdge) {
      currentPosition -= 1;
    }

    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("block2")
      )
    ) {
      currentPosition += 1;
    }
    draw();
  }

  // rotate tetrominoes
  function rotate() {
    undDraw();
    currentRotation++;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }

    current = theTetrominoes[random][currentRotation];
    draw();
  }
  draw();

  // show previous tetrominoes in displaySquares
  const displayWidth = 4;
  const displayIndex = 0;
  let nextRandom = 0;

  const smallTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2] /* lTetrominoes */,
    [
      0,
      displayWidth + 1,
      displayWidth + 1,
      displayWidth * 2 + 1,
    ] /* zTetrominoes */,
    [1, displayWidth, displayWidth + 1, displayWidth + 2] /* tTetrominoes */,
    [0, 1 + 1, displayWidth, displayWidth + 1] /* oTetrominoes */,
    [
      1,
      displayWidth + 1,
      displayWidth * 2 + 1,
      displayWidth * 3 + 1,
    ] /* iTetrominoes */,
  ];

  function displayShape() {
    displaySquares.forEach((squares) => {
      squares.classList.remove("block");
    });

    smallTetrominoes[nextRandom].forEach((index) => {
      displaySquares[displayIndex + index].classList.add("block");
    });
  }

  // freeze the shape
  function freeze() {
    if (
      current.some(
        (index) =>
          squares[currentPosition + index + width].classList.contains(
            "block3"
          ) ||
          squares[currentPosition + index + width].classList.contains("block2")
      )
    ) {
      current.forEach((index) =>
        squares[index + currentPosition].classList.add("block2")
      );

      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      gameOver();
      addScore();
    }
  }

  startBtn.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, 1000);
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      displayShape();
    }
  });

  // game over
  function gameOver() {
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("block2")
      )
    ) {
      scoreDisplay.innerHTML = "end";
      clearInterval(timerId);
    }
  }

  // add score
  function addScore() {
    for (currentIndex = 0; current < 199; currentIndex += width) {
      const row = [
        currentIndex,
        currentIndex + 1,
        currentIndex + 2,
        currentIndex + 3,
        currentIndex + 4,
        currentIndex + 5,
        currentIndex + 6,
        currentIndex + 7,
        currentIndex + 8,
        currentIndex + 9,
      ];

      if (row.every((index) => squares[index].classList.contains("block2"))) {
        score += 10;
        lines += 1;

        scoreDisplay.innerHTML = score;
        linesDisplay.innerHTML = lines;

        row.forEach((index) => {
          squares[index].classList.remove("block2") ||
            squares[index].classList.remove("block");
        });

        // splice array
        const squaresRemoved = squares.splice(currentIndex, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
      }
    }
  }
});
