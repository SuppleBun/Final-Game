class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        this.add.text(20, 20, "Play Scene");
        this.add.text(20, 20, "press 1 to go back to menu");

        // define keys
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyONE)) {
            this.scene.start("menuScene");
        }
    }
}