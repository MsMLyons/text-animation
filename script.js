const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];


// handle mouse events
const mouse = {
    x: null,
    y: null,
    radius: 125
}

// handle mouse input
window.addEventListener('mousemove', function(e) {
    mouse.x = e.x;
    mouse.y = e.y;        
})

ctx.fillStyle = 'cyan';
ctx.font = '30px Roboto';
// text, x & y coordinates for text location
ctx.fillText('M', 30, 50);
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
        // particle weight and speed - higher numbers make particles move faster
        this.density = (Math.random() * 40) + 5;
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
        // variables that effect the movement of particles near the mouse
        // multiply the variables to make the movement faster
        let forceDirectionX = dx / distance * 3;
        let forceDirectionY = dy / distance * 3;
        // set distance past which particle movement speed is zero
        let maxDistance = mouse.radius;
        // calculation to take any range of numbers and convert to range between 0 and 1
        // will slow particles down as they reach the outer limits of the radius
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        // can change values to manipulate size and distance
        // to attract particles to mouse, use +=, to repulse, use -=
        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            // return particles to original position
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                // control the speed at which the particles return to their original position
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
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