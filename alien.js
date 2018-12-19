function Enemy(x) {
  this.agro = floor(random(10, 100)); // rate of bombing
  this.r = 25; // size and health
  this.x = x; // position in x
  this.dead = false; // initialy not marked for removal

  this.show = function() {
    //show enemy as a elipse, with radius r, at x,y from top left
    fill(255, 0, 100);
    ellipse(this.x, invdY, this.r * 2);
  }

  this.move = function() {
    //if one of the enemies reach near the border, invert invdDir and drop invdY
    //further down.
    if (this.x < 60) {
      invdDir = 10;
      invdY += 2;
    }
    this.x = this.x + (invdDir);
    if (this.x > (width - 60)) {
      invdDir = -10;
      invdY += 2;
    }
  }

  this.drop = function() {
    //invd drops bomb based on random agro timer value created at spawn and adds
    //bomb object to grenades
    if (time > 100 && (time % this.agro) == 0 && this.r > 1) {
      console.log("drop");
      var bomb = new Bomb(this.x, invdY + this.r);
      grenades.push(bomb);
    }
  }

  this.boom = function() {
    // damage invd hit by bullet, lower enemy total health and report
    if (this.r > 0) this.r -= 5;
    invdLife -= 5;
    console.log(invdLife);
    if (this.r < 4) {
      this.dead = true;
      console.log("dead");
    }
  }
}