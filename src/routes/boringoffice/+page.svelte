<script lang="ts">
  import { onMount } from "svelte";
  import { beforeNavigate } from "$app/navigation";
  import { Modal } from "@grampro/svelte-block";
  import { initializeApp } from "firebase/app";
  import "firebase/firestore";
  import { getFirestore } from "firebase/firestore";
  import { doc, setDoc, getDocs, collection } from "firebase/firestore";

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGESENDERID,
    appId: import.meta.env.VITE_APPID,
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  async function handleSubmit(name: string, score: number) {
    try {
      const scoresCollectionRef = doc(db, "scores", name);
      await setDoc(scoresCollectionRef, { score: score });
      showModal = false;
      getScore();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  let scoresArray: any[] = [];

  async function getScore() {
    try {
      const querySnapshot = await getDocs(collection(db, "scores"));
      const tempArray: any[] = [];
      querySnapshot.forEach((doc) => {
        const name = doc.id;
        const { score } = doc.data();
        tempArray.push({ name, score });
        scoresArray = tempArray;
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  let error: boolean = false;
  let score: number = 0;
  let showModal: boolean = false;
  let name: string = "";

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
    getScore();
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
      score++; // Increment score when snake eats the apple
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
    snakeX = (snakeX + speedX * blockSize + board.width) % board.width;
    snakeY = (snakeY + speedY * blockSize + board.height) % board.height;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
      context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    for (let i = 0; i < snakeBody.length; i++) {
      if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
        // Snake eats own body
        gameOver = true;
        showModal = true;
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
    score = 0; // Reset score when starting again
  }
</script>

<div class="overflow-y-hidden">
  {#if error}
    <div class="max-sm:hidden">
      <img src="/file.png" alt="error" class="w-20 h-20 m-0 mt-12" />
      <div>Unlock to access</div>
      <div class="text-xs">
        <p>Hint to unlock</p>
        <p>
          1. One of the components' values holds the key to unlock this content.<br
          />
          2. Find the value and set it to unlock.
        </p>
      </div>
    </div>
  {:else}
    <div class="max-sm:hidden">
      <div class="text-4xl font-bold mb-8">Bored of Office? Play Some Game</div>
      <div class="lg:flex gap-4">
        <div>
          <div class="scoreboard">Score: {score}</div>
          <canvas id="board" class=""></canvas>
          {#if gameOver}
            <button on:click={startAgain}>Start Again</button>
          {/if}
          <div>Click on Arrow Keys to Start</div>
        </div>
        <div>
          {#if scoresArray.length > 0}
            <div class="mt-4">Top Score</div>
            <div>
              {#if scoresArray.length > 0}
                <div>
                  {#each scoresArray.sort((a, b) => b.score - a.score) as score}
                    <div>{score.name}: {score.score}</div>
                  {/each}
                </div>
              {/if}
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}

  <div
    class="md:hidden flex flex-col justify-center items-center text-sm text-center gap-4"
  >
    <img src="/file.png" alt="error" class="w-20 h-20 m-0 mt-12" />
    <span>Sorry!!<br /> This page can't be viewed on a mobile device</span>
  </div>
</div>

<Modal bind:showModal autoclose modalTitle="Game Over !! Set Your Record Buddy">
  <div>
    <span>Your Score is : {score}</span>
    <form action="" class="flex flex-col gap-4">
      <label for="emp_code">Enter Your Name: </label>
      <input
        type="text"
        class="rounded-lg w-80"
        id="emp_code"
        placeholder="Your Name"
        required
        bind:value={name}
      />
      <button
        type="submit"
        class="bg-blue-400 text-white py-2 rounded-lg w-80"
        on:click={() => {
          handleSubmit(name, score);
        }}>Submit</button
      >
    </form>
  </div>
</Modal>
