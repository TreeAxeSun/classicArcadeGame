var level = 1; //Starting level
document.getElementById('level').innerHTML = level;

var highestLevel = 1; //Starting highest level
document.getElementById('highestLevel').innerHTML = highestLevel;

// Enemy constructor
var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

//Enemy's action (move and speed)
Enemy.prototype.update = function (dt) {
    if (this.x < 505) {
        this.x = this.x + this.speed * dt;
        if (this.x < player.x + 40 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y) {
            level = 1;
            document.getElementById('level').innerHTML = level;
            this.speed = 100; //Enemy's speed return 100;
            restart();
        }

        //When player reaches the water, enemy's speed up
        if (player.y < 10) {
            this.x = this.x + (this.speed = this.speed * 1.1) * dt;
        }
    } else {
        this.x = -100;
    }
    // If the enemy and the player collide.
    if (this.x < player.x + 40 &&
        this.x + 60 > player.x &&
        this.y < player.y + 60 &&
        this.y + 40 > player.y) {

        level = 1;
        document.getElementById('level').innerHTML = level;
        this.speed = 70; //Enemy's speed return 70;
        restart();
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player constructor
const Player = function () {
    this.x = 200;
    this.y = 440;
    this.sprite = 'images/char-cat-girl.png';
}


Player.prototype.update = function () {

    //If the player reaches the water
    if (player.y < 10) {
        level = ++level;
        document.getElementById('level').innerHTML = level;
        if (level > highestLevel) {
            highestLevel = (highestLevel + 1);
            document.getElementById('highestLevel').innerHTML = highestLevel;
        }
        restart();
        //If player's level reaches the 11, alert message will appear.
        setTimeout(function () {
            if (level === 11) {
                alert("finish");
                location.reload();
            }
        }, 300);
    }
};


Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player's moving key value
Player.prototype.handleInput = function (move) {
    if (move == 'left' && this.x > 0) {
        this.x -= 50;
    }
    if (move == 'right' && this.x < 400) {
        this.x += 50;
    }
    if (move == 'up' && this.y > 1) {
        this.y -= 50;
    }
    if (move == 'down' && this.y < 400) {
        this.y += 50;
    }
};

//Player returns first position.
restart = function () {
    player.x = 200;
    player.y = 440;
};

//Make each enemy's object
const Enemy1 = function (x, y, speed) {
    Enemy.call(this, x, y, speed);
}
const Enemy2 = function (x, y, speed) {
    Enemy.call(this, x, y, speed);
}
const Enemy3 = function (x, y, speed) {
    Enemy.call(this, x, y, speed);
}
const Enemy4 = function (x, y, speed) {
    Enemy.call(this, x, y, speed);
}

//Inherit Enemy prototype to each enemy constructor
Enemy1.prototype = Object.create(Enemy.prototype);
Enemy1.prototype.constructor = Enemy1;

Enemy2.prototype = Object.create(Enemy.prototype);
Enemy2.prototype.constructor = Enemy2;

Enemy3.prototype = Object.create(Enemy.prototype);
Enemy3.prototype.constructor = Enemy3;

Enemy4.prototype = Object.create(Enemy.prototype);
Enemy4.prototype.constructor = Enemy4;

//Create each instance
const enemy1 = new Enemy1(-400, 60, 100);
const enemy2 = new Enemy(-100, 140, 80);
const enemy3 = new Enemy(-200, 220, 90);
const enemy4 = new Enemy(-300, 310, 70);


const allEnemies = [enemy1, enemy2, enemy3, enemy4]

//Create player instance
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});