const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let adjustX = 30; // move text by number of pixels to the right
let adjustY = 12; // move text by number of pixels downwards


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
ctx.font = '25px Roboto';
// text, x & y coordinates for text location
ctx.fillText('Marki', 0, 30);
// gets image data, scanning from coordinates x & y at position zero, expanding to 100 pixels
const textCoordinates = ctx.getImageData(0, 0, 100, 100);

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
                // change the divisor value to change the speed
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
        }
    }
}
console.log(textCoordinates);

// create new particle arrays
function init() {
    // initialize with an empty array
    particleArray = [];
    // to draw text with particles
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
            // the vlaue 128 represents about 50% opacity of a pixel
            // if pixels are more than 50% opacity, capture location
            /* every fourth (alpha) value in the array represents opacity, 
            while the other 3 represent red, green, blue (rgba) */
            // formula to find fourth value in array brackets
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                // create new particle object
                // values can be adjusted for size and shape of text
                particleArray.push(new Particle(positionX * 10, positionY * 10));
            }
        }
    }    
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
    connect();
    requestAnimationFrame(animate);
}
animate();

// connect particles with lines
function connect() {
    let opacityValue = 1;
    for(let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
            let dx = particleArray[a].x - particleArray[b].x;
            let dy = particleArray[a].y - particleArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 40){
                // keep the distance above and the divisor below the same number
                opacityValue = 0.5 - (distance / 40);
                ctx.strokeStyle = 'rgb(218, 112, 214,' + opacityValue + ')';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
                //ctx.closePath();
            }
        }
    }
}