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

//Update Enemy object 

Enemy.prototype.update = function(dt) {

 if(this.x <= 505) {  //canvas.width = 505
        this.x = this.x + this.speed * dt;
        
    } 
    else{
    this.x = -2;
}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.randomSpeed = function(){

    this.speed = (Math.floor(Math.random() * 210) + 1);
};

// Our own player class

var Player = function(x,y){

    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
    this.previousLocation = {x : this.x, y : this.y};

};

// This class requires an update(), render() and
// a handleInput() method.

//Update() function updates the position of the Player  
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

//renders the player image

Player.prototype.render = function(){

ctx.drawImage(Resources.get(this.sprite),this.x,this.y);

};

//Helps to move the player  "left" "right" "up" and "down" with lot of contraints

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

//Reset the player position to normal

Player.prototype.reset = function() {

   this.x = 200;
   this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();

//Creting enemies(Bugs) and keeping it into an array

var allEnemies = [

    new Enemy(400,300,80),
    new Enemy(100,200,120),
    //new Enemy(000,400,150),
    new Enemy(200,300,100),
    new Enemy(100,100,210),
    new Enemy(200,100,120)
    //new Enemy(300,400,120,-8)
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

//Checks whether collision is occured between player and enemies(bugs)

Player.prototype.checkCollisions = function () { 

      for (i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 60 && 
            this.x + 50 > allEnemies[i].x && 
            this.y < allEnemies[i].y + 75 && 
            this.y + 75> allEnemies[i].y){
            console.log("game over");
          this.reset();
    }
      }
};
