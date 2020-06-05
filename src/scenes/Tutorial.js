class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    preload() {

    }

    create() {
        this.add.text(20, 20, "Press 1 To Go Back To Main Menu");
        
        this.add.text(20, 60, "Dodge Obstacles & Pick Up Items");
        this.add.text(20, 80, "Items: Speed Boost, Banana, Honey, Hammer");
        this.add.text(20, 100, "3 Laps per Race & Best of 3 Wins");

        this.add.text(20, 140, "Player 1 Movement: ");
        this.add.text(20, 160, "W: Acceleration");
        this.add.text(20, 180, "S: Reverse");
        this.add.text(20, 200, "A: Left Steer & D: Right Steer");

        this.add.text(20, 240, "Player 1 Item Slot 1: T");
        this.add.text(20, 260, "Player 1 Item Slot 2: Y");

        this.add.text(20, 300, "Player 2 Movement: ");
        this.add.text(20, 320, "Up Arrow: Acceleration");
        this.add.text(20, 340, "Down Arrow: Reverse");
        this.add.text(20, 360, "Left Arrow: Left Steer & Right Arrow: Right Steer");
        
        this.add.text(20, 400, "Player 2 Item Slot 1: Letter O");
        this.add.text(20, 420, "Player 2 Item Slot 2: P");

        // define keys
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyONE)) {
            this.scene.start("menuScene");
        }
    }
}