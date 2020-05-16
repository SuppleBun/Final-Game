class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('player1', './assets/image/Player1.png');
        this.load.image('player2', './assets/image/Player2.png');
    }

    create() {
        this.add.text(20, 20, "Play Scene");
        this.add.text(20, 40, "press 1 to go back to menu");
        this.add.text(20, 60, "press 2 to go to Split Play menu");

        // variable for if waypoint has been passed.
        this.passed = false;

        // Add player
        this.player = this.physics.add.sprite(centerX, centerY, 'player1').setOrigin(0.5, 0);

        // Add player2
        this.player2 = this.physics.add.sprite(centerX, centerY, 'player2').setOrigin(0, 0);

        // Add camera
        this.camera = this.cameras.main.setViewport(0, 0, game.config.width - 64, game.config.height - 64);
        this.camera.startFollow(this.player);

        // define scene change keys
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

        // define acceleration key
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        // define brake key
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        // define steering key
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // define other keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {
        var velocity = 0;

        if (Phaser.Input.Keyboard.JustDown(keyONE)) {
            this.scene.start("menuScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyTWO)) {
            this.scene.start("playSplitScene");
        }

        // Movement
        if (keyLEFT.isDown) {
            this.player.x -= 1;
            this.player.angle = -90;
        }
        if (keyRIGHT.isDown) {
            this.player.x += 1;
            this.player.angle = 90;
        }

        if (keyUP.isDown) {
            if (keyUP.isDown && keyLEFT.isDown) {
                this.player.angle = -45;
                this.player.y -= 1;
            }

            else if (keyUP.isDown && keyRIGHT.isDown) {
                this.player.angle = 45;
                this.player.y -= 1;
            }

            else {
                this.player.y -= 1;
                this.player.angle = 0;
            }
        }

        if (keyDOWN.isDown) {
            if (keyDOWN.isDown && keyLEFT.isDown) {
                this.player.angle = -135;
                this.player.y += 1;
            }

            else if (keyDOWN.isDown && keyRIGHT.isDown) {
                this.player.angle = 135;
                this.player.y += 1;
            }
            else {
                this.player.y += 1;
                this.player.angle = 180;
            }
        }
    }
}