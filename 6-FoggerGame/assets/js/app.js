document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  const timeLeft = document.querySelector("#time-left");
  const result = document.querySelector("#result");
  const startBtn = document.querySelector("#button");

  const carsLeft = document.querySelectorAll(".car-left");
  const carsRight = document.querySelectorAll(".car-right");
  const logsLeft = document.querySelectorAll(".log-left");
  const logsRight = document.querySelectorAll(".log-right");

  const width = 9;
  let currentIndex = 76;
  let currentTime = 20;
  let timerId;

  // render frog on starting block
  squares[currentIndex].classList.add("frog");

  // write a function that will move the frog
  function moveFrog(e) {
    squares[currentIndex].classList.remove("frog");

    switch (e.keyCode) {
      case 37: {
        if (currentIndex % width !== 0) {
          currentIndex -= 1;
        }
        break;
      }
      case 38: {
        if (currentIndex - width >= 0) {
          currentIndex -= width;
        }
        break;
      }
      case 39: {
        if (currentIndex % width < width - 1) {
          currentIndex += 1;
        }
        break;
      }
      case 40: {
        if (currentIndex + width < width * width) {
          currentIndex += width;
          break;
        }
      }
    }

    squares[currentIndex].classList.add("frog");
    lose();
    win();
  }

  // move cars
  function autoMoveCars() {
    carsLeft.forEach((carsLeft) => moveCarsLeft(carsLeft));
    carsRight.forEach((carsRight) => moveCarsRight(carsRight));
  }

  // move the car left on a time loop
  function moveCarsLeft(carsLeft) {
    switch (true) {
      case carsLeft.classList.contains("c1"): {
        carsLeft.classList.remove("c1");
        carsLeft.classList.add("c2");
        break;
      }
      case carsLeft.classList.contains("c2"): {
        carsLeft.classList.remove("c2");
        carsLeft.classList.add("c3");
        break;
      }
      case carsLeft.classList.contains("c3"): {
        carsLeft.classList.remove("c3");
        carsLeft.classList.add("c1");
        break;
      }
    }
  }

  // move the car right on a time loop
  function moveCarsRight(carsRight) {
    switch (true) {
      case carsRight.classList.contains("c1"): {
        carsRight.classList.remove("c1");
        carsRight.classList.add("c2");
        break;
      }
      case carsRight.classList.contains("c2"): {
        carsRight.classList.remove("c2");
        carsRight.classList.add("c3");
        break;
      }
      case carsRight.classList.contains("c3"): {
        carsRight.classList.remove("c3");
        carsRight.classList.add("c1");
        break;
      }
    }
  }

  // move the logs
  function autoMoveLogs() {
    logsLeft.forEach((logsLeft) => moveLogsLeft(logsLeft));
    logsRight.forEach((logsRight) => moveLogsRight(logsRight));
  }

  // move the logs left on a time loop
  function moveLogsLeft(logsLeft) {
    switch (true) {
      case logsLeft.classList.contains("l1"): {
        logsLeft.classList.remove("l1");
        logsLeft.classList.add("l2");
        l;
        break;
      }
      case logsLeft.classList.contains("l2"): {
        logsLeft.classList.remove("l2");
        logsLeft.classList.add("l3");
        break;
      }
      case logsLeft.classList.contains("l3"): {
        logsLeft.classList.remove("l3");
        logsLeft.classList.add("l4");
        break;
      }
      case logsLeft.classList.contains("l4"): {
        logsLeft.classList.remove("l4");
        logsLeft.classList.add("l5");
        break;
      }
      case logsLeft.classList.contains("l5"): {
        logsLeft.classList.remove("l5");
        logsLeft.classList.add("l1");
        break;
      }
    }
  }

  // move the logs right on a time loop
  function moveLogsRight(logsRight) {
    switch (true) {
      case logsRight.classList.contains("l1"): {
        logsRight.classList.remove("l1");
        logsRight.classList.add("l2");
        l;
        break;
      }
      case logsRight.classList.contains("l2"): {
        logsRight.classList.remove("l2");
        logsRight.classList.add("l3");
        break;
      }
      case logsRight.classList.contains("l3"): {
        logsRight.classList.remove("l3");
        logsRight.classList.add("l4");
        break;
      }
      case logsRight.classList.contains("l4"): {
        logsRight.classList.remove("l4");
        logsRight.classList.add("l5");
        break;
      }
      case logsRight.classList.contains("l5"): {
        logsRight.classList.remove("l5");
        logsRight.classList.add("l1");
        break;
      }
    }
  }

  // rules to win Flogger
  function win() {
    if (squares[4].classList.contains("frog")) {
      result.innerHTML = "YOU WIN";
      squares[currentIndex].classList.remove("frog");
      clearInterval(timerId);
      document.removeEventListener("keyup", moveFrog);
    }
  }

  // rules to lose Flogger
  function lose() {
    if (
      currentTime === 0 ||
      squares[currentIndex].classList.contains("c1") ||
      squares[currentIndex].classList.contains("l5") ||
      squares[currentIndex].classList.contains("l4")
    ) {
      result.innerHTML = "YOU LOSE";
      squares[currentIndex].classList.remove("frog");
      clearInterval(timerId);
      document.removeEventListener("keyup", moveFrog);
    }
  }

  // move the frog when its on the log moving left
  function moveWithLogsLeft() {
    if (currentIndex >= 27 && currentIndex < 35) {
      squares[currentIndex].classList.remove("frog");
      currentIndex += 1;
      squares[currentIndex].classList.add("frog");
    }
  }

  // move the frog when its on the log moving right
  function moveWithLogsRight() {
    if (currentIndex > 18 && currentIndex <= 26) {
      squares[currentIndex].classList.remove("frog");
      currentIndex -= 1;
      squares[currentIndex].classList.add("frog");
    }
  }

  // all the functions that move pieces
  function movePieces() {
    currentTime--;
    timeLeft.textContent = currentTime;

    autoMoveCars();
    autoMoveLogs;
    moveWithLogsLeft();
    moveWithLogsRight();
    lose();
  }

  // to start and pause the game
  startBtn.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
    } else {
      timerId = setInterval(movePieces, 1000);
      document.addEventListener("keyup", moveFrog);
    }
  });
});
