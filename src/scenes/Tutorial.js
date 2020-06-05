class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    preload() {
        this.load.image('UI_banana', './assets/image/UI_banana.png');
        this.load.image('UI_boost', './assets/image/UI_boost.png');
        this.load.image('UI_hammer', './assets/image/UI_hammer.png');
        this.load.image('UI_honey', './assets/image/UI_honey.png');
    }

    create() {
        this.add.text(20, 20, "Press 1 To Go Back To Main Menu");
        
        this.add.text(20, 60, "About: A House Theme Racing Game With RC Cars Racing Around The House");
        this.add.text(20, 80, "Map: Living Room -> Bathrrom -> Kitchen -> Garage");
        this.add.text(20, 100, "Dodge Obstacles & Pick Up Items During The Race");
        this.add.text(20, 120, "Items: Speed Boost, Banana, Honey, Hammer");
        this.add.text(20, 140, "3 Laps per Race & Best of 3 Wins");
       
        this.add.text(20, 180, "Player 1 Movement: ");
        this.add.text(20, 200, "W: Acceleration, S: Reverse, A: Left Steer, D: Right Steer");
        this.add.text(20, 220, "Player 2 Movement: ");
        this.add.text(20, 240, "Arrows: Up: Acceleration, Down: Reverse, Left: Left Steer, Right: Right Steer");

        this.add.text(20, 280, "Player 1 Item Slot 1: T, Item Slot 2: Y");
        this.add.text(20, 300, "Player 2 Item Slot 1: O, Item Slot 2: P");

        this.add.image(30, 360, "UI_banana");
        this.add.text(50, 350, "Banana Spins A Player When Ran Over");
        this.add.image(30, 400, "UI_boost");
        this.add.text(50, 390, "Boost Gives Speed Boost To A Player For A Short Time");
        this.add.image(450, 360, "UI_hammer");
        this.add.text(475, 350, "Hammer Stuns Opposing Player For A Second");
        this.add.image(30, 450, "UI_honey");
        this.add.text(50, 440, "Honey Slows Opposing Player For A Short Time");


        // define keys
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyONE)) {
            this.scene.start("menuScene");
        }
    }
}