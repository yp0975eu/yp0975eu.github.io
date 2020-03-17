const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const paddleHight = 10
const paddleWidth = 75
let paddleX = (canvas.width - paddleWidth) / 2
const brickRowCount = 25
const brickColumnCount = 15
const brickHeight = 10
const brickPadding = 10
const brickOffsetTop = 5
const brickOffsetLeft = brickPadding / 2
let brickWidth = (canvas.width / brickColumnCount - brickPadding )
let drop = 0
let bricks = []

for (let column = 0; column < brickColumnCount; column++) {
  bricks[column] = []
  for (let row = 0; row < brickRowCount; row++) {
    bricks[column][row] = { x: 0, y: 0, status: 1 }
  }
}
setInterval(() => { drop += 10 }, 100000)

const collisionDetection = () => {
  let b
  for (let column = 0; column < brickColumnCount; column++) {
    for (let row = 0; row < brickRowCount; row++) {
      b = bricks[column][row]
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0
        }
      }
    }
  }
}

const drawBricks = (fall) => {
  for (let column = 0; column < brickColumnCount; column++) {
    for (let row = 0; row < brickRowCount; row++) {
      if (bricks[column][row].status === 1) {
        ctx.beginPath()
        let brickX = (column * (brickWidth + brickPadding) + brickOffsetLeft)
        let brickY = (row * (brickHeight + brickOffsetTop) + brickOffsetTop + fall)
        bricks[column][row].x = brickX
        bricks[column][row].y = brickY
        ctx.rect(brickX, brickY, brickWidth, brickHeight)
        ctx.fill()
        ctx.closePath()
      }
    }
  }
}
const drawPaddle = (x) => {
  ctx.beginPath()
  ctx.rect(paddleX, canvas.height - paddleHight, paddleWidth, paddleHight)
  ctx.fillStyle = '#000000'
  ctx.fill()
  ctx.closePath()
}

const ballRadius = 10
const circle = (x, y) => {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
  ctx.fillStyle = 'rgb(255, 0, 255, 1)'
  ctx.fill()
  ctx.closePath()
}

let leftKeyPressed = false
let rightKeyPressed = false

const keyDownHandler = function (event) {
  if (event.key === 'Left' || event.key === 'ArrowLeft') {
    leftKeyPressed = true
  }
  if (event.key === 'Right' || event.key === 'ArrowRight') {
    rightKeyPressed = true
  }
}

const keyUpHandler = function (event) {

  if (event.key === 'Left' || event.key === 'ArrowLeft') {
    leftKeyPressed = false
  }
  if (event.key === 'Right' || event.key === 'ArrowRight') {
    rightKeyPressed = false
  }
}
document.addEventListener('keydown', keyDownHandler)
document.addEventListener('keyup', keyUpHandler)

let x = canvas.width / 2
let y = canvas.height / 2
let dx = 2
let dy = -2


let raf

const draw = () => {
  raf = requestAnimationFrame(draw)
  ctx.fillStyle = 'rgba(255, 255, 255, .10)'
  ctx.fillRect(0, 0, canvas.height, canvas.width)
  circle(x, y)
  if (rightKeyPressed) {
    paddleX += 7
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth
    }
  } else if (leftKeyPressed) {
    paddleX -= 7
    if (paddleX < 0) {
      paddleX = 0
    }
  }
  drawPaddle()

  drawBricks(drop)
  collisionDetection()
  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx
  }
  x += dx
  // if position y is smaller than ball radius on top edge
  // bounce opposite direction
  if (y + dy < ballRadius) {
    dy = -dy
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      if (leftKeyPressed) {
        dx = dx - 2
      } else if (rightKeyPressed) {
        dx = dx + 2
      }
      dy = -dy
    } else {
      alert('game over')
      document.location.reload()
      cancelAnimationFrame(raf)
    }
  }
  y += dy
}

requestAnimationFrame(draw)
