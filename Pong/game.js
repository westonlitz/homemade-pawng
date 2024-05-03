

const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

canvas.width = 1200;
canvas.height = 600;

function drawReact (x, y, width, height, color){
  context.fillStyle = color
  context.fillRect(x, y, width, height)
  
}

function drawCircle(x, y, radius, color){
  context.fillStyle = color
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2, false)
  context.closePath()
  context.fill()
}


function drawCircle(context, x, y, radius, color) {
    context.beginPath();              // Starts a new path by emptying the list of sub-paths
    context.arc(x, y, radius, 0, Math.PI * 2, true); // Adds a circle to the path
    context.fillStyle = color;        // Sets the color to fill the circle
    context.fill();                   // Fills the circle with the specified color
}

function drawNet(){
  for(let i = 0; i <= canvas.height; i += 15){
    drawRect(canvas.width / 2 - 1, i, 2, 10, 'purple')
  }
}

const player = {
    x: 10,
    y: canvas.height/2 - 30,
    width: 10,
    height: 60,
    color: 'WHITE',
    score: 0
};

const computer = {
    x: canvas.width - 20,
    y: canvas.height/2 - 30,
    width: 10,
    height: 60,
    color: 'WHITE',
    score: 0
};

const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    speed: 7,
    velocityX: 5,
    velocityY: 5,
    color: 'WHITE'
};

function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Simple collision detection with top and bottom
    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    let playerOrComputer = (ball.x < canvas.width/2) ? player : computer;

    if(collision(ball, playerOrComputer)) {
        // Handle collision (we will write this function next)
    }

    draw();
}

function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

document.addEventListener('keydown', movePaddle);

function movePaddle(event) {
    const key = event.keyCode;
    const upArrow = 38;
    const downArrow = 40;

    if (key === upArrow && player.y > 0) {
        player.y -= 20;
    } else if (key === downArrow && player.y < canvas.height - player.height) {
        player.y += 20;
    }
}

function resetBall() {
  ball.x = canvas.width/2;
  ball.y = canvas.height/2;
  ball.speed = 7;
  ball.velocityX = -ball.velocityX;
}

function draw() {
  drawRect(0, 0, canvas.width, canvas.height, 'BLACK');
  drawNet();
  drawRect(player.x, player.y, player.width, player.height, player.color);
  drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function game() {
  update();
  requestAnimationFrame(game);
}

function gameInit() {
  // Game initialization code here
  drawNet();
  drawRect(0, 0, canvas.width, canvas.height, 'black'); // background
  drawText('Ready to play!', canvas.width / 2, canvas.height / 2, 'white');
}

// Start the game
gameInit();

game();