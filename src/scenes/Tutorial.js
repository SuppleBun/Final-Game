class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    preload() {
        this.load.image('UI_banana', './assets/image/UI_banana.png');
        this.load.image('UI_boost', './assets/image/UI_boost.png');
        this.load.image('UI_hammer', './assets/image/UI_hammer.png');
        this.load.image('UI_honey', './assets/image/UI_honey.png');
        this.load.image('wincoin', './assets/image/wincoin.png');
    }
   
    create() {
        this.add.text(10, 20, "Press 1 To Go Back To Main Menu");
        
        this.add.text(10, 60, "About: A House Theme 2 Player Racing Game With RC Cars Racing Around The House");
        this.add.text(10, 100, "Dodge Obstacles & Pick Up Items: Speed Boost, Banana, Honey, Hammer");
        this.add.text(10, 120, "Objective: Collect Win Coins By Winning Each Race");
        this.add.text(10, 140, "3 Laps per Race");
        this.add.text(10, 160, "Each Race Grants A Win Coin     To The Winner");
        this.add.image(295, 165, "wincoin");
        this.add.text(10, 180, "***The Race Ends Only When Both Players Have Finished The Race***");
        this.add.text(10, 200, "Win Condition: First To Collect 2 Win Coins Wins");
       
        this.add.text(10, 220, "Player Movement & Controls: ");
        this.add.text(10, 240, "Player 1: W: Acceleration, S: Brake, Reverse, A: Left Steer, D: Right Steer");
        this.add.text(10, 260, "Player 1 Item Slot 1: T, Item Slot 2: Y");

        this.add.text(10, 280, "Player 2: Arrows: Up: Acceleration, Down: Brake, Reverse, Left: Left Steer, Right: Right Steer");
        this.add.text(10, 300, "Player 2 Item Slot 1: O, Item Slot 2: P");

        this.add.image(20, 350, "UI_banana");
        this.add.text(40, 345, "Banana Spins A Player When Ran Over");
        this.add.image(20, 380, "UI_boost");
        this.add.text(40, 375, "Boost Gives Speed Boost To A Player For A Short Time");
        this.add.image(450, 350, "UI_hammer");
        this.add.text(475, 345, "Hammer Stuns Opposing Player For A Second");
        this.add.image(20, 420, "UI_honey");
        this.add.text(40, 410, "Honey Slows Down A Player When Stepped On For A Short Time");


        // define keys
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    }

    update() {
        // Press 1 to go to Menu
        if (Phaser.Input.Keyboard.JustDown(keyONE)) {
            this.scene.start("menuScene");
        }
    }
}