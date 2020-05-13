class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.image('player', './assets/Player(draft).png');
    }

    create() {
        this.add.text(20, 20, "Play Scene");
        this.add.text(20, 20, "press 1 to go back to menu");

        // Add player
        this.player = this.physics.add.sprite(100, 100, 'player').setOrigin(0,0);

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