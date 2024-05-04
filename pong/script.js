const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

function drawPaddle(x, y) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall() {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI*2);
    ctx.fill();
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Wall collision (top/bottom)
    if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Paddle collision
    if (ballX - ballSize < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    } else if (ballX + ballSize > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Reset ball when it goes past paddle
    if (ballX < 0 || ballX > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(0, leftPaddleY);
    drawPaddle(canvas.width - paddleWidth, rightPaddleY);
    drawBall();
    moveBall();
    requestAnimationFrame(update);
}

document.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 87: // 'W' key
            leftPaddleY -= 20;
            if (leftPaddleY < 0) leftPaddleY = 0;
            break;
        case 83: // 'S' key
            leftPaddleY += 20;
            if (leftPaddleY + paddleHeight > canvas.height) leftPaddleY = canvas.height - paddleHeight;
            break;
        case 38: // Arrow Up
            rightPaddleY -= 20;
            if (rightPaddleY < 0) rightPaddleY = 0;
            break;
        case 40: // Arrow Down
            rightPaddleY += 20;
            if (rightPaddleY + paddleHeight > canvas.height) rightPaddleY = canvas.height - paddleHeight;
            break;
    }
});

update();