
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('player1', './assets/image/Player1.png');
        this.load.image('player2', './assets/image/Player2.png');
    }

    create() {
        this.matter.world.setBounds().disableGravity();

        this.add.text(20, 20, "Player Movement Scene");
        this.add.text(20, 40, "press 1 to go back to Main menu");
        this.add.text(20, 60, "press 2 to go to Gameplay scene");
        this.add.text(20, 80, "Player1: Arrow keys to move");
        this.add.text(20, 100, "Player2: WASD to move");

        // Add player
        this.player = this.matter.add.sprite(centerX, centerY, 'player1').setOrigin(0.5, 0);
        this.SteeringWheel = this.matter.add.sprite(100, 100, 'steeringWheel').setOrigin(0.5, 0);

        // Add player2
        this.player2 = this.matter.add.sprite(centerX, centerY, 'player2').setOrigin(0, 0);

        // Add camera
        this.camera = this.cameras.main.setViewport(0, 0, game.config.width - 64, game.config.height - 64);
        this.camera.startFollow(this.player);

        // define scene change keys
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

        // define acceleration key
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        // define brake key
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // define steering key
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.carSpeed = 0;

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

        // Car Steering
        // sets the maximum speed to 5
        if (this.carSpeed >= 5) {
            this.carSpeed = 5;
            this.player.setVelocityX(Math.sin(this.player.rotation) * 5);
            this.player.setVelocityY(-Math.cos(this.player.rotation) * 5);
        }

        // sets maximum reverse speed to -5
        if (this.carSpeed <= -5) {
            this.carSpeed = -5;
            this.player.setVelocityX(Math.sin(this.player.rotation) * 5);
            this.player.setVelocityY(-Math.cos(this.player.rotation) * 5);
        }

        console.log(this.carSpeed);
        
        if (this.carSpeed < 0.01 && this.carSpeed > -0.009999999999999913 && !keyDOWN.isDown) {
            this.SteeringWheel.rotation = 0;
        } else {
            if (keyLEFT.isDown && this.SteeringWheel.rotation > -0.7) {
                this.SteeringWheel.rotation -= 0.25;
            }

            if (keyRIGHT.isDown && this.SteeringWheel.rotation < 0.7) {
                this.SteeringWheel.rotation += 0.25;
            }
        }

        // Car acceleration and deceleration
        if (keyUP.isDown) {
            this.carSpeed += 0.01;
        }
        else {
            if (this.carSpeed >= 0) {
                this.carSpeed -= 0.01;
            }
        }

        if (keyDOWN.isDown) {
            this.carSpeed -= 0.01;
        }
        else {
            if (this.carSpeed <= 0) {
                this.carSpeed += 0.01;
            }
        }

        // Prevents car from spinning like crazy lol
        if (!keyLEFT.isDown && !keyRIGHT.isDown) {
            this.SteeringWheel.rotation = 0;
        }

        var speedsquared = (this.player.body.velocity.x * this.player.body.velocity.x) + (this.player.body.velocity.y * this.player.body.velocity.y);
        this.player.setAngularVelocity(this.SteeringWheel.rotation * 0.03 * Math.exp(-speedsquared / 100));

        // no drift 
        this.player.setVelocityX(Math.sin(this.player.rotation) * this.carSpeed);
        this.player.setVelocityY(-Math.cos(this.player.rotation) * this.carSpeed);

        //with drift
        //this.player.setVelocityX(Math.sin(this.player.rotation - this.player.body.angularVelocity / 0.1) * this.carSpeed);
        //this.player.setVelocityY(-Math.cos(this.player.rotation - this.player.body.angularVelocity / 0.1) * this.carSpeed);
    }
}