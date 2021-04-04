const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray = [];
const colours = [
  'white',
  'rgba(255, 255, 255, 0.3)',
  'rgba(173, 216, 230, 0.8)',
  'rgba(211, 211, 211, 0.8)'
];

const maxSize = 40;
const minSize = 0;
const mouseRadius = 60;

// mouse position
let mouse = {
  x: null,
  y: null
};

window.addEventListener('mousemove',
  function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
  }
);

// create constructor function for particle
function Particle(x, y, directionX, directionY, size, colour) {
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.colour = colour;
}

// add draw method to particle prototype
Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  ctx.fillStyle = this.colour;
  ctx.fill();
}

// add update method to particle prototype
Particle.prototype.update = function () {
  // 벽 충돌 감지
  if (this.x + this.size > canvas.width || this.x - this.size < 0) {
    this.directionX = -this.directionX;
  }
  if (this.y + this.size > canvas.height || this.y - this.size < 0) {
    this.directionY = -this.directionY;
  }
  // 좌표 변화
  this.x += this.directionX;
  this.y += this.directionY;

  // mouse interactivity
  if (mouse.x - this.x < mouseRadius &&
    mouse.x - this.x > -mouseRadius &&
    mouse.y - this.y < mouseRadius &&
    mouse.y - this.y > -mouseRadius) {
    if (this.size < maxSize) {
      this.size += 20;
    }
  } else if (this.size > minSize) {
    this.size -= 1;
  }

  if (this.size < 0) {
    this.size = 0;
  }
  this.draw();
}

// create particle array
function init() {
  particleArray = [];
  for (let i= 0; i< 1000; i++) {
    let size = 0;
    let x = (Math.random() * (innerWidth - size * 2)) + size;
    let y = (Math.random() * (innerHeight - size * 2)) + size;
    let directionX = (Math.random() * 2) - 1;
    let directionY = (Math.random() * 2) - 1;
    let colour = colours[Math.floor(Math.random() * colours.length)];

    particleArray.push(new Particle(x, y, directionX, directionY, size, colour));
  }
}

// animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for( let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
  }
}

init();
animate();

// resize event
window.addEventListener('resize', 
  function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
  }
)

// remove mouse position periodically
setInterval(function() {
  mouse.x = undefined;
  mouse.y = undefined;
});