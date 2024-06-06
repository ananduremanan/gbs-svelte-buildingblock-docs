<script lang="ts">
  import { onMount } from "svelte";
  import { beforeNavigate } from "$app/navigation";

  let error: boolean = false;

  function checkIsBoring() {
    const isBoring = localStorage.getItem("isBoring");
    if (isBoring !== "true") {
      error = true;
    } else {
      error = false;
    }
  }

  beforeNavigate(() => {
    localStorage.removeItem("isBoring");
  });

  let blockSize = 25;
  let total_row = 17;
  let total_col = 17;
  let board: any;
  let context: any;

  let snakeX = blockSize * 5;
  let snakeY = blockSize * 5;

  // Set the total number of rows and columns
  let speedX = 0; //speed of snake in x coordinate.
  let speedY = 0; //speed of snake in Y coordinate.

  let snakeBody: any[] = [];

  let foodX: any;
  let foodY: any;

  let gameOver = false;

  onMount(() => {
    checkIsBoring();
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // Set snake speed
    setInterval(update, 1000 / 10);
  });

  function update() {
    if (gameOver) {
      return;
    }

    // Background of a Game
    context.fillStyle = "orange";
    context.fillRect(0, 0, board.width, board.height);

    // Set food color and position
    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
      snakeBody.push([foodX, foodY]);
      placeFood();
    }

    // body of snake will grow
    for (let i = snakeBody.length - 1; i > 0; i--) {
      // it will store previous part of snake to the current part
      snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
      snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "white";
    snakeX = (snakeX + speedX * blockSize + board.width) % board.width; // Calculate new X position and wrap around if necessary
    snakeY = (snakeY + speedY * blockSize + board.height) % board.height; // Calculate new Y position and wrap around if necessary
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
      context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    for (let i = 0; i < snakeBody.length; i++) {
      if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
        // Snake eats own body
        gameOver = true;
      }
    }
  }

  // Movement of the Snake - We are using addEventListener
  function changeDirection(e: any) {
    if (e.code == "ArrowUp" && speedY != 1) {
      // If up arrow key pressed with this condition...
      // snake will not move in the opposite direction
      speedX = 0;
      speedY = -1;
    } else if (e.code == "ArrowDown" && speedY != -1) {
      //If down arrow key pressed
      speedX = 0;
      speedY = 1;
    } else if (e.code == "ArrowLeft" && speedX != 1) {
      //If left arrow key pressed
      speedX = -1;
      speedY = 0;
    } else if (e.code == "ArrowRight" && speedX != -1) {
      //If Right arrow key pressed
      speedX = 1;
      speedY = 0;
    }
  }

  // Randomly place food
  function placeFood() {
    // in x coordinates.
    foodX = Math.floor(Math.random() * total_col) * blockSize;

    //in y coordinates.
    foodY = Math.floor(Math.random() * total_row) * blockSize;
  }

  function startAgain() {
    gameOver = false;
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    speedX = 0;
    speedY = 0;
    snakeBody = [];
    placeFood();
  }
</script>

<div>
  {#if error}
    <div class="max-sm:hidden">
      <img src="/file.png" alt="error" class="w-20 h-20 m-0 mt-12" />
      <div>Unlock to access</div>
      <div class="text-xs">
        <p>Hint to unlock</p>
        <p>
          1. One of the components value is holding the key to unlock this content.<br
          /> 2. Find the value and set it to that value to unlock.
        </p>
      </div>
    </div>
    <div
      class="md:hidden flex flex-col justify-center items-center text-sm text-center gap-4"
    >
      <img src="/file.png" alt="error" class="w-20 h-20 m-0 mt-12" />
      <span>Sorry!!<br /> This page can't be view on a mobile device</span>
    </div>
  {:else}
    <div class="max-sm:hidden">
      <div class="text-4xl font-bold mb-8">Bored of Office? Play Some Game</div>
      <canvas id="board"></canvas>
      {#if gameOver}
        <button on:click={startAgain}>Start Again</button>
      {/if}
      <div>Click on Arrow Keys to Start</div>
    </div>

    <div
      class="md:hidden flex flex-col justify-center items-center text-sm text-center gap-4"
    >
      <img src="/file.png" alt="error" class="w-20 h-20 m-0 mt-12" />
      <span>Sorry!!<br /> This page can't be view on a mobile device</span>
    </div>
  {/if}
</div>
