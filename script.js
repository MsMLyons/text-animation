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
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.Pi * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        // create distance between mouse and particle positions
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 300) {
            this.size = 20;
        } else {
            this.size = 3;
        }
    }
}

// create new particle arrays
function init() {
    // initialize with an empty array
    particleArray = [];
    //use for loop to automate creation of particles
    for (let i = 0; i < 1000; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particleArray.push(new Particle(x, y));
    }    
}
init();
console.log(particleArray);

// create animation
function animate() {
    // clear the frame between animations
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // iterate through array and call draw method
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
}
animate();