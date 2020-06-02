class PlayS extends Phaser.Scene {
    constructor() {
        super("playSplitScene");
    }

    preload() {
        this.load.image('player1', './assets/image/Player1.png');
        this.load.image('player2', './assets/image/Player2.png');
        this.load.image('map', './assets/image/map.png');
        this.load.image('background', './assets/image/background.png');
        this.load.image('UI_item', './assets/image/UI_item.png');
        this.load.image('UI_steeringwheel', './assets/image/UI_steeringwheel.png');
        this.load.image('UI_banana', './assets/image/UI_banana.png');
        this.load.image('UI_boost', './assets/image/UI_boost.png');
        this.load.image('UI_hammer', './assets/image/UI_hammer.png');
        this.load.image('UI_honey', './assets/image/UI_honey.png');
        this.load.image('UI_lap', './assets/image/UI_lap.png');
        this.load.spritesheet('UI_lapcount', './assets/image/UI_lapcount.png', { frameWidth: 36, frameHeight: 25, startFrame: 0, endFrame: 2 });
        this.load.spritesheet('UI_place', './assets/image/UI_place.png', { frameWidth: 30, frameHeight: 54, startFrame: 0, endFrame: 1 });
        this.load.spritesheet('UI_laptwo', './assets/image/UI_laptwo.png', { frameWidth: 68, frameHeight: 19, startFrame: 0, endFrame: 6 });
        this.load.spritesheet('UI_lapfinal', './assets/image/UI_lapfinal.png', { frameWidth: 132, frameHeight: 19, startFrame: 0, endFrame: 6 });
        this.load.spritesheet('UI_speed', './assets/image/UI_speed.png', { frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 14 });
        this.load.spritesheet('start_light', './assets/image/start_light.png', { frameWidth: 137, frameHeight: 66, startFrame: 0, endFrame: 3 });
        this.load.spritesheet('go_effect', './assets/image/go.png', { frameWidth: 200, frameHeight: 200, startFrame: 0, endFrame: 6 });
        this.load.spritesheet('firework', './assets/image/firework.png', { frameWidth: 200, frameHeight: 200, startFrame: 0, endFrame: 2 });
        this.load.spritesheet('item_box', './assets/image/item_box.png', { frameWidth: 55, frameHeight: 55, startFrame: 0, endFrame: 7 });
    }

    create() {
        this.carSpeed = 0;
        this.carSpeed2 = 0;
        this.boost = false;
        this.boost2 = false;
        this.banana = false;
        this.banana2 = false;
        this.hammmer = false;
        this.hammer2 = false;
        this.honey = false;
        this.honey2 = false;

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
        })

        // create rotate animation for item box
        this.anims.create({
            key: 'box_rotate',
            frames: this.anims.generateFrameNumbers('item_box', { start: 0, end: 7, first: 0 }),
            frameRate: 8,
            repeat: -1,
        })

        // create rotate animation for lap count
        this.anims.create({
            key: 'lap_count',
            frames: this.anims.generateFrameNumbers('UI_lapcount', { start: 0, end: 2, first: 0 }),
        })

        // create rotate animation for UI place
        this.anims.create({
            key: 'UI_place',
            frames: this.anims.generateFrameNumbers('UI_place', { start: 0, end: 1, first: 0 }),
        })

        // create rotate animation for Lap 2 UI
        this.anims.create({
            key: 'lap_two',
            frames: this.anims.generateFrameNumbers('UI_laptwo', { start: 0, end: 6, first: 0 }),
            frameRate: 8,
        })

        // create rotate animation for Final Lap UI
        this.anims.create({
            key: 'lap_final',
            frames: this.anims.generateFrameNumbers('UI_lapfinal', { start: 0, end: 6, first: 0 }),
            frameRate: 8,
        })

        this.matter.world.setBounds(-1250, -1250, 2500, 2500);
        //this.matter.world.setBounds().disableGravity();
        //console.log(this.matter.world.walls)
        this.map = this.add.image(0, 0, 'map');


        // OUTER WALLS -----------------------------------------------------
        this.wall = this.matter.add.sprite(110, -1245);
        this.wall.setBody({
            type: 'rectangle',
            width: 1580,
            height: 10
        })
        this.wall.setStatic(true);

        this.wall2 = this.matter.add.sprite(-780, -1150);
        this.wall2.setBody({
            type: 'rectangle',
            width: 260,
            height: 10,
        })
        this.wall2.rotation = 2.35;
        this.wall2.setStatic(true);

        this.wall3 = this.matter.add.sprite(-860, -40);
        this.wall3.setBody({
            type: 'rectangle',
            width: 2035,
            height: 10,
        })
        this.wall3.rotation = 1.5708; // 90 degrees
        this.wall3.setStatic(true);

        this.wall4 = this.matter.add.sprite(-760, 1100);
        this.wall4.setBody({
            type: 'rectangle',
            width: 330,
            height: 10,
        })
        this.wall4.rotation = -2.25;
        this.wall4.setStatic(true);

        this.wall5 = this.matter.add.sprite(-60, 1230);
        this.wall5.setBody({
            type: 'rectangle',
            width: 1220,
            height: 10
        })
        this.wall5.setStatic(true); 

        // Made a mistake of leaving a wall in the middle
        this.wall_middle = this.matter.add.sprite(710, 1070);
        this.wall_middle.setBody({
            type: 'rectangle',
            width: 470,
            height: 10,
        })
        this.wall_middle.rotation = 2.36;
        this.wall_middle.setStatic(true);

        this.wall6 = this.matter.add.sprite(875, 590);
        this.wall6.setBody({
            type: 'rectangle',
            width: 650,
            height: 10,
        })
        this.wall6.rotation = 1.5708; // 90 degrees
        this.wall6.setStatic(true);

        this.wall7 = this.matter.add.sprite(900, 245);
        this.wall7.setBody({
            type: 'rectangle',
            width: 70,
            height: 10,
        })
        this.wall7.rotation = 2.35; // 45 degrees
        this.wall7.setStatic(true);

        this.wall8 = this.matter.add.sprite(1030, 223);
        this.wall8.setBody({
            type: 'rectangle',
            width: 220,
            height: 10,
        })
        this.wall8.setStatic(true);

        this.wall9 = this.matter.add.sprite(1175, 180);
        this.wall9.setBody({
            type: 'rectangle',
            width: 120,
            height: 10,
        })
        this.wall9.rotation = 2.35; // 45 degrees
        this.wall9.setStatic(true);

        this.wall10 = this.matter.add.sprite(1220, -110);
        this.wall10.setBody({
            type: 'rectangle',
            width: 520,
            height: 10,
        })
        this.wall10.rotation = 1.575; 
        this.wall10.setStatic(true);

        this.wall11 = this.matter.add.sprite(1115, -475);
        this.wall11.setBody({
            type: 'rectangle',
            width: 293,
            height: 10,
        })
        this.wall11.rotation = 0.8; // 135 degrees
        this.wall11.setStatic(true);

        this.wall12 = this.matter.add.sprite(1015, -860);
        this.wall12.setBody({
            type: 'rectangle',
            width: 580,
            height: 10,
        })
        this.wall12.rotation = 1.5708; // 90 degrees
        this.wall12.setStatic(true);

        this.wall13 = this.matter.add.sprite(960, -1190);
        this.wall13.setBody({
            type: 'rectangle',
            width: 165,
            height: 10,
        })
        this.wall13.rotation = 0.8; // 135 degrees
        this.wall13.setStatic(true);
        // OUTER WALLS -----------------------------------------------------

        // INNER WALLS -----------------------------------------------------
        this.wall14 = this.matter.add.sprite(170, -1035);
        this.wall14.setBody({
            type: 'rectangle',
            width: 960,
            height: 10
        })
        this.wall14.setStatic(true);

        this.wall15 = this.matter.add.sprite(-360, -990);
        this.wall15.setBody({
            type: 'rectangle',
            width: 137,
            height: 10,
        })
        this.wall15.rotation = 2.35;
        this.wall15.setStatic(true);

        this.wall16 = this.matter.add.sprite(-400, -20);
        this.wall16.setBody({
            type: 'rectangle',
            width: 1850,
            height: 10,
        })
        this.wall16.rotation = 1.5708; // 90 degrees
        this.wall16.setStatic(true);

        this.wall17 = this.matter.add.sprite(-370, 945);
        this.wall17.setBody({
            type: 'rectangle',
            width: 100,
            height: 10,
        })
        this.wall17.rotation = -2.25;
        this.wall17.setStatic(true);

        this.wall18 = this.matter.add.sprite(25, 985);
        this.wall18.setBody({
            type: 'rectangle',
            width: 728,
            height: 10
        })
        this.wall18.setStatic(true); 

        // inside of the mistake wall
        this.wall_middleinside = this.matter.add.sprite(485, 885);
        this.wall_middleinside.setBody({
            type: 'rectangle',
            width: 280,
            height: 10,
        })
        this.wall_middleinside.rotation = 2.35;
        this.wall_middleinside.setStatic(true);

        this.wall19 = this.matter.add.sprite(585, 400);
        this.wall19.setBody({
            type: 'rectangle',
            width: 777,
            height: 10,
        })
        this.wall19.rotation = 1.5708; // 90 degrees
        this.wall19.setStatic(true);

        this.wall20 = this.matter.add.sprite(625, -30);
        this.wall20.setBody({
            type: 'rectangle',
            width: 120,
            height: 10,
        })
        this.wall20.rotation = 2.35; // 45 degrees
        this.wall20.setStatic(true);

        this.wall21 = this.matter.add.sprite(785, -70);
        this.wall21.setBody({
            type: 'rectangle',
            width: 235,
            height: 10,
        })
        this.wall21.setStatic(true);

        this.wall22 = this.matter.add.sprite(915, -80);
        this.wall22.setBody({
            type: 'rectangle',
            width: 35,
            height: 10,
        })
        this.wall22.rotation = 2.55; 
        this.wall22.setStatic(true);

        this.wall23 = this.matter.add.sprite(925, -200);
        this.wall23.setBody({
            type: 'rectangle',
            width: 230,
            height: 10,
        })
        this.wall23.rotation = 1.575; 
        this.wall23.setStatic(true);

        this.wall24 = this.matter.add.sprite(840, -400);
        this.wall24.setBody({
            type: 'rectangle',
            width: 260,
            height: 10,
        })
        this.wall24.rotation = 0.78; // 135 degrees
        this.wall24.setStatic(true);

        this.wall25 = this.matter.add.sprite(750, -710);
        this.wall25.setBody({
            type: 'rectangle',
            width: 450,
            height: 10,
        })
        this.wall25.rotation = 1.5708; // 90 degrees
        this.wall25.setStatic(true);

        this.wall26 = this.matter.add.sprite(700, -980);
        this.wall26.setBody({
            type: 'rectangle',
            width: 145,
            height: 10,
        })
        this.wall26.rotation = 0.79; // 135 degrees
        this.wall26.setStatic(true);
        // INNER WALLS -----------------------------------------------------

        // OBJECTS ON TRACK ------------------------------------------------
        this.door = this.matter.add.sprite(1170, -205);
        this.door.setBody({
            type: 'rectangle',
            width: 245,
            height: 20,
        })
        this.door.rotation = 1.295;
        this.door.setStatic(true);

        this.door2 = this.matter.add.sprite(-110, -1220);
        this.door2.setBody({
            type: 'rectangle',
            width: 173,
            height: 13,
        })
        this.door2.rotation = 2.97;
        this.door2.setStatic(true);

        this.toy = this.matter.add.sprite(799, 736);
        this.toy.setBody({
            type: 'rectangle',
            width: 47,
            height: 35,
        })
        this.toy.setStatic(true);

        this.toy2 = this.matter.add.sprite(805, 575);
        this.toy2.setBody({
            type: 'rectangle',
            width: 47,
            height: 34,
        })
        this.toy2.setStatic(true);

        this.toy3 = this.matter.add.sprite(749, 136);
        this.toy3.setBody({
            type: 'rectangle',
            width: 47,
            height: 35,
        })
        this.toy3.setStatic(true);

        this.toy4 = this.matter.add.sprite(598, 1040);
        this.toy4.setBody({
            type: 'rectangle',
            width: 47,
            height: 35,
        })
        this.toy4.setStatic(true);
        // OBJECTS ON TRACK ------------------------------------------------

        // Add item box (for now)
        this.item_box = this.matter.add.sprite(830, -680, 'item_box').setScale(1).setStatic(true).setSensor(true);
        this.item_box2 = this.matter.add.sprite(940, -680, 'item_box').setScale(1).setStatic(true).setSensor(true);
        this.item_box3 = this.matter.add.sprite(-513, -890, 'item_box').setScale(1).setStatic(true).setSensor(true);
        this.item_box4 = this.matter.add.sprite(-740, -890, 'item_box').setScale(1).setStatic(true).setSensor(true);
        this.item_box5 = this.matter.add.sprite(-660, 1050, 'item_box').setScale(1).setStatic(true).setSensor(true);
        this.item_box6 = this.matter.add.sprite(-500, 950, 'item_box').setScale(1).setStatic(true).setSensor(true);
        this.item_box7 = this.matter.add.sprite(620, 860, 'item_box').setScale(1).setStatic(true).setSensor(true);
        this.item_box8 = this.matter.add.sprite(775, 860, 'item_box').setScale(1).setStatic(true).setSensor(true);
        //this.item_box.setStatic(true);

        // Hitbox for item box
        this.item_box.setBody({
            type: 'rectangle',
            width: 48,
            height: 48,
        }, { label: 'item_box' })

        this.item_box2.setBody({
            type: 'rectangle',
            width: 48,
            height: 48,
        }, { label: 'item_box' })

        this.item_box3.setBody({
            type: 'rectangle',
            width: 48,
            height: 48,
        }, { label: 'item_box' })

        this.item_box4.setBody({
            type: 'rectangle',
            width: 48,
            height: 48,
        }, { label: 'item_box' })

        this.item_box5.setBody({
            type: 'rectangle',
            width: 48,
            height: 48,
        }, { label: 'item_box' })

        this.item_box6.setBody({
            type: 'rectangle',
            width: 48,
            height: 48,
        }, { label: 'item_box' })

        this.item_box7.setBody({
            type: 'rectangle',
            width: 48,
            height: 48,
        }, { label: 'item_box' })

        this.item_box8.setBody({
            type: 'rectangle',
            width: 48,
            height: 48,
        }, { label: 'item_box' })

        this.item_box.anims.play("box_rotate");
        this.item_box2.anims.play("box_rotate");
        this.item_box3.anims.play("box_rotate");
        this.item_box4.anims.play("box_rotate");
        this.item_box5.anims.play("box_rotate");
        this.item_box6.anims.play("box_rotate");
        this.item_box7.anims.play("box_rotate");
        this.item_box8.anims.play("box_rotate");

        // Add player
        this.player = this.matter.add.sprite(650, 399.9, 'player1').setOrigin(0.5, 0).setScale(2);

        // Hitbox for player
        this.player.setBody({
            type: 'rectangle',
            width: 50,
            height: 94
        }, { label: 'player1' })

        // Define lap count and waypoints for player
        this.player_lap = 1;
        this.player_waypoint = 1;

        // Steeringwheel for player
        this.SteeringWheel = this.matter.add.sprite(-3425, -3095, 'UI_steeringwheel').setScale(2.5);
        this.SteeringWheel.setCollisionGroup(-1); // Make sure steeringwheels don't collide with each other.

        // Animation delay for Steeringwheel
        this.SteeringWheelAnim = true;
        this.SteeringWheelAnim2 = true;

        // Add player2
        this.player2 = this.matter.add.sprite(800, 399.9, 'player2').setOrigin(0.5, 0).setScale(2);

        // Hitbox for player2
        this.player2.setBody({
            type: 'rectangle',
            width: 50,
            height: 94
        }, { label: 'player2' })

        // Define lap count for player2
        this.player2_lap = 1;
        this.player2_waypoint = 1;

        // Steeringwheel for player2
        this.SteeringWheel2 = this.matter.add.sprite(-2425, -2095, 'UI_steeringwheel').setScale(2.5);
        this.SteeringWheel2.setCollisionGroup(-1); // Make sure steeringwheels don't collide with each other.

        // Animation delay for Steeringwheel2
        this.SteeringWheelAnim3 = true;
        this.SteeringWheelAnim4 = true;

        // Prevent players moving during countdown
        this.canMove = false; // should be false

        // Prevent acceleration sound playing again
        this.acceleration_play = true;
        this.acceleration = this.sound.add('acceleration_sfx', { volume: 0.3 });
        this.acceleration.setRate(0.5);

        // Add player UI group
        this.player_UI = this.add.group();
        {
            // item
            this.UI1_item = this.add.image(-3100, -3450, 'UI_item').setScale(2.5);

            // speed meter
            this.UI1_speed = this.add.sprite(-3080, -3083, 'UI_speed').setScale(2);
            this.UI1_speed.anims.load('speed_increase');

            // lap text
            this.UI1_lap = this.add.image(-3450, -3462, 'UI_lap').setScale(2);

            // lap count
            this.UI1_lapcount = this.add.sprite(-3370, -3462, 'UI_lapcount').setScale(2.25);
            this.UI1_lapcount.anims.load('lap_count');

            // place
            this.UI1_place = this.add.sprite(-3460, -3380, 'UI_place').setScale(1.75);
            this.UI1_place.anims.load('UI_place');

            // add objects to group
            this.player_UI.addMultiple([this.UI1_item, this.UI1_speed, this.UI1_lap, this.UI1_lapcount, this.UI1_place]);
        }


        // Add player2 UI group
        this.player2_UI = this.add.group();
        {
            // item1
            this.UI2_item = this.add.image(-2100, -2450, 'UI_item').setScale(2.5);

            // speed meter
            this.UI2_speed = this.add.sprite(-2080, -2083, 'UI_speed').setScale(2);
            this.UI2_speed.anims.load('speed_increase');

            // lap text
            this.UI2_lap = this.add.image(-2450, -2462, 'UI_lap').setScale(2);

            // lap count
            this.UI2_lapcount = this.add.sprite(-2370, -2462, 'UI_lapcount').setScale(2.25);
            this.UI2_lapcount.anims.load('lap_count');

            // place
            this.UI2_place = this.add.sprite(-2460, -2380, 'UI_first').setScale(1.75);
            this.UI2_place.anims.load('UI_place');

            // add objects to group
            this.player2_UI.addMultiple([this.UI2_item, this.UI2_speed, this.UI2_lap, this.UI2_lapcount, this.UI2_place]);
        }

        //this.hamemr = this.add.image(-2126, -2450, 'UI_hammer').setScale(1.7);
        //this.honey = this.add.image(-2059, -2438, 'UI_honey').setScale(0.7);

        // Add 2 cameras for split screen.
        this.camera = this.cameras.main.setViewport(0, 0, (game.config.width / 2), game.config.height);
        this.camera.startFollow(this.player, true, 1, 1, 0, 0);
        this.camera.setZoom(0.6);
        //this.camera.setZoom(0.3);

        //this.camera.ignore(this.player_UI);
        this.camera2 = this.cameras.add(centerX, 0, (game.config.width / 2), game.config.height);
        this.camera2.startFollow(this.player2, true, 1, 1, 0, 0);
        this.camera2.setZoom(0.6);

        // Add UI Camera for camera 1
        this.UICamera = this.cameras.add(0, 0, (game.config.width / 2), game.config.height);
        this.UICamera.setScroll(-3500, -3500);
        this.UICamera.ignore([this.player2_UI, this.SteeringWheel2, this.map]);

        // Add UI Camera for camera 2
        this.UICamera2 = this.cameras.add(centerX, 0, (game.config.width / 2), game.config.height);
        this.UICamera2.setScroll(-2500, -2500);
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

        this.engineIdle = this.sound.add('engineIdle_sfx', { volume: 0.25, loop: true });
        this.engineIdle.play();

        // Play the engine On sound
        this.engineStart = this.sound.add('engineStart_sfx', { volume: 0.25 });
        this.engineStart.play();

        // Play the countdown animation
        let countdown = this.add.sprite(-3260, -3350, 'start_light').setScale(1);
        let countdown2 = this.add.sprite(-2260, -2350, 'start_light').setScale(1);
        countdown.anims.play('countdown');
        countdown2.anims.play('countdown');
        countdown.on('animationcomplete', () => {
            countdown.destroy(true);
            countdown2.destroy(true);
            // Players can now move
            this.canMove = true;

            // Play bgm
            this.bgm = this.sound.add('bgm', { volume: 0.3 });
            this.bgm.setLoop(true);
            this.bgm.play();

            // Play 'Go!' and firework effect
            let go_effect = this.add.sprite(-3250, -3300, 'go_effect').setScale(1);
            let go_effect2 = this.add.sprite(-2250, -2300, 'go_effect').setScale(1);
            let firework_effect = this.add.sprite(-3250, -3300, 'firework').setScale(2);
            let firework_effect2 = this.add.sprite(-2250, -2300, 'firework').setScale(2);

            go_effect.anims.play('go');
            go_effect2.anims.play('go');
            firework_effect.anims.play('firework');
            firework_effect2.anims.play('firework');

            go_effect.on('animationcomplete', () => {
                go_effect.destroy(true);
                go_effect2.destroy(true);
            })
            firework_effect.on('animationcomplete', () => {
                firework_effect.destroy(true);
                firework_effect2.destroy(true);
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

        // Stopwatch to track player's time.
        let stopwatchConfig = {
            fontFamily: 'Press Start 2P',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: "#843605",
        }

        this.timer = this.time.addEvent({
            delay: 0,
            loop: false
        })

       // console.log(this.timer.getElapsed());

        // To prevent players entering finish line repeatedly.
        this.lineEnter = false;
        this.lineEnter2 = false;

        // delay for entering goal line
        this.time.addEvent({
            delay: 10000, // 10 seconds 
            callback: () => {
                this.lineEnter = true;
            },
            loop: true
        })

        // delay for entering goal line
        this.time.addEvent({
            delay: 10000, // 10 seconds 
            callback: () => {
                this.lineEnter2 = true;
            },
            loop: true
        })

        // Add item slots for players
        this.player.item_slot = 0;
        this.player.item_slot2 = 0;

        this.player2.item_slot = 0;
        this.player2.item_slot2 = 0;
        //console.log(this.item_box);

        // collision detection between item box and the players
        // got help from https://www.html5gamedevs.com/topic/38484-matter-and-collisions/
        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            // player1 picking up item
            if(bodyA.label == 'item_box' && bodyB.label == 'player1') {
                //console.log('item_box hit player1');
                //var item = Phaser.Math.Between(1,4);
                var x = bodyA.position.x;
                var y = bodyA.position.y;
                bodyA.gameObject.destroy();
                //this.speedBoost('p1');
                //this.hammerATK('p1');
                this.respawnBox(x,y);
            }

            // player1 picking up item
            if(bodyB.label == 'item_box' && bodyA.label == 'player1') {
                //console.log('item_box hit player1');
                var x = bodyB.position.x;
                var y = bodyB.position.y;
                bodyB.gameObject.destroy();
                //this.speedBoost('p1');
                //this.hammerATK('p1');
                this.respawnBox(x,y);
            }   

            // player2 picking up item
            if(bodyA.label == 'item_box' && bodyB.label == 'player2') {
                //console.log('item_box hit player2')
                var x = bodyA.position.x;
                var y = bodyA.position.y;
                bodyA.gameObject.destroy();
                //this.speedBoost('p2');
                this.hammerATK('p2');
                this.respawnBox(x,y);
            }

            // player2 picking up item
            if(bodyB.label == 'item_box' && bodyA.label == 'player2') {
                //console.log('item_box hit player2')
                var x = bodyB.position.x;
                var y = bodyB.position.y;
                bodyB.gameObject.destroy();
                //this.speedBoost('p2');
                this.hammerATK('p2');
                this.respawnBox(x,y);
            }
        }, this);
    }

    respawnBox(x,y) {
        this.time.addEvent({
            delay: 3000, 
            callback: () => {
                this.item_box = this.matter.add.sprite(x, y, 'item_box').setScale(1).setStatic(true).setSensor(true);
                this.item_box.setBody({
                    type: 'rectangle',
                    width: 48,
                    height: 48,
                }, { label: 'item_box' })
                this.item_box.anims.play("box_rotate");
            },
            loop: false
        })
    }
    
    // function that activates the speed boost
    // passes in either 'p1' or 'p2' for which car to boost
    speedBoost(player) {
        if (player == 'p1') {
            this.boost = true;
        } else {
            this.boost2 = true;
        }
        this.time.addEvent({
            delay: 1700, 
            callback: () => {
                //console.log("stopped boosting");
                if (player == 'p1') {
                    this.boost = false;
                } else {
                    this.boost2 = false;
                }
            },
            loop: false
        })
    }

    bananaATK(player) {
        if (player == 'p1') {
            this.banana = true;
        } else {
            this.banana2 = true;
        }
    }

    honeyATK(player) {
        if (player == 'p1') {
            this.honey = true;
        } else {
            this.honey2 = true;
        }
    }

    hammerATK(player) {
        if (player == 'p1') {
            this.hammer = true;
        } else {
            this.hammer2 = true;
        }
        this.time.addEvent({
            delay: 1700, 
            callback: () => {
                //console.log("stopped boosting");
                if (player == 'p1') {
                    this.hammer = false;
                } else {
                    this.hammer2 = false;
                }
            },
            loop: false
        })
    }

    update() {
        //console.log('x: '+this.player.x);
        //console.log('y: '+this.player.y);
        //console.log("player1: " + this.player_waypoint);
        //console.log("player2: " + this.player2_waypoint);
       // console.log(this.player_waypoint);
       console.log(this.timer.getElapsedSeconds());
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
            // sets maximum forward speed to 5
            if (this.carSpeed >= 5 && this.boost == false) {
                this.carSpeed = 5;
                this.player.setVelocityX(Math.sin(this.player.rotation) * 5);
                this.player.setVelocityY(-Math.cos(this.player.rotation) * 5);
            }

            // player1 activating speedboost
            if (this.boost == true) {
                this.carSpeed = 7.5;
                this.player.setVelocityX(Math.sin(this.player.rotation) * 7.5);
                this.player.setVelocityY(-Math.cos(this.player.rotation) * 7.5);
            }

            // player1 activating hammerATK
            if (this.hammer == true) {
                this.carSpeed2 = 0;
                this.player2.setVelocityX(0);
                this.player2.setVelocityY(0);
                this.SteeringWheel2.rotation = 0;
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

                /*// Play the acceleration sound
                if (this.acceleration_play) {
                    this.acceleration.play();
                    this.acceleration_play = false;
                    this.acceleration.on('complete', () => {
                        this.acceleration_play = true;
                    })
                }*/
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
            if (this.carSpeed < 0.335 && this.carSpeed > -0.335) {
                this.UI1_speed.anims.load('speed_increase', 0);
            }
            else if (this.carSpeedAnim <= -0.335 && this.carSpeed > -0.67) {
                this.UI1_speed.anims.load('speed_increase', 1);
            }
            else if (this.carSpeedAnim >= 0.335 && this.carSpeed < 0.67) {
                this.UI1_speed.anims.load('speed_increase', 1);
            }
            else if (this.carSpeedAnim <= -0.67 && this.carSpeed > -1.005) {
                this.UI1_speed.anims.load('speed_increase', 2);
            }
            else if (this.carSpeedAnim >= 0.67 && this.carSpeed < 1.005) {
                this.UI1_speed.anims.load('speed_increase', 2);
            }
            else if (this.carSpeedAnim <= -1.005 && this.carSpeed > -1.34) {
                this.UI1_speed.anims.load('speed_increase', 3);
            }
            else if (this.carSpeedAnim >= 1.005 && this.carSpeed < 1.34) {
                this.UI1_speed.anims.load('speed_increase', 3);
            }
            else if (this.carSpeedAnim <= -1.34 && this.carSpeed > -1.675) {
                this.UI1_speed.anims.load('speed_increase', 4);
            }
            else if (this.carSpeedAnim >= 1.34 && this.carSpeed < 1.675) {
                this.UI1_speed.anims.load('speed_increase', 4);
            }
            else if (this.carSpeedAnim <= -1.675 && this.carSpeed > -2.01) {
                this.UI1_speed.anims.load('speed_increase', 5);
            }
            else if (this.carSpeedAnim >= 1.675 && this.carSpeed < 2.01) {
                this.UI1_speed.anims.load('speed_increase', 5);
            }
            else if (this.carSpeedAnim <= -2.01 && this.carSpeed > -2.345) {
                this.UI1_speed.anims.load('speed_increase', 6);
            }
            else if (this.carSpeedAnim >= 2.01 && this.carSpeed < 2.345) {
                this.UI1_speed.anims.load('speed_increase', 6);
            }
            else if (this.carSpeedAnim <= -2.345 && this.carSpeed > -2.68) {
                this.UI1_speed.anims.load('speed_increase', 7);
            }
            else if (this.carSpeedAnim >= 2.345 && this.carSpeed < 2.68) {
                this.UI1_speed.anims.load('speed_increase', 7);
            }
            else if (this.carSpeedAnim <= -2.68 && this.carSpeed > -3.015) {
                this.UI1_speed.anims.load('speed_increase', 8);
            }
            else if (this.carSpeedAnim >= 2.68 && this.carSpeed < 3.015) {
                this.UI1_speed.anims.load('speed_increase', 8);
            }
            else if (this.carSpeedAnim <= -3.015 && this.carSpeed > -3.35) {
                this.UI1_speed.anims.load('speed_increase', 9);
            }
            else if (this.carSpeedAnim >= 3.015 && this.carSpeed < 3.35) {
                this.UI1_speed.anims.load('speed_increase', 9);
            }
            else if (this.carSpeedAnim <= -3.35 && this.carSpeed > -3.685) {
                this.UI1_speed.anims.load('speed_increase', 10);
            }
            else if (this.carSpeedAnim >= 3.35 && this.carSpeed < 3.685) {
                this.UI1_speed.anims.load('speed_increase', 10);
            }
            else if (this.carSpeedAnim <= -3.685 && this.carSpeed > -4.02) {
                this.UI1_speed.anims.load('speed_increase', 11);
            }
            else if (this.carSpeedAnim >= 3.685 && this.carSpeed < 4.02) {
                this.UI1_speed.anims.load('speed_increase', 11);
            }
            else if (this.carSpeedAnim <= -4.02 && this.carSpeed > -4.355) {
                this.UI1_speed.anims.load('speed_increase', 12);
            }
            else if (this.carSpeedAnim >= 4.02 && this.carSpeed < 4.355) {
                this.UI1_speed.anims.load('speed_increase', 12);
            }
            else if (this.carSpeedAnim <= -4.355 && this.carSpeed > -4.69) {
                this.UI1_speed.anims.load('speed_increase', 13);
            }
            else if (this.carSpeedAnim >= 4.355 && this.carSpeed < 4.69) {
                this.UI1_speed.anims.load('speed_increase', 13);
            }
            else {
                this.UI1_speed.anims.load('speed_increase', 14);
            }

            if((this.player.x >= -830 && this.player.x <= 850) && (this.player.y >= 850 && this.player.y <= 1200)){
                if(this.player_waypoint == 4 || this.player_waypoint == 5){ // check if player is coming from right direction
                    this.player_waypoint = 5;
                }
                else{ // wrong way
                    console.log("player 1 wrong way")
                }   
            }
            else if((this.player.x >= 400 && this.player.x <= 850) && (this.player.y > 400 && this.player.y <= 850)){ // to goal
                if(this.player_waypoint == 5 || this.player_waypoint == 6){
                    this.player_waypoint = 6;
                }
                else{ // wrong way
                    console.log("player 1 wrong way")
                } 
            }
            else if((this.player.x >= 400 && this.player.x <= 850) && (this.player.y < 350 && this.player.y >= 0)){ 
                if(this.player_waypoint == 6 || this.player_waypoint == 1){
                    this.player_waypoint = 1;
                }
                else{ // wrong way
                    console.log("player 1 wrong way")
                } 
            }
            else if((this.player.x >= 780 && this.player.x <= 1200) && (this.player.y >= -940 && this.player.y <= 180)){
                if(this.player_waypoint == 1 || this.player_waypoint == 2){
                    this.player_waypoint = 2;
                }
                else{ // wrong way
                    console.log("player 1 wrong way")
                } 
            }
            else if((this.player.x >= -830 && this.player.x <= 970) && (this.player.y >= -1220 && this.player.y <= -940)){
                if(this.player_waypoint == 2 || this.player_waypoint == 3){
                    this.player_waypoint = 3;
                }
                else{ // wrong way
                    console.log("player 1 wrong way")
                } 
            }
            else{
                if(!(this.player.x >= 400 && this.player.x <= 850) && (this.player.y <= 400 && this.player.y >= 350)){
                    if(this.player_waypoint == 3 || this.player_waypoint == 4){
                        this.player_waypoint = 4;
                    }
                    else{ // wrong way
                        console.log("player 1 wrong way")
                    } 
                }
            }

            if(this.lineEnter){
                if((this.player.x >= 400 && this.player.x <= 850) && (this.player.y <= 400 && this.player.y >= 350)){ // goal line
                    if(this.player_waypoint == 6){
                        this.player_lap += 1;
                        this.lineEnter = false;
                        if(this.player_lap == 2){ // Lap 2
                            this.UI1_lapcount.anims.load('lap_count', 1);
                            let UI1_laptwo = this.add.sprite(-3260, -3350, 'UI_laptwo').setScale(2.5);
                            UI1_laptwo.anims.play("lap_two");
                            UI1_laptwo.on('animationcomplete', () => {
                                UI1_laptwo.destroy(true);
                            })
                        }
                        if(this.player_lap == 3){ // Last lap
                            this.UI1_lapcount.anims.load('lap_count', 2);
                            let UI1_lapfinal = this.add.sprite(-3260, -3350, 'UI_lapfinal').setScale(2.5);
                            UI1_lapfinal.anims.play("lap_final");
                            UI1_lapfinal.on('animationcomplete', () => {
                                UI1_lapfinal.destroy(true);
                            })
                        }
                        if(this.player_lap == 4){ // Over
                            
                        }
                    }

                }
            }

            // Player 2 Movement
            //console.log(this.carSpeed2);
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

            // player2 activating speedboost
            if (this.boost2 == true) {
                this.carSpeed2 = 7.5;
                this.player2.setVelocityX(Math.sin(this.player2.rotation) * 7.5);
                this.player2.setVelocityY(-Math.cos(this.player2.rotation) * 7.5);
            }

            // player2 activating hammerATK
            if (this.hammer2 == true) {
                this.carSpeed = 0;
                this.player.setVelocityX(0);
                this.player.setVelocityY(0);
                this.SteeringWheel.rotation = 0;
            }

            // Car Steering
            if (this.carSpeed2 <= 0.25 && this.carSpeed2 >= 0 && !keyS.isDown) {
                this.carSpeed2 = 0;
                this.SteeringWheel2.rotation = 0;
            } else {
                if (keyA.isDown && this.SteeringWheel2.rotation > -0.5) {
                    this.SteeringWheel2.rotation -= 0.05;
                }

                if (keyD.isDown && this.SteeringWheel2.rotation < 0.5) {
                    this.SteeringWheel2.rotation += 0.05;
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
            if (this.carSpeed2 < 0.67/2 && this.carSpeed2 > -0.67/2) {
                this.UI2_speed.anims.load('speed_increase', 0);
            }
            else if (this.carSpeed2Anim <= -0.67/2 && this.carSpeed2 > -1.34/2) {
                this.UI2_speed.anims.load('speed_increase', 1);
            }
            else if (this.carSpeed2Anim >= 0.67/2 && this.carSpeed2 < 1.34/2) {
                this.UI2_speed.anims.load('speed_increase', 1);
            }
            else if (this.carSpeed2Anim <= -1.34/2 && this.carSpeed2 > -2.01/2) {
                this.UI2_speed.anims.load('speed_increase', 2);
            }
            else if (this.carSpeed2Anim >= 1.34/2 && this.carSpeed2 < 2.01/2) {
                this.UI2_speed.anims.load('speed_increase', 2);
            }
            else if (this.carSpeed2Anim <= -2.01/2 && this.carSpeed2 > -2.68/2) {
                this.UI2_speed.anims.load('speed_increase', 3);
            }
            else if (this.carSpeed2Anim >= 2.01/2 && this.carSpeed2 < 2.68/2) {
                this.UI2_speed.anims.load('speed_increase', 3);
            }
            else if (this.carSpeed2Anim <= -2.68/2 && this.carSpeed2 > -3.35/2) {
                this.UI2_speed.anims.load('speed_increase', 4);
            }
            else if (this.carSpeed2Anim >= 2.68/2 && this.carSpeed2 < 3.35/2) {
                this.UI2_speed.anims.load('speed_increase', 4);
            }
            else if (this.carSpeed2Anim <= -3.35/2 && this.carSpeed2 > -4.02/2) {
                this.UI2_speed.anims.load('speed_increase', 5);
            }
            else if (this.carSpeed2Anim >= 3.35/2 && this.carSpeed2 < 4.02/2) {
                this.UI2_speed.anims.load('speed_increase', 5);
            }
            else if (this.carSpeed2Anim <= -4.02/2 && this.carSpeed2 > -4.69/2) {
                this.UI2_speed.anims.load('speed_increase', 6);
            }
            else if (this.carSpeed2Anim >= 4.02/2 && this.carSpeed2 < 4.69/2) {
                this.UI2_speed.anims.load('speed_increase', 6);
            }
            else if (this.carSpeed2Anim <= -4.69/2 && this.carSpeed2 > -5.36/2) {
                this.UI2_speed.anims.load('speed_increase', 7);
            }
            else if (this.carSpeed2Anim >= 4.69/2 && this.carSpeed2 < 5.36/2) {
                this.UI2_speed.anims.load('speed_increase', 7);
            }
            else if (this.carSpeed2Anim <= -5.36/2 && this.carSpeed2 > -6.03/2) {
                this.UI2_speed.anims.load('speed_increase', 8);
            }
            else if (this.carSpeed2Anim >= 5.36/2 && this.carSpeed2 < 6.03/2) {
                this.UI2_speed.anims.load('speed_increase', 8);
            }
            else if (this.carSpeed2Anim <= -6.03/2 && this.carSpeed2 > -6.7/2) {
                this.UI2_speed.anims.load('speed_increase', 9);
            }
            else if (this.carSpeed2Anim >= 6.03/2 && this.carSpeed2 < 6.7/2) {
                this.UI2_speed.anims.load('speed_increase', 9);
            }
            else if (this.carSpeed2Anim <= -6.7/2 && this.carSpeed2 > -7.37/2) {
                this.UI2_speed.anims.load('speed_increase', 10);
            }
            else if (this.carSpeed2Anim >= 6.7/2 && this.carSpeed2 < 7.37/2) {
                this.UI2_speed.anims.load('speed_increase', 10);
            }
            else if (this.carSpeed2Anim <= -7.37/2 && this.carSpeed2 > -8.04/2) {
                this.UI2_speed.anims.load('speed_increase', 11);
            }
            else if (this.carSpeed2Anim >= 7.37/2 && this.carSpeed2 < 8.04/2) {
                this.UI2_speed.anims.load('speed_increase', 11);
            }
            else if (this.carSpeed2Anim <= -8.04/2 && this.carSpeed2 > -8.71/2) {
                this.UI2_speed.anims.load('speed_increase', 12);
            }
            else if (this.carSpeed2Anim >= 8.04/2 && this.carSpeed2 < 8.71/2) {
                this.UI2_speed.anims.load('speed_increase', 12);
            }
            else if (this.carSpeed2Anim <= -8.71/2 && this.carSpeed2 > -9.38/2) {
                this.UI2_speed.anims.load('speed_increase', 13);
            }
            else if (this.carSpeed2Anim >= 8.71/2 && this.carSpeed2 < 9.38/2) {
                this.UI2_speed.anims.load('speed_increase', 13);
            }
            else {
                this.UI2_speed.anims.load('speed_increase', 14);
            }
        }

        if((this.player2.x >= -830 && this.player2.x <= 850) && (this.player2.y >= 850 && this.player2.y <= 1200)){
            if(this.player2_waypoint == 4 || this.player2_waypoint == 5){ // check if player2 is coming from right direction
                this.player2_waypoint = 5;
            }
            else{ // wrong way
                console.log("player 2 wrong way")
            }   
        }
        else if((this.player2.x >= 400 && this.player2.x <= 850) && (this.player2.y > 400 && this.player2.y <= 850)){ // to goal
            if(this.player2_waypoint == 5 || this.player2_waypoint == 6){
                this.player2_waypoint = 6;
            }
            else{ // wrong way
                console.log("player2 1 wrong way")
            } 
        }
        else if((this.player2.x >= 400 && this.player2.x <= 850) && (this.player2.y < 350 && this.player2.y >= 0)){ 
            if(this.player2_waypoint == 6 || this.player2_waypoint == 1){
                this.player2_waypoint = 1;
            }
            else{ // wrong way
                console.log("player 1 wrong way")
            } 
        }
        else if((this.player2.x >= 780 && this.player2.x <= 1200) && (this.player2.y >= -940 && this.player2.y <= 180)){
            if(this.player2_waypoint == 1 || this.player2_waypoint == 2){
                this.player2_waypoint = 2;
            }
            else{ // wrong way
                console.log("player 2 wrong way")
            } 
        }
        else if((this.player2.x >= -830 && this.player2.x <= 970) && (this.player2.y >= -1220 && this.player2.y <= -940)){
            if(this.player2_waypoint == 2 || this.player2_waypoint == 3){
                this.player2_waypoint = 3;
            }
            else{ // wrong way
                console.log("player 2 wrong way")
            } 
        }
        else{
            if(!(this.player2.x >= 400 && this.player2.x <= 850) && (this.player2.y <= 400 && this.player2.y >= 350)){
                if(this.player2_waypoint == 3 || this.player2_waypoint == 4){
                    this.player2_waypoint = 4;
                }
                else{ // wrong way
                    console.log("player 2 wrong way")
                } 
            }
        }

        if(this.lineEnter2){
            if((this.player2.x >= 400 && this.player2.x <= 850) && (this.player2.y <= 400 && this.player2.y >= 350)){ // goal line
                if(this.player2_waypoint == 6){
                    this.player2_lap += 1;
                    this.lineEnter2 = false;
                    if(this.player2_lap == 2){ // Lap 2
                        this.UI2_lapcount.anims.load('lap_count', 1);
                        let UI2_laptwo = this.add.sprite(-2260, -2350, 'UI_laptwo').setScale(2.5);
                        UI2_laptwo.anims.play("lap_two");
                        UI2_laptwo.on('animationcomplete', () => {
                            UI2_laptwo.destroy(true);
                        })
                    }
                    if(this.player2_lap == 3){ // Last lap
                        this.UI2_lapcount.anims.load('lap_count', 2);
                        let UI2_lapfinal = this.add.sprite(-2260, -2350, 'UI_lapfinal').setScale(2.5);
                        UI2_lapfinal.anims.play("lap_final");
                        UI2_lapfinal.on('animationcomplete', () => {
                            UI2_lapfinal.destroy(true);
                        })
                    }
                    if(this.player2_lap == 4){ // Over
                        
                    }

                }
                
            }
        }

        if(this.player_lap == this.player2_lap){ // only check if players are on same lap.
            if(this.player_waypoint == this.player2_waypoint){ // players are in same box
                if(this.player_waypoint == 1){
                    if(this.player.y < this.player2.y){ // player 1 is ahead
                        this.UI1_place.anims.load('UI_place', 0);
                        this.UI2_place.anims.load('UI_place', 1);
                    }
                    else{ // player 2 is ahead
                        this.UI1_place.anims.load('UI_place', 1);
                        this.UI2_place.anims.load('UI_place', 0);
                    }
                }
                else if(this.player_waypoint == 2){
                    if(this.player.y < this.player2.y){ // player 1 is ahead
                        this.UI1_place.anims.load('UI_place', 0);
                        this.UI2_place.anims.load('UI_place', 1);
                    }
                    else{ // player 2 is ahead
                        this.UI1_place.anims.load('UI_place', 1);
                        this.UI2_place.anims.load('UI_place', 0);
                    }
                }
                else if(this.player_waypoint == 3){ 
                    if(this.player.x < this.player2.x){ // player 1 is ahead
                        this.UI1_place.anims.load('UI_place', 0);
                        this.UI2_place.anims.load('UI_place', 1);
                    }
                    else{ // player 2 is ahead
                        this.UI1_place.anims.load('UI_place', 1);
                        this.UI2_place.anims.load('UI_place', 0);
                    }
                }
                else if(this.player_waypoint == 4){
                    if(this.player.y > this.player2.y){ // player 1 is ahead
                        this.UI1_place.anims.load('UI_place', 0);
                        this.UI2_place.anims.load('UI_place', 1);
                    }
                    else{ // player 2 is ahead
                        this.UI1_place.anims.load('UI_place', 1);
                        this.UI2_place.anims.load('UI_place', 0);
                    }
                }
                else if(this.player_waypoint == 5){
                    if(this.player.x > this.player2.x){ // player 1 is ahead
                        this.UI1_place.anims.load('UI_place', 0);
                        this.UI2_place.anims.load('UI_place', 1);
                    }
                    else{ // player 2 is ahead
                        this.UI1_place.anims.load('UI_place', 1);
                        this.UI2_place.anims.load('UI_place', 0);
                    }
                }
                else{ // waypoint == 6
                    if(this.player.y < this.player2.y){ // player 1 is ahead
                        this.UI1_place.anims.load('UI_place', 0);
                        this.UI2_place.anims.load('UI_place', 1);
                    }
                    else{ // player 2 is ahead
                        this.UI1_place.anims.load('UI_place', 1);
                        this.UI2_place.anims.load('UI_place', 0);
                    }
                }
            }
            else if(this.player_waypoint > this.player2_waypoint){ // player 1 is ahead
                this.UI1_place.anims.load('UI_place', 0);
                this.UI2_place.anims.load('UI_place', 1);
            }
            else{ // player 2 is ahead
                this.UI1_place.anims.load('UI_place', 1);
                this.UI2_place.anims.load('UI_place', 0);
            }
        }
        else if(this.player_lap > this.player2_lap){ // player 1 has lap lead
            this.UI1_place.anims.load('UI_place', 0);
            this.UI2_place.anims.load('UI_place', 1);
        }
        else{ // player 2 has lap lead
            this.UI1_place.anims.load('UI_place', 1);
            this.UI2_place.anims.load('UI_place', 0);
        }
    }
}