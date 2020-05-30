class PlayS extends Phaser.Scene {
    constructor() {
        super("playSplitScene");
    }

    preload() {
        this.load.image('player1', './assets/image/Player1.png');
        this.load.image('player2', './assets/image/Player2.png');
        this.load.image('map', './assets/image/map.jpg');
        //this.load.image('livingRoom', './assets/image/livingRoom.png');
        //this.load.image('bathroom', './assets/image/bathroom.png');
        //this.load.image('kitchen', './assets/image/kitchen.png');
        //this.load.image('garage', './assets/image/garage.png');
        //this.load.image('hallway', './assets/image/kitchenGarageHall.png');
        this.load.image('background', './assets/image/background.png');
        this.load.image('UI_item', './assets/image/UI_item.png');
        this.load.image('UI_steeringwheel', './assets/image/UI_steeringwheel.png');
        this.load.spritesheet('UI_speed', './assets/image/UI_speed.png', { frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 14 });
        this.load.spritesheet('start_light', './assets/image/start_light.png', { frameWidth: 137, frameHeight: 66, startFrame: 0, endFrame: 3 });
        this.load.spritesheet('go_effect', './assets/image/go.png', { frameWidth: 200, frameHeight: 200, startFrame: 0, endFrame: 6 });
        this.load.spritesheet('firework', './assets/image/firework.png', { frameWidth: 200, frameHeight: 200, startFrame: 0, endFrame: 2 });
        this.load.spritesheet('item_box', './assets/image/item_box.png', { frameWidth: 55, frameHeight: 55, startFrame: 0, endFrame: 7 });
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

        // create animation for speed meter
        this.anims.create({
            key: 'speed_increase',
            frames: this.anims.generateFrameNumbers('UI_speed', { start: 0, end: 14, first: 0 }),
            frameRate: 5,
        })

        // create rotate animation for item box
        this.anims.create({
            key: 'box_rotate',
            frames: this.anims.generateFrameNumbers('item_box', { start: 0, end: 7, first: 0 }),
            frameRate: 8,
            repeat: -1,
        })

        this.matter.world.setBounds(-1250, -1250, 2500, 2500);
        //this.matter.world.setBounds().disableGravity();
        //console.log(this.matter.world.walls)

        // add background track
        //this.background = this.add.image(700, 700, 'background').setScale(2);
        //this.bathroom = this.add.image(2100, 700, 'bathroom').setScale(2);
        this.map = this.add.image(0, 0, 'map');
        //this.livingRoom = this.add.image(2100, 2100, 'livingRoom').setScale(2);
        //this.garage = this.add.image(2100, 3500, 'garage').setScale(2);
        //this.hallway = this.add.image(700, 2100, 'hallway').setScale(2);

        // Add item box (for now)
        this.item_box = this.matter.add.sprite(150, 150, 'item_box').setScale(0.75);

        // Hitbox for item box
        this.item_box.setBody({
            type: 'rectangle',
            width: 32,
            height: 32
        })

        this.item_box.anims.play("box_rotate");

        // Add player
        this.player = this.matter.add.sprite(0, 0, 'player1').setOrigin(0.5, 0).setScale(2);

        // Hitbox for player
        this.player.setBody({
            type: 'rectangle',
            width: 32,
            height: 47
        })

        // Steeringwheel for player
        this.SteeringWheel = this.matter.add.sprite(-2425, -2095, 'UI_steeringwheel').setScale(2.5);
        this.SteeringWheel.setCollisionGroup(-1); // Make sure steeringwheels don't collide with each other.

        // Animation delay for Steeringwheel
        this.SteeringWheelAnim = true;
        this.SteeringWheelAnim2 = true;

        // Add player2
        this.player2 = this.matter.add.sprite(150, 0, 'player2').setOrigin(0.5, 0).setScale(2);

        // Hitbox for player2
        this.player2.setBody({
            type: 'rectangle',
            width: 32,
            height: 47
        })

        // Steeringwheel for player2
        this.SteeringWheel2 = this.matter.add.sprite(-2425, -2095, 'UI_steeringwheel').setScale(2.5);
        this.SteeringWheel2.setCollisionGroup(-1); // Make sure steeringwheels don't collide with each other.

        // Animation delay for Steeringwheel2
        this.SteeringWheelAnim3 = true;
        this.SteeringWheelAnim4 = true;

        // Prevent players moving during countdown
        this.canMove = false;

        // Prevent acceleration sound playing again
        this.acceleration_play = true;
        this.acceleration = this.sound.add('acceleration_sfx', {volume: 0.3});
        this.acceleration.setRate(0.5);

        // Add player UI group
        this.player_UI = this.add.group();
            {   
                // item
                this.UI1_item = this.add.image(-2100, -2450, 'UI_item').setScale(2.5);

                // speed meter
                this.UI1_speed = this.add.sprite(-2080, -2083, 'UI_speed').setScale(2);
                this.UI1_speed.anims.load('speed_increase');

                // add objects to group
                this.player_UI.addMultiple([this.UI1_item, this.UI1_speed]);
            }
        
        // Add player2 UI group
        this.player2_UI = this.add.group();
            {   
                // item
                this.UI2_item = this.add.image(-2100, -2450, 'UI_item').setScale(2.5);

                // speed meter
                this.UI2_speed = this.add.sprite(-2080, -2083, 'UI_speed').setScale(2);
                this.UI2_speed.anims.load('speed_increase');

                // add objects to group
                this.player2_UI.addMultiple([this.UI2_item, this.UI2_speed]);
            }

        // Add 2 cameras for split screen.
        this.camera = this.cameras.main.setViewport(0, 0, (game.config.width/2), game.config.height);
        this.camera.startFollow(this.player, true, 1, 1, 0, 0);
        this.camera.setZoom(0.6);
        //this.camera.setZoom(0.5);

        //this.camera.ignore(this.player_UI);
        this.camera2 = this.cameras.add(centerX, 0, (game.config.width/2), game.config.height);
        this.camera2.startFollow(this.player2, true, 1, 1, 0, 0);
        this.camera2.setZoom(0.6);

        // Add UI Camera for camera 1
        this.UICamera = this.cameras.add(0, 0, (game.config.width/2), game.config.height);
        this.UICamera.setScroll(-2500,-2500);
        this.UICamera.ignore([this.player2_UI, this.SteeringWheel2, this.map]);

        // Add UI Camera for camera 2
        this.UICamera2 = this.cameras.add(centerX, 0, (game.config.width/2), game.config.height);
        this.UICamera2.setScroll(-2500,-2500);
        this.UICamera2.ignore([this.player_UI, this.SteeringWheel, this.map]);

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

        this.engineIdle = this.sound.add('engineIdle_sfx', {volume: 0.25, loop: true});
        this.engineIdle.play();

        // Play the engine On sound
        this.engineStart = this.sound.add('engineStart_sfx', {volume: 0.25});
        this.engineStart.play();

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
        //console.log(this.acceleration_play)
        if (this.canMove) {
            // Player 1 Movement
            // Got help from https://codepen.io/Samid737/pen/GdVZeX
            // and also from https://anexia.com/blog/en/introduction-to-the-phaser-framework/
            //console.log(this.carSpeed);
            // sets maximum forward speed to 10
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
            if (this.carSpeed <= 0.25 && this.carSpeed >= 0 && !keyDOWN.isDown) {
                this.carSpeed = 0;
                this.SteeringWheel.rotation = 0;
            } else {
                if (keyLEFT.isDown && this.SteeringWheel.rotation > -0.5) {
                    this.SteeringWheel.rotation -= 0.05;
                }

                if (keyRIGHT.isDown && this.SteeringWheel.rotation < 0.5) {
                    this.SteeringWheel.rotation += 0.05;
                }
            }

            // Car acceleration and deceleration
            if (keyUP.isDown) {
                this.carSpeed += 0.26;

                // Play the acceleration sound
                if(this.acceleration_play){
                    this.acceleration.play();
                    this.acceleration_play = false;
                    this.acceleration.on('complete', () => {
                        this.acceleration_play = true;
                    })
                }
            }
            else {
                if (this.carSpeed >= 0) {
                    this.carSpeed -= 0.05;
                }
            }

            if (keyDOWN.isDown) {
                this.carSpeed -= 0.26;
            }
            else {
                if (this.carSpeed <= 0) {
                    this.carSpeed += 0.05;
                }
            }

            // Prevents car from spinning like crazy lol
            if (!keyLEFT.isDown && !keyRIGHT.isDown) {
                this.SteeringWheel.rotation = 0;
            }

            var speedsquared = (this.player.body.velocity.x * this.player.body.velocity.x) + (this.player.body.velocity.y * this.player.body.velocity.y);
            this.player.setAngularVelocity(this.SteeringWheel.rotation * 0.15 * Math.exp(-speedsquared / 100));

            // no drift 
            this.player.setVelocityX(Math.sin(this.player.rotation) * this.carSpeed);
            this.player.setVelocityY(-Math.cos(this.player.rotation) * this.carSpeed);

            //with drift
            //this.player.setVelocityX(Math.sin(this.player.rotation - this.player.body.angularVelocity / 0.1) * this.carSpeed);
            //this.player.setVelocityY(-Math.cos(this.player.rotation - this.player.body.angularVelocity / 0.1) * this.carSpeed);

            this.carSpeedAnim = this.carSpeed;

            //console.log(this.carSpeedAnim);
            if(this.carSpeed < 0.67 && this.carSpeed > -0.67){
                this.UI1_speed.anims.load('speed_increase', 0);
            }
            else if(this.carSpeedAnim <= -0.67 && this.carSpeed > -1.34){
                this.UI1_speed.anims.load('speed_increase', 1);
            }
            else if(this.carSpeedAnim >= 0.67 && this.carSpeed < 1.34){
                this.UI1_speed.anims.load('speed_increase', 1);
            }
            else if(this.carSpeedAnim <= -1.34 && this.carSpeed > -2.01){
                this.UI1_speed.anims.load('speed_increase', 2);
            }
            else if(this.carSpeedAnim >= 1.34 && this.carSpeed < 2.01){
                this.UI1_speed.anims.load('speed_increase', 2);
            }
            else if(this.carSpeedAnim <= -2.01 && this.carSpeed > -2.68){
                this.UI1_speed.anims.load('speed_increase', 3);
            }
            else if(this.carSpeedAnim >= 2.01 && this.carSpeed < 2.68){
                this.UI1_speed.anims.load('speed_increase', 3);
            }
            else if(this.carSpeedAnim <= -2.68 && this.carSpeed > -3.35){
                this.UI1_speed.anims.load('speed_increase', 4);
            }
            else if(this.carSpeedAnim >= 2.68 && this.carSpeed < 3.35){
                this.UI1_speed.anims.load('speed_increase', 4);
            }
            else if(this.carSpeedAnim <= -3.35 && this.carSpeed > -4.02){
                this.UI1_speed.anims.load('speed_increase', 5);
            }
            else if(this.carSpeedAnim >= 3.35 && this.carSpeed < 4.02){
                this.UI1_speed.anims.load('speed_increase', 5);
            }
            else if(this.carSpeedAnim <= -4.02 && this.carSpeed > -4.69){
                this.UI1_speed.anims.load('speed_increase', 6);
            }
            else if(this.carSpeedAnim >= 4.02 && this.carSpeed < 4.69){
                this.UI1_speed.anims.load('speed_increase', 6);
            }
            else if(this.carSpeedAnim <= -4.69 && this.carSpeed > -5.36){
                this.UI1_speed.anims.load('speed_increase', 7);
            }
            else if(this.carSpeedAnim >= 4.69 && this.carSpeed < 5.36){
                this.UI1_speed.anims.load('speed_increase', 7);
            }
            else if(this.carSpeedAnim <= -5.36 && this.carSpeed > -6.03){
                this.UI1_speed.anims.load('speed_increase', 8);
            }
            else if(this.carSpeedAnim >= 5.36 && this.carSpeed < 6.03){
                this.UI1_speed.anims.load('speed_increase', 8);
            }
            else if(this.carSpeedAnim <= -6.03 && this.carSpeed > -6.7){
                this.UI1_speed.anims.load('speed_increase', 9);
            }
            else if(this.carSpeedAnim >= 6.03 && this.carSpeed < 6.7){
                this.UI1_speed.anims.load('speed_increase', 9);
            }
            else if(this.carSpeedAnim <= -6.7 && this.carSpeed > -7.37){
                this.UI1_speed.anims.load('speed_increase', 10);
            }
            else if(this.carSpeedAnim >= 6.7 && this.carSpeed < 7.37){
                this.UI1_speed.anims.load('speed_increase', 10);
            }
            else if(this.carSpeedAnim <= -7.37 && this.carSpeed > -8.04){
                this.UI1_speed.anims.load('speed_increase', 11);
            }
            else if(this.carSpeedAnim >= 7.37 && this.carSpeed < 8.04){
                this.UI1_speed.anims.load('speed_increase', 11);
            }
            else if(this.carSpeedAnim <= -8.04 && this.carSpeed > -8.71){
                this.UI1_speed.anims.load('speed_increase', 12);
            }
            else if(this.carSpeedAnim >= 8.04 && this.carSpeed < 8.71){
                this.UI1_speed.anims.load('speed_increase', 12);
            }
            else if(this.carSpeedAnim <= -8.71 && this.carSpeed > -9.38){
                this.UI1_speed.anims.load('speed_increase', 13);
            }
            else if(this.carSpeedAnim >= 8.71 && this.carSpeed < 9.38){
                this.UI1_speed.anims.load('speed_increase', 13);
            }
            else{
                this.UI1_speed.anims.load('speed_increase', 14);
            }

            // Player 2 Movement
            console.log(this.carSpeed2);
            // sets maximum forward speed to 10
            if (this.carSpeed2 >= 10) {
                this.carSpeed2 = 10;
                this.player2.setVelocityX(Math.sin(this.player2.rotation) * 10);
                this.player2.setVelocityY(-Math.cos(this.player2.rotation) * 10);
            }
    
            // sets maximum reverse speed to -10
            if (this.carSpeed2 <= -10) {
                this.carSpeed2 = -10;
                this.player2.setVelocityX(Math.sin(this.player2.rotation) * 10);
                this.player2.setVelocityY(-Math.cos(this.player2.rotation) * 10);
            }

            // Car Steering
            if (this.carSpeed2 <= 0.25 && this.carSpeed2 >= 0 && !keyS.isDown) {
                this.carSpeed2 = 0;
                this.SteeringWheel2.rotation = 0;
            } else {
                if (keyA.isDown && this.SteeringWheel2.rotation > -0.7) {
                    this.SteeringWheel2.rotation -= 0.5;
                }

                if (keyD.isDown && this.SteeringWheel2.rotation < 0.7) {
                    this.SteeringWheel2.rotation += 0.5;
                }
            }

            // Car acceleration and deceleration
            if (keyW.isDown) {
                this.carSpeed2 += 0.26;
            }
            else {
                if (this.carSpeed2 >= 0) {
                    this.carSpeed2 -= 0.05;
                }
            }

            if (keyS.isDown) {
                this.carSpeed2 -= 0.26;
            }
            else {
                if (this.carSpeed2 <= 0) {
                    this.carSpeed2 += 0.05;
                }
            }

            // Prevents car from spinning like crazy lol
            if (!keyA.isDown && !keyD.isDown) {
                this.SteeringWheel2.rotation = 0;
            }

            var speedsquared2 = (this.player2.body.velocity.x * this.player2.body.velocity.x) + (this.player2.body.velocity.y * this.player2.body.velocity.y);
            this.player2.setAngularVelocity(this.SteeringWheel2.rotation * 0.15 * Math.exp(-speedsquared2 / 100));

            // no drift 
            this.player2.setVelocityX(Math.sin(this.player2.rotation) * this.carSpeed2);
            this.player2.setVelocityY(-Math.cos(this.player2.rotation) * this.carSpeed2);

            //with drift
            //this.player.setVelocityX(Math.sin(this.player.rotation - this.player.body.angularVelocity / 0.1) * this.carSpeed2);
            //this.player.setVelocityY(-Math.cos(this.player.rotation - this.player.body.angularVelocity / 0.1) * this.carSpeed2);

            this.carSpeed2Anim = this.carSpeed2;

            //console.log(this.carSpeedAnim);
            if(this.carSpeed2 < 0.67 && this.carSpeed2 > -0.67){
                this.UI2_speed.anims.load('speed_increase', 0);
            }
            else if(this.carSpeed2Anim <= -0.67 && this.carSpeed2 > -1.34){
                this.UI2_speed.anims.load('speed_increase', 1);
            }
            else if(this.carSpeed2Anim >= 0.67 && this.carSpeed2 < 1.34){
                this.UI2_speed.anims.load('speed_increase', 1);
            }
            else if(this.carSpeed2Anim <= -1.34 && this.carSpeed2 > -2.01){
                this.UI2_speed.anims.load('speed_increase', 2);
            }
            else if(this.carSpeed2Anim >= 1.34 && this.carSpeed2 < 2.01){
                this.UI2_speed.anims.load('speed_increase', 2);
            }
            else if(this.carSpeed2Anim <= -2.01 && this.carSpeed2 > -2.68){
                this.UI2_speed.anims.load('speed_increase', 3);
            }
            else if(this.carSpeed2Anim >= 2.01 && this.carSpeed2 < 2.68){
                this.UI2_speed.anims.load('speed_increase', 3);
            }
            else if(this.carSpeed2Anim <= -2.68 && this.carSpeed2 > -3.35){
                this.UI2_speed.anims.load('speed_increase', 4);
            }
            else if(this.carSpeed2Anim >= 2.68 && this.carSpeed2 < 3.35){
                this.UI2_speed.anims.load('speed_increase', 4);
            }
            else if(this.carSpeed2Anim <= -3.35 && this.carSpeed2 > -4.02){
                this.UI2_speed.anims.load('speed_increase', 5);
            }
            else if(this.carSpeed2Anim >= 3.35 && this.carSpeed2 < 4.02){
                this.UI2_speed.anims.load('speed_increase', 5);
            }
            else if(this.carSpeed2Anim <= -4.02 && this.carSpeed2 > -4.69){
                this.UI2_speed.anims.load('speed_increase', 6);
            }
            else if(this.carSpeed2Anim >= 4.02 && this.carSpeed2 < 4.69){
                this.UI2_speed.anims.load('speed_increase', 6);
            }
            else if(this.carSpeed2Anim <= -4.69 && this.carSpeed2 > -5.36){
                this.UI2_speed.anims.load('speed_increase', 7);
            }
            else if(this.carSpeed2Anim >= 4.69 && this.carSpeed2 < 5.36){
                this.UI2_speed.anims.load('speed_increase', 7);
            }
            else if(this.carSpeed2Anim <= -5.36 && this.carSpeed2 > -6.03){
                this.UI2_speed.anims.load('speed_increase', 8);
            }
            else if(this.carSpeed2Anim >= 5.36 && this.carSpeed2 < 6.03){
                this.UI2_speed.anims.load('speed_increase', 8);
            }
            else if(this.carSpeed2Anim <= -6.03 && this.carSpeed2 > -6.7){
                this.UI2_speed.anims.load('speed_increase', 9);
            }
            else if(this.carSpeed2Anim >= 6.03 && this.carSpeed2 < 6.7){
                this.UI2_speed.anims.load('speed_increase', 9);
            }
            else if(this.carSpeed2Anim <= -6.7 && this.carSpeed2 > -7.37){
                this.UI2_speed.anims.load('speed_increase', 10);
            }
            else if(this.carSpeed2Anim >= 6.7 && this.carSpeed2 < 7.37){
                this.UI2_speed.anims.load('speed_increase', 10);
            }
            else if(this.carSpeed2Anim <= -7.37 && this.carSpeed2 > -8.04){
                this.UI2_speed.anims.load('speed_increase', 11);
            }
            else if(this.carSpeed2Anim >= 7.37 && this.carSpeed2 < 8.04){
                this.UI2_speed.anims.load('speed_increase', 11);
            }
            else if(this.carSpeed2Anim <= -8.04 && this.carSpeed2 > -8.71){
                this.UI2_speed.anims.load('speed_increase', 12);
            }
            else if(this.carSpeed2Anim >= 8.04 && this.carSpeed2 < 8.71){
                this.UI2_speed.anims.load('speed_increase', 12);
            }
            else if(this.carSpeed2Anim <= -8.71 && this.carSpeed2 > -9.38){
                this.UI2_speed.anims.load('speed_increase', 13);
            }
            else if(this.carSpeed2Anim >= 8.71 && this.carSpeed2 < 9.38){
                this.UI2_speed.anims.load('speed_increase', 13);
            }
            else{
                this.UI2_speed.anims.load('speed_increase', 14);
            }
        }
    }
}