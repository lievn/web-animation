///* // ball object stap 2

balls = [];

function setup() {
    createCanvas(400, 400);
    for (var i = 0; i < 100; i++) {
        balls.push(new Ball(random(width), random(height)));
    }
}

function draw() {
    background(2, 76, 104);
    translate(20, 20);
    for (var i = 0; i < balls.length; i++) {
        var w = balls[i];
        w.draw();
    }
}


var Ball = function (xx, yy) {
    this.x = xx;
    this.y = yy;

};

Ball.prototype.draw = function () {
    fill(255, 180);
    var d = dist(mouseX, mouseY, this.x, this.y);
    fill(255, 183, 0, 100);
    stroke(0, 100);
    ellipse(this.x, this.y, d, d);

};

//*/
