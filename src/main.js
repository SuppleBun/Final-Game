let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 480,
    fps: {
        target:60,
        forceSetTimeOut: true
    },
    physics: {
        default: 'matter',
        matter: {
            debug: false, // allows to see the hitbox of sprites
            gravity: { y: 0}
        }
    },
    scene:  [ Menu, Play, Test, Tutorial, Credits],
};

let game = new Phaser.Game(config);

// define game settings
game.settings = {
    raceNum: 1,
    playerWon: 0,
    player2Won: 0
}

// global variables
const centerX = game.config.width / 2;
const centerY = game.config.height / 2;

// reserve some keyboard variables
let keyONE, keyTWO, keyTHREE, keyFOUR;
let keyLEFT, keyUP, keyRIGHT, keyDOWN;
let keyA, keyW, keyD, keyS, keyT, keyY, keyO, keyP;

