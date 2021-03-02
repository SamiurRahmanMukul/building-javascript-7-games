document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  const scoreDisplay = document.querySelector("span");
  const startBtn = document.querySelector(".start");

  const width = 10;
  let currentIndex = 0; // so first div in our grid
  let appleIndex = 0; // so first div in our grid
  let currentSnake = [2, 1, 0]; // so the div in our grid being 2 (or thr HEAD), and 0 being the end (TAIL, with all 1's bring the body from now on)
  let director = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;

  // to start and restart the game
  function startGame() {
    currentSnake.forEach((index) => squares[index].classList.remove("snake"));
    squares[appleIndex].classList.remove("apple");
    clearInterval(interval);
    score = 0;
    randomApple();
    director = 1;
    scoreDisplay.innerText = score;
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutComes, intervalTime);
  }

  // function that deals with ALL the ove outcomes of the snake
  function moveOutComes() {
    // deals with snake hitting border and snake hitting self
    if (
      (currentSnake[0] + width >= width * width && director === width) || // if snake hits bottom
      (currentSnake[0] % width === width - 1 && director === 1) || // if snake hits right wall
      (currentSnake[0] % width === 0 && director === -1) || // if snake hits left wall
      (currentSnake[0] - width < 0 && director === -width) || // if snake hits the top
      squares[currentSnake[0] + director].classList.contains("snake") // if snake goes into it-self
    ) {
      return clearInterval(interval); // this will clear the interval if any of the above happen
    }

    const tail = currentSnake.pop(); // removes that ite of the array and shows it
    squares[tail].classList.remove("snake"); // removes class of snakes from the TAIL
    currentSnake.unshift(currentSnake[0] + director); // gives director to the head of the array

    // deals with snake getting apple
    if (squares[currentSnake[0]].classList.contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      currentSnake.push(tail);
      randomApple();
      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutComes, intervalTime);
    }
    squares[currentSnake[0]].classList.add("snake");
  }

  // generate new apple once apple is eaten
  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));
    {
      // making sure apple
      squares[appleIndex].classList.add("apple");
    }
  }

  // assign functions to keycode
  function control(e) {
    squares[currentIndex].classList.remove("snake"); // we are removing the class of snake from ALL the squares

    if (e.keyCode === 39) {
      director = 1; // if we press the right arrow on our keyboard, the snake will go right one
    } else if (e.keyCode === 38) {
      director = -width; // if we press the up arrow, the snake will go back ten div, appearing to go up
    } else if (e.keyCode === 37) {
      director = -1; // if we press left, the snake will go left one div
    } else if (e.keyCode === 40) {
      director = +width; // if we press down, the snake head instantly appear in the div ten div from where you are now
    }
  }

  document.addEventListener("keyup", control);
  startBtn.addEventListener("click", startGame);
});
