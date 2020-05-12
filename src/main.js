let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false, // allows to see the hitbox of sprites
            gravity: { y: 0}
        }
    },
    scene:  [ MainMenu, Play, Tutorial ],
};

let game = new Phaser.Game(config);

// define game settings
game.setting = {

}

// reserve some keyboard variables
let keyONE, keyTWO, keyTHREE, keyFOUR;
let keyUP, keyDOWN, keyF;

