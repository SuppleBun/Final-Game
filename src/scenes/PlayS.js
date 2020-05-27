class PlayS extends Phaser.Scene {
    constructor() {
        super("playSplitScene");
    }

    preload() {
        this.load.image('player1', './assets/image/Player1.png');
        this.load.image('player2', './assets/image/Player2.png');
        this.load.image('steeringWheel', './assets/image/UI_steeringwheel.png');
        this.load.image('steeringWheel2', './assets/image/UI_steeringwheel2.png');
        this.load.image('livingRoom', './assets/image/livingRoom.png');
        this.load.image('bathroom', './assets/image/bathroom.png');
        this.load.image('kitchen', './assets/image/kitchen.png');
        this.load.image('background', './assets/image/background.png');
        this.load.spritesheet('start_light', './assets/image/start_light.png', { frameWidth: 137, frameHeight: 66, startFrame: 0, endFrame: 3 });
        this.load.spritesheet('go_effect', './assets/image/go.png', { frameWidth: 200, frameHeight: 200, startFrame: 0, endFrame: 6 });
        this.load.spritesheet('firework', './assets/image/firework.png', { frameWidth: 200, frameHeight: 200, startFrame: 0, endFrame: 2 });
    }

    create() {

        this.carSpeed = 0;
        this.carSpeed2 = 0;

        // create animation for countdown-light
        this.anims.create({
            key: 'countdown',
            frames: this.anims.generateFrameNumbers('start_light', { start: 0, end: 3, first: 0 }),
            frameRate: 0.9,
        })

        // create animation for 'GO!' effect
        this.anims.create({
            key: 'go',
            frames: this.anims.generateFrameNumbers('go_effect', { start: 0, end: 6, first: 0 }),
            frameRate: 12,
        })

        // create animation for firework effect
        this.anims.create({
            key: 'firework',
            frames: this.anims.generateFrameNumbers('firework', { start: 0, end: 2, first: 0 }),
            frameRate: 10,
        })

        this.matter.world.setBounds(0, 0, 1400, 1400);
        //this.matter.world.setBounds().disableGravity();
        //console.log(this.matter.world.walls)

        this.add.text(20, 20, "Gameplay Scene");
        this.add.text(20, 40, "press 1 to go back to Main Menu");
        this.add.text(20, 60, "press 2 to go back to Player movement menu");
        this.add.text(20, 80, "Player1: Arrow keys to move");
        this.add.text(20, 100, "Player2: WASD to move");

        this.add.image(700, 700, 'background').setScale(2);
        this.add.image(700, 700, 'livingRoom').setScale(2);


        // Add player
        this.player = this.matter.add.sprite(1270, 1150, 'player1').setOrigin(0.5, 0);

        // Hitbox for player
        this.player.setBody({
            type: 'rectangle',
            width: 32,
            height: 47
        })

        // Steeringwheel for player
        this.SteeringWheel = this.matter.add.sprite(1500, 1500, 'steeringWheel').setOrigin(0.5, 0);

        // Add player2
        this.player2 = this.matter.add.sprite(1335, 1150, 'player2').setOrigin(0.5, 0);

        // Hitbox for player2
        this.player2.setBody({
            type: 'rectangle',
            width: 32,
            height: 47
        })

        // Steeringwheel for player2
        this.SteeringWheel2 = this.matter.add.sprite(1550, 1550, 'steeringWheel2').setOrigin(0.5, 0);

        // Prevent players moving during countdown
        this.canMove = false;

        // Add 2 cameras for split screen.
        this.camera = this.cameras.main.setViewport(0, 0, (game.config.width / 2), game.config.height);
        this.camera.startFollow(this.player, true, 1, 1, 0, -32);
        this.camera2 = this.cameras.add(centerX, 0, (game.config.width / 2), game.config.height);
        this.camera2.startFollow(this.player2, true, 1, 1, 0, -32);

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

        //this.engineOn = this.sound.add('engine_sfx', {volume: 0.5});
        //this.engineOn.setLoop(true);
        //this.engineOn.play();

        // Play the engine On sound
        this.sound.play('engineStart_sfx');

        // Play the countdown animation
        let countdown = this.add.sprite(this.player.x + 32, this.player.y - 100, 'start_light');
        countdown.anims.play('countdown');
        countdown.on('animationcomplete', () => {
            countdown.destroy(true);
            // Players can now move
            this.canMove = true;

            // Play bgm
            this.bgm = this.sound.add('bgm', { volume: 0.3 });
            this.bgm.setLoop(true);
            this.bgm.play();

            // Play 'Go!' and firework effect
            let go_effect = this.add.sprite(this.player.x, this.player.y, 'go_effect');
            let firework_effect = this.add.sprite(this.player.x, this.player.y, 'firework').setScale(2);

            go_effect.anims.play('go');
            firework_effect.anims.play('firework');

            go_effect.on('animationcomplete', () => {
                go_effect.destroy(true);
            })
            firework_effect.on('animationcomplete', () => {
                firework_effect.destroy(true);
            })

        })

        // delay before game starts
        this.time.addEvent({
            delay: 1000, // 1 second 
            callback: () => {
                // Play countdown sound
                this.raceStart = this.sound.add('raceStart_sfx', { volume: 0.5 });
                this.raceStart.play();
            },
            loop: false
        })
    }

    update() {
        //console.log(this.player.x)
        if (Phaser.Input.Keyboard.JustDown(keyONE)) {
            this.scene.start("menuScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyTWO)) {
            this.scene.start("playScene");
        }
        console.log(this.canMove)
        if (this.canMove) {
            // Player 1Movement
            // Got help from https://codepen.io/Samid737/pen/GdVZeX
            // and also from https://anexia.com/blog/en/introduction-to-the-phaser-framework/
            console.log(this.carSpeed);
            // sets maximum forward speed to 5
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

            // Car Steering
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

            // sets the maximum speed to 5
            if (this.carSpeed >= 5) {
                this.carSpeed = 5;
                this.player.setVelocityX(Math.sin(this.player.rotation) * 5);
                this.player.setVelocityY(-Math.cos(this.player.rotation) * 5);
            }

            //with drift
            //this.player.setVelocityX(Math.sin(this.player.rotation - this.player.body.angularVelocity / 0.1) * this.carSpeed);
            //this.player.setVelocityY(-Math.cos(this.player.rotation - this.player.body.angularVelocity / 0.1) * this.carSpeed);

            // Player 2 Movement

            // sets maximum forward speed to 5
            if (this.carSpeed2 >= 5) {
                this.carSpeed2 = 5;
                this.player2.setVelocityX(Math.sin(this.player2.rotation) * 5);
                this.player2.setVelocityY(-Math.cos(this.player2.rotation) * 5);
            }
    
            // sets maximum reverse speed to -5
            if (this.carSpeed2 <= -5) {
                this.carSpeed2 = -5;
                this.player2.setVelocityX(Math.sin(this.player2.rotation) * 5);
                this.player2.setVelocityY(-Math.cos(this.player2.rotation) * 5);
            }

            // Car Steering
            if (this.carSpeed2 < 0.01 && this.carSpeed2 > -0.009999999999999754 && !keyS.isDown) {
                this.SteeringWheel2.rotation = 0;
            } else {
                if (keyA.isDown && this.SteeringWheel2.rotation > -0.7) {
                    this.SteeringWheel2.rotation -= 0.25;
                }

                if (keyD.isDown && this.SteeringWheel2.rotation < 0.7) {
                    this.SteeringWheel2.rotation += 0.25;
                }
            }

            // Car acceleration and deceleration
            if (keyW.isDown) {
                this.carSpeed2 += 0.01;
            }
            else {
                if (this.carSpeed2 >= 0) {
                    this.carSpeed2 -= 0.01;
                }
            }

            if (keyS.isDown) {
                this.carSpeed2 -= 0.01;
            }
            else {
                if (this.carSpeed2 <= 0) {
                    this.carSpeed2 += 0.01;
                }
            }

            // Prevents car from spinning like crazy lol
            if (!keyA.isDown && !keyD.isDown) {
                this.SteeringWheel2.rotation = 0;
            }

            var speedsquared2 = (this.player2.body.velocity.x * this.player2.body.velocity.x) + (this.player2.body.velocity.y * this.player2.body.velocity.y);
            this.player2.setAngularVelocity(this.SteeringWheel2.rotation * 0.03 * Math.exp(-speedsquared2 / 100));

            // no drift 
            this.player2.setVelocityX(Math.sin(this.player2.rotation) * this.carSpeed2);
            this.player2.setVelocityY(-Math.cos(this.player2.rotation) * this.carSpeed2);

            //with drift
            //this.player.setVelocityX(Math.sin(this.player.rotation - this.player.body.angularVelocity / 0.1) * this.carSpeed2);
            //this.player.setVelocityY(-Math.cos(this.player.rotation - this.player.body.angularVelocity / 0.1) * this.carSpeed2);
        }
    }
}