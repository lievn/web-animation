var VerletPhysics2D = window.toxi.physics2d.VerletPhysics2D,
	VerletParticle2D = window.toxi.physics2d.VerletParticle2D,
	GravityBehavior = window.toxi.physics2d.behaviors.GravityBehavior,
	AttractionBehavior = window.toxi.physics2d.behaviors.AttractionBehavior,
	Vec2D = window.toxi.geom.Vec2D,
	Rect = window.toxi.geom.Rect;

var physics;
var NUM_PARTICLES = 150;
var count = 0;
var attract = -1;
var moving = [];

function setup() {
	createCanvas(400, 400);
	physics = new VerletPhysics2D();
	physics.setDrag(0.05);
	physics.setWorldBounds(new Rect(0, 0, width, height));

	for (var i = 0; i < NUM_PARTICLES; i++) {
		var p = new VerletParticle2D(Vec2D.randomVector().scale(5).addSelf(width / 2, 100));
		physics.addParticle(p);
		var ab = new AttractionBehavior(p, 20, -2.0, 0.001);
		physics.addBehavior(ab);
	}

	for (var i = 0; i < 4; i++) {

		var m = new Mover(random(width), random(height));
		moving.push(m);
	}
}

function draw() {
	background(0, 76, 104);
	fill(255, 44, 0);
	stroke(255, 180, 0, 100);

	for (var i = 0; i < moving.length; i++) {
		var m = moving[i];
		m.move();
	}

	physics.update();

	for (var i = 0; i < physics.particles.length; i++) {
		var p = physics.particles[i];

		for (var j = 0; j < physics.particles.length; j++) {
			var p2 = physics.particles[j];
			var d = dist(p.x, p.y, p2.x, p2.y);
			if (i != j && d < 35) {
				line(p.x, p.y, p2.x, p2.y);
			}
		}
		ellipse(p.x, p.y, 5, 5);
	}


	for (var i = 0; i < moving.length; i++) {
		var m = moving[i];
		m.display();
	}
}


function mousePressed() {
	var m = new Mover(mouseX, mouseY);
	moving.push(m);
}


//moving object

function Mover(xx, yy) {
	this.x = xx;
	this.y = yy;
	this.diameter = random(10, 30);
	this.speed = 3;
	this.attract;
	this.off = random(200);

	this.pos = new Vec2D(this.x, this.y);

	this.move = function () {
		this.pos.x += this.speed * sin(this.off + frameCount / 40.0);
		this.pos.y += this.speed * cos(-this.off + frameCount / 40.0);
		this.attract = new AttractionBehavior(this.pos, this.diameter * 2.5, -5.0, 0.2);
		physics.addBehavior(this.attract);
	};

	this.display = function () {
		//this.move();
		fill(7, 118, 160, 180);
		ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
		physics.removeBehavior(this.attract);
	}
};