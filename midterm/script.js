const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const middleX = canvas.height / 2
const middleY = canvas.width / 2
const radius = 800

let active = 0
let numberOfDots = 30
let winningDot = ''
let raf
let dotRadius = 70
let stopped = false
let tries = 10
let direction = 1

function getRandomDot(){
  winningDot = Math.floor(Math.random() * numberOfDots)
}
function drawWinningRing(x, y) {
  ctx.beginPath()
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 3
  ctx.arc(x, y, dotRadius + 10, 0, Math.PI * 2)
  ctx.stroke()
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  let stepAngle = 360 / numberOfDots


  ctx.fillStyle = 'white'
  ctx.shadowBlur = 0 
  ctx.textAlign = 'center'
  ctx.font = '400px sarif'
  ctx.fillText(tries, middleX, middleY)

  active = active + direction === -1 ? numberOfDots : (active + direction) % numberOfDots
  for (var i = 0; i < numberOfDots; i++) {
    var angle = (i * Math.PI / 180) * stepAngle
    var x1 = middleX + Math.cos(angle) * radius
    var y1 = middleY + Math.sin(angle) * radius
    ctx.moveTo(x1, y1)
    
    let color = i * 5

    if (i === active) {
      ctx.beginPath()
      ctx.fillStyle = `hsl(${color}, 100%, 50%)`
      ctx.arc(x1, y1, dotRadius, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = 'black'

    } else {
      ctx.beginPath()
      ctx.fillStyle = `hsl(${color}, 100%, 30%)`
      ctx.arc(x1, y1, dotRadius, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = 'white'

    }

    if (i === winningDot) {
      drawWinningRing(x1, y1)
    }

    ctx.textAlign = 'center'
    ctx.font = '80px serif'
    ctx.fillText(i, x1, y1 + 25)

  }
  raf = requestAnimationFrame(draw)
}



document.addEventListener('keypress', function() {
  if (stopped) {
    direction = -direction
    stopped = false
    raf = requestAnimationFrame(draw)
  } else {
    cancelAnimationFrame(raf)
    stopped = true
    console.log('stopped on ', active)

    if(active === winningDot){
      alert('winner')
      newGame()
    }

    if (tries > 0) {
      tries--
    } else {
      alert('game over')
      newGame()
    }
  }
})

function newGame() {

  tries = 10
  stopped = false
  getRandomDot()
  raf = requestAnimationFrame(draw)
}

newGame()
