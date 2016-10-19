// Enemies our player must avoid
var Enemy = function(x, y, speed, direction) {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = (Math.floor(Math.random() * speed));
    this.direction = direction;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
/*Enemy.prototype.move = function(dt){

    if(this.direction === "left" && this.x > -1){
        this.x = this.x - (dt * this.speed);
    }
    else
        if(this.direction === "right"  && this.x > 400){
        this.x = this.x + (dt * this.speed);
}
};*/

Enemy.prototype.update = function(dt) {

 if(this.x <= 505) {  //canvas.width = 505
        this.x = this.x + this.speed * dt;
    } else {
        this.x = -2;
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.randomSpeed = function(){

    this.speed = (Math.floor(Math.random() * 110));
};
// Now write your own player class

var Player = function(x,y){

    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
    this.previousLocation = {x : this.x, y : this.y};

};

// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update=function(){

if(this.pressedKey === 'left' && this.x > 0) { //player isn't on left edge
        this.x = this.x - 100;
    }

    //if right key is pressed:
    if(this.pressedKey === 'right' && this.x < 400) { //player isn't on right edge
        this.x = this.x + 100;
    }

    //if up key is pressed:
    if(this.pressedKey === 'up' && this.y > 0) {
        this.y = this.y - 80;
    }

    //if down key is pressed:
    if(this.pressedKey === 'down' && this.y < 400) {
        this.y = this.y + 80;
    }

    //this will make player jump only once when key is pressed:
    this.pressedKey = null;

    //if player reaches water, position reset:
    if(this.y < -1) {
        this.reset();
    }
    this.checkCollisions();

};



Player.prototype.render = function(){

ctx.drawImage(Resources.get(this.sprite),this.x,this.y);

};

Player.prototype.handleInput = function(direction){

    this.previousLocation.x = this.x;
    this.previousLocation.y = this.y;

    if(direction === 'left' && this.x > 1 && this.x < 410){

        this.x -= 100;
    }

    if(direction === 'up' && this.y > 1 && this.y < 410){

        this.y -= 81;
    }

    if(direction === 'right' && this.x > -1 && this.x < 400){

        this.x += 100;
    }

    if(direction === 'down' && this.y > -101 && this.y < 390){

        this.y += 80;
    }
    
    
};


Player.prototype.reset = function() {

   this.x = 200;
   this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();

var allEnemies = [

    new Enemy(400,300,80,-1),
    new Enemy(100,200,120,1),
    new Enemy(100,100,150,-1)
    /*new Enemy(300,560),
    new Enemy(500,450),
    new Enemy(500,250)*/
];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


Player.prototype.checkCollisions = function () { 

      for (i = 0; i < allEnemies.length; i++) {
        if(this.x >= allEnemies[i].x && this.y >= allEnemies[i].y && this.x <= allEnemies[i].x && this.y <= allEnemies[i].y ){
          this.reset();
        
      }
      }
};