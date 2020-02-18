const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const colorInput = document.getElementById('color')
const sizeSlider = document.getElementById('size')
const circle = document.getElementById('circle')
const square = document.getElementById('square')
const clear = document.getElementById('clear')


clear.addEventListener('click', function(){
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.height, canvas.width)
})

canvas.addEventListener('mousedown', function() {
  mouseDown = true
})

canvas.addEventListener('mouseup', function() {
  mouseDown = false
})

canvas.addEventListener('mousemove', draw)

colorInput.addEventListener('change', setColor)

sizeSlider.addEventListener('change', setSize)

circle.addEventListener('click', function() {
  setShape('circle')
})

square.addEventListener('click', function() {
  setShape('square')
})


// defaults
let drawColor =  '#000000'
let size = 10
let mouseDown = false
let shape = 'square'

function setShape(selectedShape) {
  shape = selectedShape
}

function setColor (event) {
    drawColor = event.target.value
}

function setSize(event) {
  size = event.target.value
}


function draw(event) {
  if (!mouseDown) { return }
  let shapeToDraw = shape === 'circle' ? drawCircle : drawSquare
  shapeToDraw(event)
}
function drawCircle(event) {
  ctx.fillStyle = drawColor
  let x = event.offsetX
  let y = event.offsetY
  ctx.beginPath(0)
  ctx.arc(x, y, size, 0, 2 * Math.PI)
  ctx.fill()
}
function drawSquare(event) {
  ctx.fillStyle = drawColor
  let x = event.offsetX
  let y = event.offsetY
  let middle = size / 2
  ctx.fillRect(x-middle, y-middle, size, size)
}