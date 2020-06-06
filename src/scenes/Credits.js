class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {

    }
   
    create() {
        this.add.text(20, 120, "Credits");

        // define keys
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyONE)) {
            this.scene.start("menuScene");
        }
    }
}