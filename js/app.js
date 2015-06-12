// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
   // var enemy_startpoint=[83,166,240];
    this.sprite = 'images/enemy-bug1.png';
    this.x = 0;
    this.y = 125;
    this.width = 101;
    this.height = 89;
}    
 var enemy_startpoint=[124,204,284];
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.   
    var enemy_speed = (Math.floor(Math.random() * 5) + 1)* 100;
    if (this.x < 700) {  
        this.x = this.x + ( enemy_speed * dt );
    }
    else {
        this.x= 0;
        this.y = enemy_startpoint[Math.floor(Math.random()* 3)];
    }  
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(playobj){
    this.sprite = playobj;
    this.x = 402;
    this.y = 380;
    this.width = 101;
    this.height = 101;
}

var collisionbool = false;
var playerlifecount = 1;
var playerCollisionCount = 0;


Player.prototype.update = function(dt) {
//check for enemy and player collision
    checkCollisions();
    if(collisionbool){
        this.playerlifeclear(playerlifecount);
    } 
    
    if (playerCollisionCount === 3){
        console.log("Game Over");
        gamestop = true;                      
    }             
//check for player and gem collision
    if (gem.x < player.x + 101 &&
            gem.x + 30 > player.x &&
            gem.y < player.y + 101 &&
            gem.y + 40 > player.y) {
            gem.addStar();
            gem.clear();                   

    }
}  
function checkCollisions (){
    allEnemies.forEach(function(enemy){
        if(enemy.x < player.x + 80 &&
            enemy.x + 30 > player.x &&
            enemy.y < player.y + 80 &&
            enemy.y + 40 > player.y) {
                console.log('collision!');
                collisionbool = true;
                playerCollisionCount = playerCollisionCount + 1;
                playerlifecount = playerlifecount - 1;
                player.resetplayer();
        }
    });
}
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.resetplayer = function(){
    this.x = 402;
    this.y = 380;
}
var yvalue = 1;
Player.prototype.playerLife = function(){
    var xval = 820;
    var yvalue1 = 100 * yvalue;
    if(yvalue1 < 350){
        ctx.drawImage(Resources.get('images/Heart1.png'), xval, yvalue1);
        yvalue = yvalue + 1; 
        playerlifecount = playerlifecount + 1;
    }
}
Player.prototype.playerlifeclear = function(cnt){
    ctx.clearRect ( 820 , 100 * cnt , 60, 73);
}
Player.prototype.handleInput = function(keyCode){    
    switch(keyCode){
        case 'space':
        // if(gamestop) {
        //this.reset();
        //}       
        case 'left':
            if(this.x > 0)
                this.x -= 100;
            else            
                this.x = 700;
            break;
        case 'up':
            if(this.y > 120)
                this.y -= 100;
            else
                this.y += 300;
            break;
        case 'right':
            if(this.x < 700)
                this.x += 100;
            else
                this.x -=700;
            break;
        case 'down':
            if(this.y < 350)
                this.y += 100;
            break; 
    }
}
// var RestartGame = function(resetbool){
//     if (resetbool){

//     }
// }
var Gem = function(gemobj){
    this.sprite = gemobj;
    this.x = 212;
    this.y = 215;
    this.width= 80;
    this.height = 90;
}
var gemindex;
var gem;
Gem.prototype.update = function(dt){   
    var y_axis = [132,212,295];
    var x_axis = [115,215,315,415,515,615,715];
    this.x = x_axis[Math.floor(Math.random()*6)];
    this.y = y_axis[Math.floor(Math.random()*3)];     
}
Gem.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Gem.prototype.addStar = function(){    
    this.sprite = 'images/Star2.png';
    this.x = 50* xvalue;
    this.y = 520;
    if(this.x < 700){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);     
    }
    xvalue = xvalue + 1;
    if (xvalue == 15){
        gamewon = true;           
        }
}
Gem.prototype.clear = function(){
    ctx.clearRect ( 0 , 0 , this.width, this.height );
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allPlayer = {
     p1 : 'images/char-boy1.png'
    // p2 : 'images/char-cat-girl.png',
    // p3 : 'images/char-horn-girl.png',
    // p4 : 'images/char-pink-girl.png',
    // p5 : 'images/char-princess-girl.png'
};
//var randomPlayer = Math.floor(Math.random()*5);
var player = new Player(allPlayer.p1);
//var allPlayer = [];
//allPlayer.push(player);
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [enemy1,enemy2,enemy3];
var allGems = [
    'images/Gem Blue1.png',
    'images/Gem Green1.png',
    'images/Gem Orange1.png'];
    gemindex = Math.floor(Math.random()*3);
    gem = new Gem(allGems[gemindex]);    
//var gem = new Gem(allGems.g1);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e){
    var allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
