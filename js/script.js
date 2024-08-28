// find the canvas in the html
const canvas = document.getElementById('canvas');
// get the 2d drawing context from the canvas which provides methods for drawing shapes and other content
const ctx = canvas.getContext('2d');
// create blank imagedata allows you to update pixel data in bulk instead of one pixel at a time; providing a structure for manipulating pixel data
const imageData = ctx.createImageData(canvas.width, canvas.height);
// extract pixel array from imagedata allowing direct pixel manipulation and access to the alpha channel
const data = imageData.data;
// resize canvas placed in a function so it can be called whenever the window is resized
function resizeCanvas() {
    canvas.width = window.innerWidth;  // Set internal pixel width to match viewport width
    canvas.height = window.innerHeight; // Set internal pixel height to match viewport height
}
//initial resizing of the canvas
resizeCanvas();
//ready for resizing
window.addEventListener('resize',resizeCanvas)

ctx.strokeStyle = 'red';

ctx.beginPath();       // Begin a new path
ctx.moveTo(50, 50);    // Move to the starting point (x, y)
ctx.lineTo(250, 50);   // Draw a line to the ending point (x, y)
ctx.stroke();   

ctx.beginPath();
ctx.moveTo(50, 100);
ctx.lineTo(250, 100);
ctx.stroke();  // Canvas will show another red line

ctx.beginPath();
ctx.moveTo(50, 150);
ctx.lineTo(250, 280);
ctx.stroke();  // Canvas will show a diagonal red line

let x = canvas.width /2
let y = canvas.height /2
const radius = 20;
let dx = 2;
let dy = 2;

// function to update the canvas
function update(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill()
    ctx.closePath()
    
    x+= dx;
    y+= dy;

    if (x+radius > canvas.width || x - radius < 0) {
        dx = -dx
    }
    if (y + radius > canvas.height || y - radius < 0) {
        dy = -dy;
    }
    requestAnimationFrame(update);
}
update();
