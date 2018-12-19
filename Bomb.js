function Bomb(x, y) {
  this.r = 6; // bomb size
  this.x = x; // bomb spawn at x
  this.y = y; // bomb spawn at y
  this.squib = false; // initialy not flaged for removal

  this.show = function() {
    //show enimy fire as sphere at x,y with radius r
    noStroke();
    fill(250);
    ellipse(this.x, this.y, this.r * 2);
  }

  this.move = function() {
    //shift enemy fire down and check if out of range
    this.y += 4;
    if (this.y > 600) this.squib = true;
  }

  this.touchcheck = function(ship) {
    //check if enemy fire hit Ship. if hit kill the sketch
    var d = dist(this.x, this.y, ship.x, ship.y);
    if (d < this.r + ship.r) {
      gameOver();
    }
  }
}