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

let mouse = {
    x: 0,
    y:0
};

canvas.addEventListener('mousemove', (event) => {
    // Get the canvas position relative to the viewport
    const rect = canvas.getBoundingClientRect();
    
    // Calculate the mouse position relative to the canvas
        mouse.x = event.clientX - rect.left,
        mouse.y = event.clientY - rect.top
    
    
    coords.textContent = `Mouse Coordinates: (${mouse.x}, ${mouse.y})`;
    console.log(mouse.x,mouse.y)
});




function randomNumberBetweenExcludingZero() {
    let x = 0; 
    let y = 0; 
    while (x === 0 && y === 0) {
        x = (Math.random() * 0.6) - 0.3; // Generates between -0.2 and 0.2
        y = (Math.random() * 0.6) - 0.3; // Generates between -0.2 and 0.2
    }
    return [x, y];
}


function createNode(){
    let [dx,dy] = randomNumberBetweenExcludingZero();
    let x = Math.floor(Math.random()*canvas.width-1)
    let y = Math.floor(Math.random()*canvas.height-1)
    return {
        radius: 1,
        dx: dx,
        dy: dy,
        x: x,
        y: y,
        actualX: x,
        actualY: y,

        move: function(){
            this.actualX += this.dx;
            this.actualY += this.dy;
            this.x = Math.floor(this.actualX);
            this.y = Math.floor(this.actualY);
            if (this.x+this.radius >= canvas.width || this.x - this.radius <= 0) {
                this.dx = -this.dx
            }
            if (this.y+this.radius >= canvas.height || this.y - this.radius <= 0) {
                this.dy = -this.dy
            }
        }
    }
}

function distBetweenPoints(obj1, obj2) {
    let num1 = Math.pow(obj1.x - obj2.x, 2); // (x2 - x1)^2
    let num2 = Math.pow(obj1.y - obj2.y, 2); // (y2 - y1)^2
    let distance = Math.sqrt(num1 + num2);
    return distance;
}

function drawBetween(obj1,obj2,alpha){
    
    ctx.beginPath();
    ctx.moveTo(obj1.x,obj1.y)
    ctx.lineTo(obj2.x,obj2.y);
    ctx.strokeStyle = `rgba(0, 149, 221, ${alpha})`;
    ctx.stroke();
}

nodes = [];

for (let i = 0; i < 200; i++){
    nodes.push(createNode())
}


// function to update the canvas
function update(){
    ctx.fillStyle = '#000000';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    for (let i = 0; i < nodes.length; i++){
        nodes[i].move()
        ctx.beginPath();
        ctx.arc(nodes[i].x,nodes[i].y,nodes[i].radius,0,Math.PI * 2);
        ctx.fillStyle = '#0095DD';
        ctx.fill()
        ctx.closePath()
    }
    closeNodes = [];
    for (let i = 0; i < nodes.length; i++){
        if (distBetweenPoints(mouse,nodes[i]) < 150) {
            closeNodes.push(nodes[i])
        }
    }

    for (let i = 0; i < closeNodes.length; i++){
        for (let j = 0; j < closeNodes.length; j++){
            let distance1 = distBetweenPoints(closeNodes[i],closeNodes[j]);
            if (distance1<150 && j!=i){
                let distance2 = distBetweenPoints(closeNodes[j],mouse);
                let alpha = 1 - distance2/190

                drawBetween(closeNodes[i],closeNodes[j],alpha);
            }
        }
        
    }
    requestAnimationFrame(update);
}


update();
