const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];


// handle mouse events
const mouse = {
    x: null,
    y: null,
    radius: 150
}

// handle mouse input
window.addEventListener('mousemove', function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
    console.log(mouse.x, mouse.y);
})

ctx.fillStyle = 'cyan';
ctx.font = '30px Roboto';
// text, x & y coordinates for text location
ctx.fillText('M', 30, 50);
// draw a box around the example text, above
//ctx.strokeStyle = 'purple';
//ctx.strokeRect(0, 0, 100, 100);

// gets image data, scanning from coordinates x & y at position zero, expanding to 100 pixels
const data = ctx.getImageData(0, 0, 100, 100);

class Particle {
    // create particles and initialize particle location
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // pixel size of particle
        this.size = 1.5;
        // base position of each particle
        this.baseX = this.x;
        this.baseY = this.y;
        // particle weight and speed
        this.density = (Math.random() * 30) + 1;
    }
    // draw the particles
    draw() {
        ctx.fillStyle = 'cyan';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        // create distance between mouse and particle positions
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        // can change values to manipulate size and distance
        if (distance < 200) {
            this.size = 5;
        } else {
            this.size = 1.5;
        }
    }
}

// create new particle arrays
function init() {
    // initialize with an empty array
    particleArray = [];
    //use for loop to automate creation of particles
    // can change value in i < 1000 for different effects
    for (let i = 0; i < 1000; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particleArray.push(new Particle(x, y));
    }
    // create individual particles with specific x, y coordinates
    // but better to use the for loop, above 
    //particleArray.push(new Particle(50, 50));
    //particleArray.push(new Particle(80, 70));
}
init();
console.log(particleArray);

// animate particles
function animate(){
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