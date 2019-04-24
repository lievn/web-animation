///* // Variables

var x, y;

function setup() {
    createCanvas(400, 400);
    x = width / 2;
    y = height / 2;
}

function draw() {
    background(255, 182, 0, 30);
    x += random(-2, 2);
    y += random(-2, 2);
    ellipse(x, y, 50, 50);
}

//*/
