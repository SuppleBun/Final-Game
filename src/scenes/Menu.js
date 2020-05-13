class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('brake_sfx', './assets/brake.wav');
        this.load.audio('drift_sfx', './assets/drift.wav');
        this.load.audio('engine_sfx', './assets/engine.wav');
        this.load.audio('raceStart_sfx', './assets/raceStart.wav');
        this.load.audio('powerUp_sfx', './assets/engine.wav');
        this.load.audio('collision_sfx', './assets/collision.wav');
        this.load.audio('mainMenuBgm', './assets/mainMenuBgm.wav');
        this.load.audio('stageOneBgm', './assets/stageOneBgm.wav');
        this.load.audio('stageTwoBgm', './assets/stageTwoBgm.wav');
        this.load.audio('stageThreeBgm', './assets/stageThreeBgm.wav');
        this.load.audio('stageFourBgm', './assets/stageFourBgm.wav');
    }

    create() {
        // menu display
        let menuConfig = {
            fontFamily: 'BIZ UDMincho Medium',
            fontSize: '28px',
            color: "#FFFFFF",
            align: 'right',
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

        this.add.text(centerX, centerY - textSpacer, 'Final Game Project', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - textSpacer/3, 'press 1 to go to play scene', menuConfig).setOrigin(0.5);

        // define keys
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyONE)){
            this.scene.start("playScene");
        }
    }
}