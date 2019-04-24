///* // Branching bouncer

var circleX;
var circleY;
var moveX = 5;
var moveY = 2;
var circleSize = 100;
var r = random(255);
var g = random(255);
var b = random(255);

function setup() {
    createCanvas(400, 400);
    ellipseMode(CENTER);
    circleX = width / 2;
    circleY = height / 2;
}

function draw() {
    background(r, g, b);
    circleX += moveX;
    circleY += moveY;

    if (circleX > width - circleSize / 2 || circleX < circleSize / 2) {
        moveX = -moveX;
        r = random(255);
        g = random(255);
        b = random(255);
    }
    if (circleY > height - circleSize / 2 || circleY < circleSize / 2) {
        moveY = -moveY;
        r = random(255);
        g = random(255);
        b = random(255);
    }
    ellipse(circleX, circleY, circleSize, circleSize);
}

//*/
