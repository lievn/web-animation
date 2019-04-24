///* // iteration - stap 4

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(255, 182, 0);
    fill(2, 76, 104);
    noStroke();

    // 10 maal ellipse onder elkaar
    for (var i = 0; i < 12; i++) {
        ellipse(width / 2, i * 35, width - 5, 33);
        /* // alternatief met driehoek.
        push();
        translate(0, i * 35);
        triangle(0, 35, width / 2, 0, width, 35);
        pop();
        //*/
    }

    // rect overlay voor shape moiree effect. beweegbaar over mousey
    push();
    translate(mouseX, 200 * sin(frameCount / 60.0));
    for (var i = 0; i < 20; i++) {
        rect(0, i * 38, width, 35);
    }
    pop();
}

//*/
