var time; //could have used frame count but whatever
var ship; //prep player ship
var crosfire = []; // player fire array
var invd = []; // enemy invader array
var grenades = []; // enemy fire array
var invdY; // enemy distance array
var invdDir; // enemy direction of travel
var invdLife; // total enemy hitpoints

function setup() {
  // create window with speed and run initial value reset fx
  createCanvas(800, 600);
  frameRate(60);
  restart();
}

function draw() {

  //override previus frame
  background(0);
  ++time;

  //run player ship controls
  ship.show();
  ship.move();
  if (time % 3 == 0) ship.MGClick();

  //check if any enemies remain
  if (invd.length < 1) winner();

  for (var i = 0; i < invd.length; ++i) {
    //run all enemy ship controls
    invd[i].show();
    if (time % 10 == 0) invd[i].move();
    if (invdY > 500) gameOver();
    invd[i].drop();
  }

  for (var i = crosfire.length - 1; i >= 0; --i) {
    //update player fire
    crosfire[i].show();
    crosfire[i].move();
    for (var j = invd.length - 1; j >= 0; --j) {
      if (crosfire[i].y < invdY + 50) {
        //for all bullets within reasonable range, test if hits enemy
        crosfire[i].hitTest(invd[j])
      }
    }
  }

  for (var i = grenades.length - 1; i >= 0; --i) {
    //update all enemy fire
    grenades[i].show();
    grenades[i].move();
    if (grenades[i].y > 540) grenades[i].touchcheck(ship);
  }

  for (var i = crosfire.length - 1; i >= 0; --i) {
    if (crosfire[i].squib) crosfire.splice(i, 1);
    //remove out of range bullets to avoid memory leak
  }

  for (var i = grenades.length - 1; i >= 0; --i) {
    //remove out of range bombs to avoid memory leak
    if (grenades[i].squib) grenades.splice(i, 1);
  }

  for (var i = invd.length - 1; i >= 0; --i) {
    //remove dead enemies to increase processing speed
    if (invd[i].dead) invd.splice(i, 1);
  }
}

function restart() {
  // (re)set global variables to primary values
  time = 0; // clock independant of frameCount
  invdDir = 10; // enemy moves right by 10
  invdY = 50; // enemy starts at y from top
  ship = new Ship(); //create new ship
  invdLife = 0; // set enemy life to 0
  for (var i = 0; i < width / 100; i++) {
    //spawn Enemy and update life
    invd[i] = new Enemy(i * 75 + 100);
    invdLife += 25;
    console.log(invdLife);
  }
}

function keyPressed() {
  //gather user control input
  if (key === ' ') ship.triger = 1;
  else if (keyCode === RIGHT_ARROW) ship.ra = 1;
  else if (keyCode === LEFT_ARROW) ship.la = 1;
}

function keyReleased() {
  //gather user control input
  if (key === ' ') ship.triger = 0;
  else if (keyCode === RIGHT_ARROW && ship.dir != -1) ship.ra = 0;
  else if (keyCode === LEFT_ARROW && ship.dir != 1) ship.la = 0;
}

function gameOver() {
  // flash gameover screen
  frameRate(20);
  rectMode(center)
  for (i = 0; i < 60; i++) {
    textSize(48);
    fill(255);
    text("You Lose", width / 2, height / 2);
    background(255);
    fill(0);
    text("You Lose", width / 2, height / 2);
  }
  console.log("you loose");
  console.log("enemy health");
  console.log(invdLife);
  frameRate(60);

  //null all variables
  time = null;
  invdDir = null;
  invdY = null;
  ship = null;
  invdLife = null;
  invd.splice(0, invd.length);
  crosfire.splice(0, crosfire.length);
  grenades.splice(0, grenades.length);

  //reset new game on ENTER
  fill(255);
  while (keyPressed != ENTER) {
    background(0);
    text("press enter to restart", width / 2, height / 2);
  }
  restart();
}

function winner() {
  //Display win screen
  frameRate(20);
  rectMode(center)
  for (i = 0; i < 60; i++) {
    textSize(48);
    fill(255);
    text("You Win", width / 2, height / 2);
    background(255);
    fill(0);
    text("You Win", width / 2, height / 2);
  }
  frameRate(60);
  console.log("you Win");

  //null all variables
  time = null;
  invdDir = null;
  invdY = null;
  ship = null;
  invdLife = null;
  invd.splice(0, invd.length);
  crosfire.splice(0, crosfire.length);
  grenades.splice(0, grenades.length);

  //reset new game on ENTER
  fill(255);
  while (keyPressed != ENTER) {
    background(0);
    text("press enter to restart", width / 2, height / 2);
  }
  restart();
}