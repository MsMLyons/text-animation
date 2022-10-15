const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

// mouse interaction handler
const mouse = {
    x: null,
    y: null,
    radius: 150
};

window.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
    console.log(mouse.x, mouse.y);
});

ctx.fillStyle = 'cyan';
ctx.font = '30px Roboto';
// text, position & size
ctx.fillText('M', 30, 60);
/* gets image data, scanning from coordinates x & y at position zero, expanding to 100 pixels */
const data = ctx.getImageData(0, 0, 100, 100);

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // holds the size of the particles
        this.size = 3;
        // hold the initial position of the particles
        this.baseX = this.x;
        this.baseY = this.y;
        // determines weight and affects the speed of a particle
        this.density = (Math.random() * 30) + 1;
    }
    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.ard(this.x, this.y, this.size, 0, Math.Pi * 2);
        ctx.closePath();
        ctx.fill();
    }
}