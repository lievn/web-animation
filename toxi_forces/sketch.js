///* // physics - toxi clibs - single critten

var VerletPhysics2D = window.toxi.physics2d.VerletPhysics2D;
var VerletParticle2D = window.toxi.physics2d.VerletParticle2D;
var VerletSpring2D = window.toxi.physics2d.VerletSpring2D;
var GravityBehavior = window.toxi.physics2d.behaviors.GravityBehavior;
var AttractionBehavior = window.toxi.physics2d.behaviors.AttractionBehavior;
var Vec2D = window.toxi.geom.Vec2D;
var Rect = window.toxi.geom.Rect;

var physics;
var tx = 200;
var ty = 200;
var eyeSprings = [];
var eyes = [];
var selectedParticle;
var SNAP_DIST = 50 * 50;
var eyeAmount;
var body = [];
var radius;
var particles = [];
var attractor;

function setup() {
	createCanvas(400, 400);
	physics = new VerletPhysics2D();
	physics.setDrag(0.05);
	physics.setWorldBounds(new Rect(0, 0, width, height));
	physics.addBehavior(new GravityBehavior(new Vec2D(0, -.1)));
	for (var i = 0; i < 50; i++) {
		particles.push(new Particle(new Vec2D(random(width), random(height))));
	}
	attractor = new Attractor(new Vec2D(width / 2, height / 2));
}

function angle(x, y, x1, y1) {
	return degrees(atan2(y1 - y, x1 - x));
}

function draw() {
	background(7, 118, 160);
	physics.update();
	strokeWeight(1.9);
	attractor.display();
	for (var i = 0; i < particles.length; i++) {
		var p = particles[i];
		for (var ii = 0; ii < particles.length; ii++) {
			if (i != ii) {
				var p1 = particles[ii];
				var d = dist(p.p.x, p.p.y, p1.p.x, p1.p.y);
				if (d < 50) {
					stroke(255, 44, 0);
					strokeWeight(1.0);
					line(p.p.x, p.p.y, p1.p.x, p1.p.y);
				}
			}
		}
		p.display();
	}
}


function Particle(loc) {
	this.r = 8;
	this.p = new VerletParticle2D(loc.x, loc.y, 1);
	physics.addParticle(this.p);
	physics.addBehavior(new AttractionBehavior(this.p, this.r * 4, -10));

	this.display = function () {
		stroke(255, 180, 0);
		fill(0, 76, 104);
		strokeWeight(1.5);
		ellipse(this.p.x, this.p.y, this.r * 2, this.r * 2);
	}

};

function Attractor(loc) {
	this.r = 50;
	this.p = new VerletParticle2D(loc.x, loc.y, 1);
	physics.addParticle(this.p);
	physics.addBehavior(new AttractionBehavior(this.p, this.r * 4, 0.51));

	this.display = function () {
		noFill();
		stroke(0);
		this.p.x = mouseX;
		this.p.y = mouseY;
		ellipse(this.p.x, this.p.y, this.r * 2, this.r * 2);
	}

};