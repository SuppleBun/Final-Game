var carSpeed = 0;
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('player1', './assets/image/Player1.png');
        this.load.image('player2', './assets/image/Player2.png');
        this.load.image('steeringWheel', './assets/image/waypoint.png')
    }

    create() {
        this.matter.world.setBounds().disableGravity();

        this.add.text(20, 20, "Play Scene");
        this.add.text(20, 40, "press 1 to go back to menu");
        this.add.text(20, 60, "press 2 to go to Split Play menu");

        // variable for if waypoint has been passed.
        this.passed = false;

        // Add player
        this.player = this.matter.add.sprite(centerX, centerY, 'player1').setOrigin(0.5, 0);
        this.SteeringWheel = this.matter.add.sprite(centerX, centerY, 'steeringWheel').setOrigin(0.5, 0);

        // Add player2
        this.player2 = this.matter.add.sprite(centerX, centerY, 'player2').setOrigin(0, 0);

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
        if (Phaser.Input.Keyboard.JustDown(keyONE)) {
            this.scene.start("menuScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyTWO)) {
            this.scene.start("playSplitScene");
        }

        // Movement
        // Got help from https://codepen.io/Samid737/pen/GdVZeX
        // and also from https://anexia.com/blog/en/introduction-to-the-phaser-framework/
        if (keyLEFT.isDown && this.SteeringWheel.rotation > -0.5) {
            this.SteeringWheel.rotation -= 0.25;
        } else {
            if (this.SteeringWheel.rotation != 0) {
                this.SteeringWheel.rotation += 0.25;
            }
        }

        if (keyRIGHT.isDown && this.SteeringWheel.rotation < 0.5) {
            this.SteeringWheel.rotation += 0.25;
        } else {
            if (this.SteeringWheel.rotation != 0) {
                this.SteeringWheel.rotation -= 0.25;
            }
        }

        if (keyUP.isDown) {
            carSpeed += 0.01;
        }
        else {
            if (carSpeed >= 0) {
                carSpeed -= 0.01;
            } 
        }

        if (keyDOWN.isDown) {
            carSpeed -= 0.01;
        }
        else {
            if (carSpeed <= -0.5){
                carSpeed += 0.01;
            }  
        }

        var speedsquared = (this.player.body.velocity.x * this.player.body.velocity.x) + (this.player.body.velocity.y * this.player.body.velocity.y);
        this.player.setAngularVelocity(this.SteeringWheel.rotation * 0.05 * Math.exp(-speedsquared / 100));


        //no drift
        this.player.setVelocityX(Math.sin(this.player.rotation) * carSpeed);
        this.player.setVelocityY(-Math.cos(this.player.rotation) * carSpeed);

        //with drift
        //this.player.setVelocityX(Math.sin(this.player.rotation - this.player.body.angularVelocity / 0.1) * carSpeed);
        //this.player.setVelocityY(-Math.cos(this.player.rotation - this.player.body.angularVelocity / 0.1) * carSpeed);
    }
}