function Bullet(x, y) {
  this.x = x; // bullet spawn at x
  this.y = y; // bullet spawn at y
  this.r = 3; // bullet size
  this.squib = false; // initaily not marked for removal

  this.show = function() {
    // show fired bullet at x,y with radius r
    noStroke();
    fill(250);
    ellipse(this.x, this.y, this.r * 2);
  }

  this.move = function() {
    //shift bullet up and test if out of range
    this.y -= 5;
    if (this.y < 60 + invdY) this.squib = true;
  }

  this.hitTest = function(alien) {
    //test if bullet hits Enemy. if hit then damage enemy, mark bullet for
    //removal and report hit
    var d = dist(this.x, this.y, alien.x, invdY);
    if (d <= this.r + alien.r) {
      alien.boom();
      this.squib = true;
      console.log("wham");
    }
  }
}