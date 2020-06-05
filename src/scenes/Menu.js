class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // PLAYER MOVEMENT
        this.load.audio('brake', './assets/sound/brake.wav');
        this.load.audio('drift', './assets/sound/drift.wav');
        this.load.audio('engineStart', './assets/sound/engineStart.wav');
        this.load.audio('engineIdle', './assets/sound/engineIdle.wav');
        this.load.audio('acceleration', './assets/sound/acceleration.wav');
        // BACKGROUND
        this.load.image('backgroundMap', './assets/image/menuBackground.png');
        this.load.audio('bgm', './assets/sound/bgm.wav');
        this.load.audio('titlebgm', './assets/sound/mainBGM.wav');
        this.load.audio('raceStart', './assets/sound/raceStart.wav');
        this.load.audio('finalLap', './assets/sound/finalLap.wav');
        this.load.audio('lapTwo', './assets/sound/lapTwo.wav');
        this.load.audio('raceEnd', './assets/sound/raceEnd.wav');
        this.load.audio('raceResult', './assets/sound/raceResult.wav');
        this.load.audio('raceWon', './assets/sound/raceWon.wav');
        // ITEM
        this.load.audio('boost', './assets/sound/boost.wav');
        this.load.audio('usingHammer', './assets/sound/usingHammer.wav');
        this.load.audio('gettingHammerHit', './assets/sound/gettingHammerHit.wav');
        this.load.audio('plantingBan', './assets/sound/plantingBan.wav');
        this.load.audio('steppingBan', './assets/sound/steppingBan.wav');
        this.load.audio('plantingHon', './assets/sound/plantingHon.wav');
        this.load.audio('steppingHon', './assets/sound/steppingHon.wav');
        this.load.audio('itemCollect', './assets/sound/itemCollect.wav');
        // COLLISION
        this.load.audio('collideCar', './assets/sound/collideCar.wav');
        this.load.audio('collideWall', './assets/sound/collideWall.wav');
        this.load.audio('collision', './assets/sound/collision.wav');
        // ETC
        this.load.audio('waterSplash', './assets/sound/waterSplash.wav');
        this.load.audio('waterWalk', './assets/sound/waterWalk.wav');
    }

    create() {
        this.background = this.add.tileSprite(0, 0, 960, 480, 'backgroundMap').setOrigin(0, 0);
        // title display
        let titleConfig = {
            fontFamily: 'Impact',
            fontSize: '65px',
            color: '#ffffff',
            align: 'right',
            stroke: '#000000',
            strokeThickness: 6,
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWith: 0
        }

        let optionsConfig = {
            fontFamily: 'Impact',
            fontSize: '40px',
            color: '#ffffff',
            align: 'right',
            stroke: '#000000',
            strokeThickness: 6,
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWith: 0
        }

        // display menu text
        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;
        let textSpacer = 100;

        this.add.text(centerX, centerY - textSpacer, 'Micro Racers', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 10, 'press 1 to go to play scene', optionsConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 50, 'press 2 to go to tutorial scene', optionsConfig).setOrigin(0.5);

        // define keys
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyONE)) {
            game.settings = {
                raceNum: 1,
                playerWon: 0,
                player2Won: 0
            }
            this.scene.start("playScene");
        }

        if (Phaser.Input.Keyboard.JustDown(keyTWO)) {
            this.scene.start("tutorialScene");
        }
    }
}