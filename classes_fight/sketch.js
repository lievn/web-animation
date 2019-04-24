///* // fight stap 1

var x, y;
var xx, yy;
var w, h;

function setup() {
    createCanvas(400, 400);
    x = 100;
    y = 100;
    xx = 160;
    yy = 100;
    w = 100;
    h = 200;
}

function draw() {
    background(255, 44, 0);
    //background(0);
    fill(0, 140, 230);
    rect(x, y, w, h);
    noStroke();
    fill(2, 76, 104);
    rect(xx, yy, w, h);
    if (check(x, y, xx, yy, w, h) == true) {
        x += random(-3, 3);
        y += random(-3, 3);
        xx += random(-3, 3);
        yy += random(-3, 3);
    }
}


function check(xx, yy, x, y, w, h) {
    if (y < yy - h || y > yy + h) {
        return false;
    }
    if (x < xx - w || x > xx + w) {
        return false;
    }
    return true;

}


//*/
