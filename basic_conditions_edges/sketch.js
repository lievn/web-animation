///* // Branching edge follow

var x = 0;
var y = 0;
var speed = 5;
var rectSize = 100;
var state = 0;

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(255, 44, 0);
    if (state == 0) {
        x = x + speed;
        if (x > width - rectSize) {
            x = width - rectSize;
            state = 1;
        }
    } else if (state == 1) {
        y = y + speed;
        if (y > height - rectSize) {
            y = height - rectSize;
            state = 2;
        }
    } else if (state == 2) {
        x = x - speed;
        if (x < 0) {
            x = 0;
            state = 3;
        }
    } else if (state == 3) {
        y = y - speed;
        if (y < 0) {
            y = 0;
            state = 0;
        }
    }

    noStroke();
    fill(255, 182, 0);
    rect(x, y, rectSize, rectSize);
}


function mousePressed() {
    rectSize = 20 + random(80);
}


//*/
