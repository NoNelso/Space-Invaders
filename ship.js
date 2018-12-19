function Ship() {
  this.r = 20; //starting hitbox
  this.x = width / 2; // starting x position
  this.y = height - 20; // starting y position
  this.ra = 0; //is right arrow pressed
  this.la = 0; //is left arrow pressed
  this.dir = 0; //direction of motion based on ra & la
  this.triger = 0; //is fire button pressed

  this.show = function() {
    //show player ship as triangle at x,y
    fill(255);
    triangle(this.x - 10, this.y, this.x + 10, this.y, this.x, this.y - 20);
  }

  this.move = function(dir) {
    //checks state of input to determine direction then moves ship acordingly
    if (this.ra == 1 && this.la == 0) this.dir = 5;
    else if (this.ra == 0 && this.la == 1) this.dir = -5;
    else if (this.ra == this.la) this.dir = 0;
    if (this.x > width) {
      this.x = width;
      this.dir = 0;
    } else if (this.x < 1) {
      this.x = 1;
      this.dir = 0;
    } else this.x += this.dir;
  }

  this.MGClick = function() {
    //checks triger pressed and time then fires new bullet. 
    if (this.triger == 1) {
      var bullet = new Bullet(ship.x, ship.y - 25);
      crosfire.push(bullet);
    }
  }
}