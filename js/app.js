// Enemies our player must avoid
// var Enemy = function() {
//     // Variables applied to each of our instances go here,
//     // we've provided one for you to get started

//     // The image/sprite for our enemies, this uses
//     // a helper we've provided to easily load images
//     this.sprite = 'images/enemy-bug.png';
// };

// // Update the enemy's position, required method for game
// // Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
// };

// // Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

// **** this class represents the enemy objects ****
class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
        this.speed = speed;
        this.hitbox = { //hitbox for collision detection
            width: 94,
            height: 61
        }

    }
    update(dt) {
        if (this.x > 505) {
            this.x = -60; // resetting the enemy location after passing the right border completely.
            this.speed = randomSpeed(); // randomizing the speed each time the enemy passes the right border.
        }
        this.x = this.x + this.speed * dt;
        this.hitbox.x = this.x + 3;
        this.hitbox.y = this.y + 81;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// **** this class represents the player object with its hitbox and a method to handle user input ****
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-pink-girl.png';
        //**** hitbox dimensions for collision detection ****
        // you can play around with the dimensions if you feel they're unfair or not accurate
        this.hitbox = {
            width: 47,
            height: 64
        }
    }
    update() {
        this.hitbox.x = this.x + 28;
        this.hitbox.y = this.y + 74;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(input) {
        // **** here i am making sure the player can not escape the canvas borders ****
        switch (input) {
            case 'left':
                if (this.x < 101) {
                    break;
                }
                this.x += -101
                break;

            case 'right':
                if (this.x > 404) {
                    break;
                }
                this.x += 101
                break;

            case 'down':
                if (this.y > 399) {
                    break;
                }
                this.y += +83
                break;

            case 'up':
                if (this.y < 68) {
                    reset(true);
                }
                if (this.y < -14) {
                    break;
                }
                this.y += -83
                break;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player(505 / 2 - 50, 400);
let allEnemies = [];
allEnemies.push(new Enemy(-171, 50, randomSpeed()));
allEnemies.push(new Enemy(-171, 130, randomSpeed()));
allEnemies.push(new Enemy(-171, 220, randomSpeed()));

// **** this custom function returns a random speed for our enemies ****
function randomSpeed() {
    return 100 + Math.floor(Math.random() * 300);
}


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

// **** reset player to starting location ****
function reset(isWon) {
    //**** here i am adding 50 ms delay instead of resetting abruptly. ****
    setTimeout(() => {
        player.x = 505 / 2 - 50;
        player.y = 400;
        if (isWon) {
            alert("hey you won!");
        }
    }, 50);

}
