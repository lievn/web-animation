///* // ball object stap 1

var x = 200;
var y = 200;

function setup() {
    createCanvas(400, 400);

}

function draw() {

    background(2, 76, 104);
    var d = dist(mouseX, mouseY, x, y);
    fill(255, 183, 0, 200);
    ellipse(x, y, d, d);
}

//*/
