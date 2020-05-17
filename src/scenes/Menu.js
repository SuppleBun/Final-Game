class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('brake_sfx', './assets/sound/brake.wav');
        this.load.audio('drift_sfx', './assets/sound/drift.wav');
        this.load.audio('engineStart_sfx', './assets/sound/engineStart.wav');
        this.load.audio('raceStart_sfx', './assets/sound/raceStart.wav');
        this.load.audio('powerUp_sfx', './assets/sound/engine.wav');
        this.load.audio('collision_sfx', './assets/sound/collision.wav');
        this.load.audio('bgm', './assets/sound/bgm.wav');
        this.load.audio('acceleration_sfx', './assets/sound/acceleration.wav');
        
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
        this.add.text(centerX, centerY - textSpacer/9, 'press 2 to go to tutorial scene', menuConfig).setOrigin(0.5);

        // define keys
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyONE)){
            this.scene.start("playScene");
        }

        if(Phaser.Input.Keyboard.JustDown(keyTWO)){
            this.scene.start("tutorialScene");
        }
    }
}