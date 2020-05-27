// here we gave two variables

var canvas;
var context;

// position should be multiple of 10
// math.random returns a random number between 1 and 0, also returns a number lower than 1
// math.floor returns a random interger 
var foodPos = [
    Math.floor(Math.random() * 100) * 10,
    Math.floor(Math.random() * 60) * 10
];

var snakePos = [100, 50];
var snakeBody = [
    [100, 50],
    [90, 50],
    [80, 50]
];

var direction = "ArrowRight";
var speed;
var block = 10;
var over = false;
var score = 0;
var framesPerSecond = 1000 / 30;

// Execute a JavaScript immediately after a page has been loaded
// The getContext() function is the function that you use to get access to the canvas tags 2D drawing functions
// 2d  is used for drawing shapes, text, images, and other objects

window.onload = () => {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    setInterval(() => {
        drawObjects();
        snakeAnimation();
        eatFood();
    }, framesPerSecond);
    document.addEventListener('keydown', snakeDirection, false);
    document.addEventListener('mousedown', () => {
        if (over) {
            resetGame();
        }
    })
}

function drawObjects() {

    // we create background

    createRectangle(0, 0, canvas.width, canvas.height, 'rgb(40, 40, 40)');

    // we create food

    createRectangle(foodPos[0], foodPos[1], block, block, 'rgb(128, 0, 128)');

    // we create snake render body

    snakeBody.splice(0, 0, [snakePos[0], snakePos[1]])
    for (var i = 0; i < snakeBody.length; i++) {
        var body = snakeBody[i];
        createRectangle(body[0], body[1], block, block, 'rgb(0,255,0)');
    }

    // here we have render score

    context.font = "25px sans-serif";
    context.fillText("Score: " + score, 20, 30);

    if (over) {
        displayMessage("Game Over");
    }

}

// here we determine the snakes direction and create a function snakeDirection, parameter is event

function snakeDirection(event) {
    console.log(snakeBody);
    changeTo = event.key
    console.log("direction: " + direction);
    console.log("changeTo: " + changeTo);
    switch (changeTo) {
        case "ArrowDown":
            if (direction != "ArrowUp") {
                direction = "ArrowDown";
            }
            break;
        case "ArrowUp":
            if (direction != "ArrowDown") {
                direction = "ArrowUp";
            }
            break;
        case "ArrowLeft":
            if (direction != "ArrowRight") {
                direction = "ArrowLeft";
            }
            break;
        case "ArrowRight":
            if (direction != "ArrowLeft") {
                direction = "ArrowRight";
            }
            break;
        default:
            console.log("No matching direction");
            return;
    }
}

// here snake move in given direction and also create a function snakeAnimation

function snakeAnimation() {
    if (over) {
        return;
    }
    console.log(direction);
    switch (direction) {
        case "ArrowDown":
            snakePos[1] += 10;
            break;
        case "ArrowUp":
            snakePos[1] -= 10;
            break;
        case "ArrowLeft":
            snakePos[0] -= 10;
            break;
        case "ArrowRight":
            snakePos[0] += 10;
            break;
        default:
            console.log("Didn't animate");
            return;
    }
    gameOver();
}

// here we check if the snake ate the food

function eatFood() {
    if (snakePos[0] == foodPos[0] && snakePos[1] == foodPos[1]) {
        foodPos = [
            Math.floor(Math.random() * 72) * 10,
            Math.floor(Math.random() * 48) * 10
        ];
        score += 10;
    } else {
        snakeBody.pop()
    }
}

// check for game over scenario means that it describe events, steps, real-world

function gameOver() {
    // if means that specified condition is true and else if means that if the first condition is false
    if (snakePos[0] > canvas.width - 10 || snakePos[0] < 0) {
        over = true;
    } else if (snakePos[1] > canvas.height - 10 || snakePos[1] < 0) {
        over = true;
    }
    // for loops through a block of code a number of times
    for (var i = 3; i < snakeBody.length; i++) {
        var body = snakeBody[i]
        console.log("Body array: " + body);
        console.log("Snake possition: " + snakePos);
        if (snakePos[0] == body[0] && snakePos[1] == body[1]) {
            over = true;
        }
    }
}

// here when we reset the game

function resetGame() {
    foodPos = [
        Math.floor(Math.random() * 72) * 10,
        Math.floor(Math.random() * 48) * 10
    ];
    snakePos = [100, 50];
    snakeBody = [
        [100, 50],
        [90, 50],
        [80, 50]
    ];
    over = false;
    score = 0;
    direction = "ArrowRight";
}

// here should be faster block creation

function createRectangle(posX, posY, width, height, color) {
    context.fillStyle = color;
    context.fillRect(posX, posY, width, height);
}

// when game would be end then it will show the message that end game

function displayMessage(message) {
    context.fillStyle = "rgb(0,255,0)"
    context.font = "50px sans-serif";
    context.fillText(message, 250, 250);
    context.font = "25px sans-serif";
    context.fillText("Click to continue", 275, 300)
}