///* // zonder overlap fight object

thingies = [];
images = [];

function preload() {
    for (var i = 0; i < 10; i++) {
        var im = loadImage("files/export-" + i + ".png");
        images.push(im);
    }
}

function setup() {
    createCanvas(400, 400);
    ellipseMode(CORNER);
    for (var i = 0; i < 5; i++) {
        thingies.push(new Thingie(width / 2 + random(-5, 5), height / 2 + random(-5, 5)));
    }
    imageMode(CENTER);
}

function draw() {
    background(2, 76, 104);
    translate(0, 0);
    for (var i = 0; i < thingies.length; i++) {
        var t = thingies[i];
        for (var j = 0; j < thingies.length; j++) {
            var t2 = thingies[j];
            if (i != j && check(t2.x, t2.y, t.x, t.y, t.h, t.w)) {
                t.move(t2.x, t2.y);
                console.log("nu" + i);
            }
        }
        t.draw();
    }
}

function mousePressed() {
    thingies.push(new Thingie(mouseX, mouseY));
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


var Thingie = function (xx, yy) {
    this.x = xx;
    this.y = yy;
    this.w = 70;
    this.h = 60;
    this.mx = 0;
    this.my = 0;
    this.select = int(random(images.length));
    this.beeld = images[this.select];
};

Thingie.prototype.move = function (xx, yy) {
    if (xx < this.x) {
        this.mx = random(5);
    }
    if (xx > this.x) {
        this.mx = -random(5);
    }
    if (yy < this.y) {
        this.my = random(5);
    }
    if (yy > this.y) {
        this.my = -random(5);
    }
    if (xx == this.x) {
        this.mx = 0;
    }
    if (yy == this.y) {
        this.my = 0;
    }
    this.x += this.mx;
    this.y += this.my;
}

Thingie.prototype.draw = function () {
    fill(0, 140, 230);
    image(this.beeld, this.x, this.y, this.w, this.h);
};
