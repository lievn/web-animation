///* // iteration - little snake


var points = 40;
var calc = 0;
var numx = [];
var numy = [];
var x = 100;
var y = 120;
var xs = 3.0;
var ys = 2.0;

function setup() {
    createCanvas(400, 400)
}

function mover() {
    x += xs;
    y += ys;
}

function checkedges(x, y) {
    if (x < 0 || x > width) {
        xs = -xs;
    }
    if (y < 0 || y > height) {
        ys = -ys;
    }
}

// voegt locaties toe - neemt locaties weg uit de lijst
function storeposition() {
    if (calc < points) {
        numx.push(x);
        numy.push(y);
        calc += 1;
    } else {
        numx.splice(0, 1);
        numy.splice(0, 1);
        calc -= 1;
    }
}

function draw() {
    background(0, 140, 230);
    mover();
    checkedges(x, y);
    storeposition();
    for (var i = 0; i < numx.length; i++) {
        var xx = numx[i];
        var yy = numy[i];
        var s = numx.length - i;
        var ss = i * s * sin(frameCount / 20.0) * .2;
        yy += 10.0 * sin(frameCount / 10.0 + i / 5.0);
        fill(abs(ss) * 10.0, 183, 0);
        ellipse(xx, yy, ss, ss);
    }
}

//*/
