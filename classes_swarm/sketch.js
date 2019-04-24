/* // Swarm stap 1

var elements = [];

function setup() {
    createCanvas(800, 600);
    for (var i = 0; i < 200; i++) {
        elements.push(new Element(random(width), random(height)));
    }
}

function draw() {
    background(0);

    for (var i = 0; i < elements.length; i++) {
        var b = elements[i];
        b.draw();
    }

}

function mousePressed() {
    for (var i = 0; i < 50; i++) {
        elements.push(new Element(random(width), random(height)));
        //elements.push(new Element(mouseX + random(-100, 100), mouseY + random(-100, 100)));

    }
    for (var i = 0; i < 50; i++) {
        elements.splice(i, 1);
    }
}


var Element = function (xx, yy) {
    this.x = xx;
    this.y = yy;
    this.s = random(5, 20);
};

Element.prototype.draw = function () {
    fill(255);
    ellipse(this.x, this.y, this.s, this.s);

};


//*/




/* // Swarm stap 2


var elements = [];

function setup() {
    createCanvas(800, 600);
    for (var i = 0; i < 200; i++) {
        elements.push(new Element(random(width), random(height)));
    }
}

function draw() {
    background(0);

    for (var i = 0; i < elements.length; i++) {
        var b = elements[i];
        b.draw();
    }

}

function mousePressed() {
    for (var i = 0; i < 50; i++) {
        elements.push(new Element(random(width), random(height)));
        //elements.push(new Element(mouseX + random(-100, 100), mouseY + random(-100, 100)));

    }
    for (var i = 0; i < 50; i++) {
        elements.splice(i, 1);
    }
}


var Element = function (xx, yy) {
    this.x = xx;
    this.y = yy;
    this.s = random(5, 20);
    this.sx = random(-5, 5);
    this.sy = random(-5, 5);
};

Element.prototype.move = function () {

    this.x += this.sx;
    this.y += this.sy;

    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x > width) {
        this.x = width;
    }
    if (this.y < 0) {
        this.y = 0;
    }
    if (this.y > height) {
        this.y = height;
    }

};

Element.prototype.draw = function () {
    fill(255);
    this.move();
    ellipse(this.x, this.y, this.s, this.s);

};

//*/



/* // Swarm stap 3


var elements = [];

function setup() {
    createCanvas(800, 600);
    for (var i = 0; i < 200; i++) {
        elements.push(new Element(random(width), random(height)));
    }
}

function draw() {
    background(0);

    for (var i = 0; i < elements.length; i++) {
        var b = elements[i];
        b.draw();
    }

}

function mousePressed() {
    for (var i = 0; i < 50; i++) {
        //elements.push(new Element(random(width), random(height)));
        elements.push(new Element(mouseX + random(-100, 100), mouseY + random(-100, 100)));

    }
    for (var i = 0; i < 50; i++) {
        elements.splice(i, 1);
    }
}

function angle(x, y, xx, yy) {
    return degrees(atan2(yy - y, xx - x));
}


var Element = function (xx, yy) {
    this.x = xx;
    this.y = yy;
    this.s = random(5, 20);
    this.sx = random(-5, 5);
    this.sy = random(-5, 5);
    this.speed = random(1, 4);
};

Element.prototype.moveToCorners = function () {

    this.x += this.sx;
    this.y += this.sy;

    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x > width) {
        this.x = width;
    }
    if (this.y < 0) {
        this.y = 0;
    }
    if (this.y > height) {
        this.y = height;
    }

};


Element.prototype.moveToMouse = function () {
    var a = angle(this.x, this.y, mouseX, mouseY);
    var tx = this.x + cos(radians(a)) * this.speed;
    var ty = this.y + sin(radians(a)) * this.speed;
    this.x = tx;
    this.y = ty;
};

Element.prototype.draw = function () {
    fill(255);
    //this.moveToCorners();
    this.moveToMouse();
    ellipse(this.x, this.y, this.s, this.s);

};

//*/



/* // Swarm stap 4


var elements = [];

function setup() {
    createCanvas(800, 600);
    for (var i = 0; i < 200; i++) {
        elements.push(new Element(random(width), random(height)));
    }
}

function draw() {
    background(0, 10);

    for (var i = 0; i < elements.length; i++) {
        var b = elements[i];
        for (var j = 0; j < elements.length; j++) {
            var b1 = elements[j];
            if (i != j && check(b1.x, b1.y, b.x, b.y, 10, 10)) {
                b1.noOverlap(b.x, b.y);
            }
        }
        b.draw();
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

function mousePressed() {
    for (var i = 0; i < 50; i++) {
        //elements.push(new Element(random(width), random(height)));
        elements.push(new Element(mouseX + random(-100, 100), mouseY + random(-100, 100)));

    }
    for (var i = 0; i < 50; i++) {
        elements.splice(i, 1);
    }
}

function angle(x, y, xx, yy) {
    return degrees(atan2(yy - y, xx - x));
}


var Element = function (xx, yy) {
    this.x = xx;
    this.y = yy;
    this.s = random(2, 8);
    this.sx = random(-5, 5);
    this.sy = random(-5, 5);
    this.speed = random(1, 4);
    this.mx = 0;
    this.my = 0;
};

Element.prototype.moveToCorners = function () {

    this.x += this.sx;
    this.y += this.sy;

    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x > width) {
        this.x = width;
    }
    if (this.y < 0) {
        this.y = 0;
    }
    if (this.y > height) {
        this.y = height;
    }

};

Element.prototype.noOverlap = function (x, y) {

    if (x < this.x) {
        this.mx = random(1.5);
    }
    if (x > this.x) {
        this.mx = -random(1.5);
    }
    if (y < this.y) {
        this.my = random(1.5);
    }
    if (y > this.y) {
        this.my = -random(1.5);
    }
    if (x == this.x) {
        this.mx = 0;
    }
    if (y == this.y) {
        this.my = 0;
    }

    this.x += this.mx;
    this.y += this.my;

};

Element.prototype.moveToMouse = function () {
    var a = angle(this.x, this.y, mouseX, mouseY);
    var tx = this.x + cos(radians(a)) * this.speed;
    var ty = this.y + sin(radians(a)) * this.speed;
    this.x = tx;
    this.y = ty;
};

Element.prototype.draw = function () {
    fill(255);
    //this.moveToCorners();
    this.moveToMouse();
    ellipse(this.x, this.y, this.s, this.s);

};

//*/


///* // Swarm stap 5


var elements = [];
var ins = false;

function setup() {
    createCanvas(400, 400);
    for (var i = 0; i < 200; i++) {
        elements.push(new Element(random(width), random(height)));
    }
    stroke(255, 100);
}

function draw() {
    background(2, 76, 104, 10);

    for (var i = 0; i < elements.length; i++) {
        var b = elements[i];
        for (var j = 0; j < elements.length; j++) {
            var b1 = elements[j];
            if (i != j && check(b1.x, b1.y, b.x, b.y, 20, 20)) {
                b1.noOverlap(b.x, b.y);
            }
        }
        b.draw();
    }

}

function checkmouse() {
    if (mouseX > 10 && mouseX < width - 10 && mouseY > 10 && mouseY < height - 10) {
        return false;
    }
    return true;
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

function mousePressed() {
    for (var i = 0; i < 50; i++) {
        //elements.push(new Element(random(width), random(height)));
        elements.push(new Element(mouseX + random(-100, 100), mouseY + random(-100, 100)));

    }
    for (var i = 0; i < 50; i++) {
        elements.splice(i, 1);
    }
}

function angle(x, y, xx, yy) {
    return degrees(atan2(yy - y, xx - x));
}


var Element = function (xx, yy) {
    this.x = xx;
    this.y = yy;
    this.s = random(2, 8);
    this.sx = random(-5, 5);
    this.sy = random(-5, 5);
    this.speed = random(3, 7);
    this.mx = 0;
    this.my = 0;
};

Element.prototype.moveToCorners = function () {

    this.x += this.sx;
    this.y += this.sy;

    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x > width) {
        this.x = width;
    }
    if (this.y < 0) {
        this.y = 0;
    }
    if (this.y > height) {
        this.y = height;
    }

};

Element.prototype.noOverlap = function (x, y) {

    if (x < this.x) {
        this.mx = random(1.5);
    }
    if (x > this.x) {
        this.mx = -random(1.5);
    }
    if (y < this.y) {
        this.my = random(1.5);
    }
    if (y > this.y) {
        this.my = -random(1.5);
    }
    if (x == this.x) {
        this.mx = 0;
    }
    if (y == this.y) {
        this.my = 0;
    }

    this.x += this.mx;
    this.y += this.my;

};

Element.prototype.moveToMouse = function () {
    var a = angle(this.x, this.y, mouseX, mouseY);
    var tx = this.x + cos(radians(a)) * this.speed;
    var ty = this.y + sin(radians(a)) * this.speed;
    this.x = tx;
    this.y = ty;
};

Element.prototype.draw = function () {
    //fill(255);
    //fill(200 + random(-50, 100), 230, 250, 120);
    fill(0, 140, 230, 150);
    if (checkmouse() == true) {
        this.moveToCorners();
    } else {
        this.moveToMouse();
    }
    ellipse(this.x, this.y, this.s, this.s);

};

//*/


/* // Swarm stap 6 _ with sound


var elements = [];
var ins = false;

function setup() {
    createCanvas(800, 600);
    for (var i = 0; i < 30; i++) {
        elements.push(new Element(random(width), random(height)));
    }
}

function draw() {
    background(0, 10);

    for (var i = 0; i < elements.length; i++) {
        var b = elements[i];
        for (var j = 0; j < elements.length; j++) {
            var b1 = elements[j];
            if (i != j && check(b1.x, b1.y, b.x, b.y, 20, 20)) {
                b1.noOverlap(b.x, b.y);
            }
        }
        b.draw();
    }

}

function checkmouse() {
    if (mouseX > 10 && mouseX < width - 10 && mouseY > 10 && mouseY < height - 10) {
        return false;
    }
    return true;
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

function mousePressed() {
    for (var i = 0; i < 50; i++) {
        //elements.push(new Element(random(width), random(height)));
        elements.push(new Element(mouseX + random(-100, 100), mouseY + random(-100, 100)));

    }
    for (var i = 0; i < 50; i++) {
        elements.splice(i, 1);
    }
}

function angle(x, y, xx, yy) {
    return degrees(atan2(yy - y, xx - x));
}


var Element = function (xx, yy) {
    this.x = xx;
    this.y = yy;
    this.s = 2.0 * random(2, 8);
    this.sx = random(-5, 5);
    this.sy = random(-5, 5);
    this.speed = random(3, 7);
    this.mx = 0;
    this.my = 0;
    this.osc = new p5.SinOsc();
    this.osc.start();
    this.osc.setType('sine');
    this.oldx = this.x;
    this.oldy = this.y;
    this.waveOfset = (1 + int(random(4))) * 2;
};

Element.prototype.moveToCorners = function () {

    this.x += this.sx;
    this.y += this.sy;

    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x > width) {
        this.x = width;
    }
    if (this.y < 0) {
        this.y = 0;
    }
    if (this.y > height) {
        this.y = height;
    }

};

Element.prototype.noOverlap = function (x, y) {

    if (x < this.x) {
        this.mx = random(1.5);
    }
    if (x > this.x) {
        this.mx = -random(1.5);
    }
    if (y < this.y) {
        this.my = random(1.5);
    }
    if (y > this.y) {
        this.my = -random(1.5);
    }
    if (x == this.x) {
        this.mx = 0;
    }
    if (y == this.y) {
        this.my = 0;
    }

    this.x += this.mx;
    this.y += this.my;

};

Element.prototype.moveToMouse = function () {
    var a = angle(this.x, this.y, mouseX, mouseY);
    var tx = this.x + cos(radians(a)) * this.speed;
    var ty = this.y + sin(radians(a)) * this.speed;
    this.x = tx;
    this.y = ty;

};

Element.prototype.draw = function () {
    //fill(255);
    //fill(200 + random(-50, 100), 230, 250, 120);
    var d = 110 + dist(this.x, this.y, this.oldx, this.oldy) * 440;
    this.oldx = this.x;
    this.oldy = this.y;
    if (checkmouse() == true) {
        this.moveToCorners();
    } else {
        this.moveToMouse();
    }
    fill(255, 255, 220, 150);
    //var d = dist(this.x, this.y, this.oldx, this.oldy) * 100;
    //console.log(d);

    var freq = map(d, 1, 100, 220, 880);
    var amp = map(this.x % 20, 0, height, 4, 150);
    var w = 1 + 10 * sin(frameCount / this.waveOfset);
    this.osc.freq(d);
    this.osc.amp(w);

    ellipse(this.x, this.y, this.s, this.s);



};

//*/
