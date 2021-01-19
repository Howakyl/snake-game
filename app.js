let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let scoreDisplay = document.querySelector(".scoreDisplay");
let left = document.querySelector(".left");
let bottom = document.querySelector(".bottom");
let right = document.querySelector(".right");
let up = document.querySelector(".top");


let width = 10;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2 , 1 , 0];
let direction = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;


document.addEventListener("DOMContentLoaded" , function () {
    document.addEventListener("keyup" , control)
    createBoard()
    startGame()
    playAgain.addEventListener("click" , replay);
});


//loop to creat 100 divs for game board
const createBoard = () => {
    popup.style.display = "none";

    for (let i = 0; i < 100; i++) {
        let div = document.createElement("div");
        grid.appendChild(div);
    };
};

// starts game, generates a random apple on any game square, 
const startGame = () => {
    let squares = document.querySelectorAll(".grid div");
    randomApple(squares);
    

    //sets the direction where the snake is going. 1 = RIGHT , -1 = LEFT
    direction = 1;
    scoreDisplay.innerHTML = score;

    //sets time it takes for the snake to move 
    intervalTime = 1000;

    //defines where exactly the snake will be located
    currentSnake = [2, 1, 0];
    currentIndex = 0;

    // for each div the "snake" takes up, adds the class "snake" to game board div
    currentSnake.forEach(index=>squares[index].classList.add("snake"));

    // fires every 1s, taking in the outcome of what direction you input
    interval = setInterval(moveOutcome, intervalTime);
};


// if snake hits itself, ends the game. otherwise, moves snake to new grid spot
const moveOutcome  = () => {
    let squares = document.querySelectorAll(".grid div");
    if (checkForHits(squares)) {
        alert("you died! oh no!");
        popup.style.display = "flex";
        return clearInterval(interval);
    } else {
        moveSnake(squares);
    };
};


// when snake moves, removes last index and adds the direction to the head
// if the snake eats an apple, a "snake" div is added to the head
const moveSnake = (squares) => {
    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0]+direction);

    eatApple(squares, tail);
    squares[currentSnake[0]].classList.add("snake");
};