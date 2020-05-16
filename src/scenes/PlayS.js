class PlayS extends Phaser.Scene {
    constructor() {
        super("playSplitScene");
    }

    preload(){
        this.load.image('player1', './assets/image/Player1.png');
        this.load.image('player2', './assets/image/Player2.png');
    }

    create() {
        this.add.text(20, 20, "Play(Split) Scene");
        this.add.text(20, 40, "press 1 to go back to menu");
        this.add.text(20, 60, "press 2 to go back to main Play menu");

        // variable for if waypoint has been passed.
        this.passed = false;

        // Add player
        this.player = this.physics.add.sprite(centerX, centerY, 'player1').setOrigin(0,0);

        // Add player2
        this.player2 = this.physics.add.sprite(centerX, centerY, 'player2').setOrigin(0,0);

        // Add 2 cameras for split screen.
        this.camera = this.cameras.main.setViewport(0, 0, (game.config.width/2), game.config.height);
        this.camera.startFollow(this.player, true, 1, 1, -32, -32);
        this.camera2 = this.cameras.add(centerX, 0, (game.config.width/2), game.config.height);
        this.camera2.startFollow(this.player2, true, 1, 1, -32, -32);

        // define keys
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyONE)) {
            this.scene.start("menuScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyTWO)) {
            this.scene.start("playScene");
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
        if (keyA.isDown) {
            this.player2.x -= 2;
        }
        if (keyD.isDown) {
            this.player2.x += 2;
        }
        if (keyW.isDown) {
            this.player2.y -= 2;
        }
        if (keyS.isDown) {
            this.player2.y += 2;
        }
          
    }
}