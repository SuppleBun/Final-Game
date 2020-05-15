class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.image('player', './assets/image/Player(top-down).png');
        this.load.image('computer1', './assets/image/computer1.png');
        this.load.image('waypoint', './assets/image/waypoint.png');
    }

    create() {
        this.add.text(20, 20, "Play Scene");
        this.add.text(20, 40, "press 1 to go back to menu");

        // Add player
        this.player = this.physics.add.sprite(centerX, centerY, 'player').setOrigin(0,0);

        // Add camera
        this.camera = this.cameras.main.setViewport(0, 0, game.config.width, game.config.height);
        this.camera.startFollow(this.player);

        // define keys
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyONE)) {
            this.scene.start("menuScene");
        }
        if (keyLEFT.isDown) {
            this.player.x -= 2;
        }
        if (keyRIGHT.isDown) {
            this.player.x += 2;
        }
        if (keyUP.isDown) {
            this.player.y -= 2;
        }
        if (keyDOWN.isDown) {
            this.player.y += 2;
        }
    }
}