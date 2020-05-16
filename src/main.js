let config = {
    type: Phaser.AUTO,
    parent: "game",
    width: 840,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true, // allows to see the hitbox of sprites
            gravity: { y: 0}
        }
    },
    scene:  [ Menu, Play, Tutorial],
};

let game = new Phaser.Game(config);

// define game settings
game.setting = {

}

// global variables
const centerX = game.config.width / 2;
const centerY = game.config.height / 2;

// reserve some keyboard variables
let keyONE, keyTWO, keyTHREE, keyFOUR;
let keyLEFT, keyUP, keyRIGHT, keyDOWN;

