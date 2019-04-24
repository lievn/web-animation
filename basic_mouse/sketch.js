///* // Variables stap 6. systeemvars + mouse functions
// branching.

var x = 0;
var y = 0;
var tx = 0;
var ty = 0;
var ease = 0.05;

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(255, 44, 0, 40);

    var dx = tx - x;
    if (abs(dx) > 1) {
        x += dx * ease;
    }

    var dy = ty - y;
    if (abs(dy) > 1) {
        y += dy * ease;
    }
    ellipse(x, y, 20, 20);

}

function mousePressed() {
    tx = mouseX;
    ty = mouseY;
}


//*/
