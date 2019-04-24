///* // physics - toxi clibs - single critten

var VerletPhysics2D = window.toxi.physics2d.VerletPhysics2D;
var VerletParticle2D = window.toxi.physics2d.VerletParticle2D;
var VerletSpring2D = window.toxi.physics2d.VerletSpring2D;
var GravityBehavior = window.toxi.physics2d.behaviors.GravityBehavior;
var AttractionBehavior = window.toxi.physics2d.behaviors.AttractionBehavior;
var Vec2D = window.toxi.geom.Vec2D;
var Rect = window.toxi.geom.Rect;

var physics;
var pointAmount;
var tx = 200;
var ty = 100;
var cparts = [];
var bodySprings = [];
var eyeSprings = [];
var eyes = [];
var selectedParticle;
var SNAP_DIST = 20 * 20;
var eyeAmount;
var wiggleFactor;
var hairLength = 10;

// color(7, 118, 160), color(255, 182, 0), color(255, 44, 0), color(2, 76, 104);

function setup() {
	createCanvas(400, 400);
	physics = new VerletPhysics2D();
	physics.setDrag(0.05);
	physics.setWorldBounds(new Rect(0, 0, width, height));
	physics.addBehavior(new GravityBehavior(new Vec2D(0, .72)));
	//centroid
	c = new VerletParticle2D(tx, ty, 1);
	pointAmount = 60; //20 + int(random(0, 40));
	var radius = 100;
	var modelf = .02; //random(0.00001, 0.1);
	eyeAmount = 5; //int(random(3,15));
	wiggleFactor = 8;
	strengthF = 50.0;

	//eyes locations + bodySprings to centroid
	for (var i = 0; i < eyeAmount; i++) {
		var cd = new VerletParticle2D(tx + random(20.0), ty + random(20.0), .1);
		eyes.push(cd);
		physics.addBehavior(new AttractionBehavior(cd, 30, -10, .005));
		physics.addParticle(cd);

	}
	for (var i = 0; i < eyes.length; i++) {
		var e = eyes[i];
		var s = new VerletSpring2D(c, e, 1.0, modelf / strengthF);
		physics.addSpring(s);
		eyeSprings.push(s);
	}

	// particles for body
	for (var i = 0; i < pointAmount; i++) {
		var theta = map(i, 0, pointAmount, 0, TWO_PI);
		var spx = tx + radius * sin(theta);
		var spy = ty + radius * cos(theta);
		var p = new VerletParticle2D(spx, spy, 1);
		cparts.push(p);
		physics.addBehavior(new AttractionBehavior(p, 40, -5, .005));
		physics.addParticle(p);

		//connect them to centroid
		if (i % 1 == 0) {
			var s = new VerletSpring2D(c, p, 1.0, modelf / strengthF);
			physics.addSpring(s);
		}

		// attach eyes to some of them
		if (i % 10 == 0) {
			var t = eyes[int(random(eyes.length))];
			var ss = new VerletSpring2D(t, p, -1.0, modelf / strengthF);
			physics.addSpring(ss);
			eyeSprings.push(ss);
		}

		//connect to neighbour.
		if (i > 0) {
			var q = cparts[i - 1];
			var s2 = new VerletSpring2D(p, q, 1, modelf);
			physics.addSpring(s2);
		}


	}
	//close start end point
	var p = cparts[0];
	var q = cparts[pointAmount - 1];
	var s = new VerletSpring2D(p, q, 20, modelf);
	physics.addSpring(s);


	// xtra connections for strength
	for (var i = 0; i < cparts.length; i++) {
		var p1 = cparts[i];
		var p2 = cparts[int((i + wiggleFactor) % cparts.length)];
		var s3 = new VerletSpring2D(p1, p2, -1.0, modelf / strengthF);
		bodySprings.push(s3);
		physics.addSpring(s3);
	}

}

function angle(x, y, x1, y1) {
	return degrees(atan2(y1 - y, x1 - x));
}

function draw() {
	background(2, 76, 104);
	physics.update();

	// draw points
	for (var i = 0; i < physics.particles.length; i++) {
		var p = physics.particles[i];
		ellipse(p.x, p.y, 5, 5);
	}

	//draw little 'hairs' on contour
	stroke(255, 182, 0);
	for (var i = 0; i < cparts.length; i++) {
		var p = cparts[i];
		var an = angle(c.x, c.y, p.x, p.y);
		push();
		translate(p.x, p.y);
		rotate(radians(an));
		line(0, 0, hairLength, 0);
		pop();
	}

	// draw the shape itself
	fill(7, 118, 160);
	stroke(0);
	beginShape();
	for (var i = 0; i < cparts.length; i++) {
		var p = cparts[i];
		curveVertex(p.x, p.y);
	}
	endShape(CLOSE);

	//draw body spring lines.
	for (var i = 0; i < bodySprings.length; i++) {
		var s = bodySprings[i];
		stroke(255, 80);
		line(s.a.x, s.a.y, s.b.x, s.b.y);
	}

	//draw eye spring lines.
	strokeWeight(10.0);
	for (var i = 0; i < eyeSprings.length; i++) {
		var s = eyeSprings[i];
		//stroke(2, 76, 104, 100);
		stroke(255, 182, 0, 100);
		line(s.a.x, s.a.y, s.b.x, s.b.y);
	}

	//draw eyes.
	for (var i = 0; i < eyes.length; i++) {
		var p = eyes[i];
		var rad = Math.max(p.distanceTo(c) * .52, 15);
		noFill();
		stroke(255, 183, 0, 140);
		strokeWeight(5.0);
		ellipse(p.x, p.y, rad * 1.2, rad * 1.2);
		fill(255);
		stroke(0);
		strokeWeight(2.0);
		ellipse(p.x, p.y, rad, rad);
		fill(0);
		noStroke();
		ellipse(p.x, p.y, rad * .15, rad * .15);
	}

	// draw centroid. 
	//ellipse(c.x, c.y, 10, 10);
}

function mousePressed() {
	var mousePos = new Vec2D(mouseX, mouseY);
	for (var i = 1; i < physics.particles.length - 1; i++) {
		var p = physics.particles[i];
		if (mousePos.distanceToSquared(p) < SNAP_DIST) {
			selectedParticle = p;
			selectedParticle.lock();
			break;
		}
	}
}

function mouseDragged() {
	if (selectedParticle != null) {
		selectedParticle.set(mouseX, mouseY);
	}
}

function mouseReleased() {
	if (selectedParticle != null) {
		selectedParticle.unlock();
		selectedParticle = null;
	}
}


//*/