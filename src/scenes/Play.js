class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // PLAYER MODEL
        this.load.image('player1', './assets/image/Player1.png');
        this.load.image('player2', './assets/image/Player2.png');
        // MAP
        this.load.image('map', './assets/image/map.png');
        this.load.image('background', './assets/image/background.png');
        // UI
        this.load.image('UI_item', './assets/image/UI_item.png');
        this.load.image('UI_steeringwheel', './assets/image/UI_steeringwheel.png');
        this.load.image('UI_banana', './assets/image/UI_banana.png');
        this.load.image('UI_boost', './assets/image/UI_boost.png');
        this.load.image('UI_hammer', './assets/image/UI_hammer.png');
        this.load.image('UI_honey', './assets/image/UI_honey.png');
        this.load.image('UI_lap', './assets/image/UI_lap.png');
        this.load.image('UI_timeboard', './assets/image/UI_timeboard.png');
        this.load.image('UI_wincoin', './assets/image/wincoin.png');
        this.load.spritesheet('UI_lapcount', './assets/image/UI_lapcount.png', { frameWidth: 36, frameHeight: 25, startFrame: 0, endFrame: 2 });
        this.load.spritesheet('UI_place', './assets/image/UI_place.png', { frameWidth: 30, frameHeight: 54, startFrame: 0, endFrame: 1 });
        this.load.spritesheet('UI_laptwo', './assets/image/UI_laptwo.png', { frameWidth: 68, frameHeight: 19, startFrame: 0, endFrame: 6 });
        this.load.spritesheet('UI_lapfinal', './assets/image/UI_lapfinal.png', { frameWidth: 132, frameHeight: 19, startFrame: 0, endFrame: 6 });
        this.load.spritesheet('UI_raceone', './assets/image/UI_raceone.png', { frameWidth: 88, frameHeight: 19, startFrame: 0, endFrame: 4 });
        this.load.spritesheet('UI_racetwo', './assets/image/UI_racetwo.png', { frameWidth: 88, frameHeight: 19, startFrame: 0, endFrame: 4 });
        this.load.spritesheet('UI_racefinal', './assets/image/UI_racefinal.png', { frameWidth: 150, frameHeight: 19, startFrame: 0, endFrame: 4 });
        this.load.spritesheet('UI_speed', './assets/image/UI_speed.png', { frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 14 });
        this.load.spritesheet('start_light', './assets/image/start_light.png', { frameWidth: 137, frameHeight: 66, startFrame: 0, endFrame: 3 });
        this.load.spritesheet('go_effect', './assets/image/go.png', { frameWidth: 200, frameHeight: 200, startFrame: 0, endFrame: 6 });
        this.load.spritesheet('firework', './assets/image/firework.png', { frameWidth: 200, frameHeight: 200, startFrame: 0, endFrame: 2 });
        this.load.spritesheet('UI_scoreboard', './assets/image/UI_scoreboard.png', { frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 2 });
        this.load.spritesheet('UI_wrongway', './assets/image/wrongway.png', { frameWidth: 141, frameHeight: 64, startFrame: 0, endFrame: 4 });
        // ITEM
        this.load.image('banana', './assets/image/banana.png');
        this.load.image('honey', './assets/image/honey.png');
        this.load.spritesheet('player1_boost', './assets/image/Player1_boost.png', { frameWidth: 64, frameHeight: 74, startFrame: 0, endFrame: 10 });
        this.load.spritesheet('player2_boost', './assets/image/Player2_boost.png', { frameWidth: 64, frameHeight: 74, startFrame: 0, endFrame: 10 });
        this.load.spritesheet('hammer', './assets/image/hammer.png', { frameWidth: 29, frameHeight: 18, startFrame: 0, endFrame: 11 });
        this.load.spritesheet('item_box', './assets/image/item_box.png', { frameWidth: 55, frameHeight: 55, startFrame: 0, endFrame: 7 });
        this.load.spritesheet('item_collecting', './assets/image/item_collecting.png', { frameWidth: 55, frameHeight: 55, startFrame: 0, endFrame: 3 });
        // ETC
        this.load.image('first', './assets/image/first.png');
        this.load.image('second', './assets/image/second.png');
        this.load.spritesheet('winner', './assets/image/winner.png', { frameWidth: 160, frameHeight: 48, startFrame: 0, endFrame: 9 });
        this.load.spritesheet('winner2', './assets/image/winner2.png', { frameWidth: 160, frameHeight: 48, startFrame: 0, endFrame: 9 });
    }

    create() {
        this.carSpeed = 0;          // speed of player
        this.carSpeed2 = 0;         // speed of player2
        this.boost = false;         // boolean for activating p1 speed boost
        this.boost2 = false;        // boolean for activating p2 speed boost
        this.bananaSlot = false;    // boolean to tell if banana is in slot for p1
        this.bananaSlot2 = false;   // boolean to tell if banana is in slot for p2
        this.banana = false;        // boolean for when player hits a banana 
        this.banana2 = false;       // boolean for when player2 hits a banana
        this.hammmer = false;       // boolean for activating player1's hammer attack
        this.hammer2 = false;       // boolean for activating player2's hammer attack
        this.honeySlot = false;     // boolean to tell if honey is in slot for p1
        this.honeySlot2 = false;    // boolean to tell if honey is in slot for p2
        this.honey = false;         // boolean for when player1 hits honey
        this.honey2 = false;        // boolean for when player2 hits honey

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

        // create animation for item collecting
        this.anims.create({
            key: 'item_collecting',
            frames: this.anims.generateFrameNumbers('item_collecting', { start: 0, end: 3, first: 0 }),
            frameRate: 8,
        })

        // create animation for lap count
        this.anims.create({
            key: 'lap_count',
            frames: this.anims.generateFrameNumbers('UI_lapcount', { start: 0, end: 2, first: 0 }),
        })

        // create animation for UI place
        this.anims.create({
            key: 'UI_place',
            frames: this.anims.generateFrameNumbers('UI_place', { start: 0, end: 1, first: 0 }),
        })

        // create animation for Lap 2 UI
        this.anims.create({
            key: 'lap_two',
            frames: this.anims.generateFrameNumbers('UI_laptwo', { start: 0, end: 6, first: 0 }),
            frameRate: 8,
        })

        // create animation for Final Lap UI
        this.anims.create({
            key: 'lap_final',
            frames: this.anims.generateFrameNumbers('UI_lapfinal', { start: 0, end: 6, first: 0 }),
            frameRate: 8,
        })

        // create animation for race one UI
        this.anims.create({
            key: 'race_one',
            frames: this.anims.generateFrameNumbers('UI_raceone', { start: 0, end: 4, first: 0 }),
            frameRate: 6,
        })

        // create animation for race two UI
        this.anims.create({
            key: 'race_two',
            frames: this.anims.generateFrameNumbers('UI_racetwo', { start: 0, end: 4, first: 0 }),
            frameRate: 6,
        })

        // create animation for final race UI
        this.anims.create({
            key: 'race_final',
            frames: this.anims.generateFrameNumbers('UI_racefinal', { start: 0, end: 4, first: 0 }),
            frameRate: 6,
        })

        // create animation for scoreboard UI
        this.anims.create({
            key: 'scoreboard',
            frames: this.anims.generateFrameNumbers('UI_scoreboard', { start: 0, end: 2, first: 0 }),
            frameRate: 8,
        })

        // create animation for winner UI
        this.anims.create({
            key: 'winner',
            frames: this.anims.generateFrameNumbers('winner', { start: 0, end: 9, first: 0 }),
            frameRate: 8,
            repeat: -1
        })

        // create animation for winner2 UI
        this.anims.create({
            key: 'winner2',
            frames: this.anims.generateFrameNumbers('winner2', { start: 0, end: 9, first: 0 }),
            frameRate: 8,
            repeat: -1
        })

        // create animation for boost item (player 1)
        this.anims.create({
            key: 'player1_boost',
            frames: this.anims.generateFrameNumbers('player1_boost', { start: 0, end: 10, first: 0 }),
            frameRate: 12,
            repeat: -1,
        })

        // create animation for boost item (player 2)
        this.anims.create({
            key: 'player2_boost',
            frames: this.anims.generateFrameNumbers('player2_boost', { start: 0, end: 10, first: 0 }),
            frameRate: 12,
            repeat: -1,
        })

        // create animation for hammer item
        this.anims.create({
            key: 'hammer_hit',
            frames: this.anims.generateFrameNumbers('hammer', { start: 0, end: 10, first: 0 }),
            frameRate: 18,
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

        this.toy = this.matter.add.sprite(775, 575);
        this.toy.setBody({
            type: 'rectangle',
            width: 47,
            height: 34,
        })
        this.toy.setStatic(true);

        this.toy2 = this.matter.add.sprite(749, 136);
        this.toy2.setBody({
            type: 'rectangle',
            width: 47,
            height: 35,
        })
        this.toy2.setStatic(true);

        this.toy3 = this.matter.add.sprite(598, 1040);
        this.toy3.setBody({
            type: 'rectangle',
            width: 47,
            height: 35,
        })
        this.toy3.setStatic(true);

        this.dishwasher = this.matter.add.sprite(-700, -480);
        this.dishwasher.setBody({
            type: 'rectangle',
            width: 240,
            height: 10,
        })
        this.dishwasher.rotation = 1.5708; // 90 degrees
        this.dishwasher.setStatic(true);

        this.dishwasher2 = this.matter.add.sprite(-800, -600);
        this.dishwasher2.setBody({
            type: 'rectangle',
            width: 200,
            height: 10,
        })
        this.dishwasher2.setStatic(true);

        this.dishwasher3 = this.matter.add.sprite(-800, -365);
        this.dishwasher3.setBody({
            type: 'rectangle',
            width: 200,
            height: 10,
        })
        this.dishwasher3.setStatic(true);

        this.oiltank = this.matter.add.sprite(-715, 1030);
        this.oiltank.setBody({
            type: 'rectangle',
            width: 60,
            height: 10,
        })
        this.oiltank.rotation = 1.5708; // 90 degrees
        this.oiltank.setStatic(true);

        this.oiltank2 = this.matter.add.sprite(-780, 1005);
        this.oiltank2.setBody({
            type: 'rectangle',
            width: 130,
            height: 10,
        })
        this.oiltank2.setStatic(true);

        this.oiltank3 = this.matter.add.sprite(-750, 1060);
        this.oiltank3.setBody({
            type: 'rectangle',
            width: 80,
            height: 10,
        })
        this.oiltank3.setStatic(true);
        // OBJECTS ON TRACK ------------------------------------------------

        // Add item box (for now)
        this.item_box = this.matter.add.sprite(830, -680, 'item_box').setScale(1).setStatic(true).setSensor(true);
        this.item_box2 = this.matter.add.sprite(940, -680, 'item_box').setScale(1).setStatic(true).setSensor(true);
        this.item_box3 = this.matter.add.sprite(-513, -890, 'item_box').setScale(1).setStatic(true).setSensor(true);
        this.item_box4 = this.matter.add.sprite(-740, -890, 'item_box').setScale(1).setStatic(true).setSensor(true);
        this.item_box5 = this.matter.add.sprite(-700, 550, 'item_box').setScale(1).setStatic(true).setSensor(true);
        this.item_box6 = this.matter.add.sprite(-550, 550, 'item_box').setScale(1).setStatic(true).setSensor(true);
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
        this.player = this.matter.add.sprite(650, 399.9, 'player1_boost').setOrigin(0.5, 0).setScale(2);
        // this.player = this.matter.add.sprite(-650, -800, 'player1_boost').setOrigin(0.5, 0).setScale(2);

        // Hitbox for player
        this.player.setBody({
            type: 'rectangle',
            width: 50,
            height: 100
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
        this.player2 = this.matter.add.sprite(800, 399.9, 'player2_boost').setOrigin(0.5, 0).setScale(2);
        //this.player2 = this.matter.add.sprite(-650, -800, 'player2_boost').setOrigin(0.5, 0).setScale(2);

        // Hitbox for player2
        this.player2.setBody({
            type: 'rectangle',
            width: 50,
            height: 100,
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
        this.playerMove = false;
        this.player2Move = false;

        // Indication if player has finished race.
        this.playerDone = false;
        this.player2Done = false;

        // Prevent acceleration sound playing again
        this.acceleration_play = true;
        this.acceleration = this.sound.add('acceleration', { volume: 0.3 });
        this.acceleration.setRate(0.5);

        this.player.item_slotUI = this.add.image(-3135, -3450, '').setScale(0.1);
        this.player.item_slotUI2 = this.add.image(-3135, -3450, '').setScale(0.1);

        this.player2.item_slotUI = this.add.image(-2135, -2450, '').setScale(0.1);
        this.player2.item_slotUI2 = this.add.image(-2135, -2450, '').setScale(0.1);
        // Add player UI group
        this.player_UI = this.add.group();
        {
            // item
            this.UI1_item1 = this.add.image(-3135, -3450, 'UI_item').setScale(2.5);
            this.UI1_item2 = this.add.image(-3060, -3450, 'UI_item').setScale(2.5);

            // speed meter
            this.UI1_speed = this.add.sprite(-3080, -3083, 'UI_speed').setScale(2);
            this.UI1_speed.anims.load('speed_increase');

            // lap text
            this.UI1_lap = this.add.image(-3460, -3462, 'UI_lap').setScale(1.75);

            // lap count
            this.UI1_lapcount = this.add.sprite(-3390, -3462, 'UI_lapcount').setScale(1.75);
            this.UI1_lapcount.anims.load('lap_count');

            // place
            this.UI1_place = this.add.sprite(-3460, -3380, 'UI_place').setScale(1.75);
            this.UI1_place.anims.load('UI_place');

            // add objects to group
            this.player_UI.addMultiple([this.UI1_item1, this.UI1_item2, this.UI1_speed, this.UI1_lap, this.UI1_lapcount, this.UI1_place]);
        }

        // Add wincoin for player1
        if (game.settings.playerWon == 1) {
            this.UI1_wincoin = this.add.image(-3045, -3395, 'UI_wincoin').setScale(1.5);
        }

        // Add player2 UI group
        this.player2_UI = this.add.group();
        {
            // item
            this.UI2_item1 = this.add.image(-2135, -2450, 'UI_item').setScale(2.5);
            this.UI2_item2 = this.add.image(-2060, -2450, 'UI_item').setScale(2.5);

            // speed meter
            this.UI2_speed = this.add.sprite(-2080, -2083, 'UI_speed').setScale(2);
            this.UI2_speed.anims.load('speed_increase');

            // lap text
            this.UI2_lap = this.add.image(-2460, -2462, 'UI_lap').setScale(1.75);

            // lap count
            this.UI2_lapcount = this.add.sprite(-2390, -2462, 'UI_lapcount').setScale(1.75);
            this.UI2_lapcount.anims.load('lap_count');

            // place
            this.UI2_place = this.add.sprite(-2460, -2380, 'UI_first').setScale(1.75);
            this.UI2_place.anims.load('UI_place');

            // add objects to group
            this.player2_UI.addMultiple([this.UI2_item1, this.UI2_item2, this.UI2_speed, this.UI2_lap, this.UI2_lapcount, this.UI2_place]);
        }

        // Add wincoin for player2
        if (game.settings.player2Won == 1) {
            this.UI2_wincoin = this.add.image(-2045, -2395, 'UI_wincoin').setScale(1.5);
        }

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
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        // Add engine idle sound
        this.engineIdle = this.sound.add('engineIdle', { volume: 0.5, loop: true });
        this.engineIdle.play();

        // Play the engine On sound
        this.engineStart = this.sound.add('engineStart', { volume: 0.5 });
        this.engineStart.play();

        // Timer Config
        this.timerConfig = {
            fontFamily: 'font1',
            fontSize: '25px',
            color: "white",
        }

        // general Config
        this.generalConfig = {
            fontFamily: 'font1',
            fontSize: '17px',
            color: "white",
        }

        // player Config
        this.redConfig = {
            fontFamily: 'font1',
            fontSize: '17px',
            color: "red",
        }

        // player2 Config
        this.blueConfig = {
            fontFamily: 'font1',
            fontSize: '17px',
            color: "blue",
        }

        // text Config
        this.textConfig = {
            fontFamily: 'font1',
            fontSize: '15px',
            color: "white",
        }

        // Display For the Timer (Player 1)
        this.add.sprite(-3253, -3490, 'UI_timeboard').setScale(1.55); // Add time board
        this.timerDisplay = this.add.text(-3315, -3490, "00:00", this.timerConfig);

        // Display For the Timer (Player 2)
        this.add.sprite(-2253, -2490, 'UI_timeboard').setScale(1.55); // Add time board
        this.timerDisplay2 = this.add.text(-2315, -2490, "00:00", this.timerConfig);

        // Play the race number UI
        if (game.settings.raceNum == 1) { // Race 1
            let racenumber = this.add.sprite(-3250, -3260, 'UI_raceone').setScale(3);
            let racenumber2 = this.add.sprite(-2250, -2260, 'UI_raceone').setScale(3);

            racenumber.anims.play('race_one');
            racenumber2.anims.play('race_one');
            racenumber.on('animationcomplete', () => {
                this.time.addEvent({ // delete the UI after 1.2 sec
                    delay: 1200,
                    callback: () => {
                        racenumber.destroy(true);
                        racenumber2.destroy(true);
                    },
                    loop: false
                })
            })
        }
        else if (game.settings.raceNum == 2) { // Race 2
            let racenumber = this.add.sprite(-3250, -3260, 'UI_racetwo').setScale(3);
            let racenumber2 = this.add.sprite(-2250, -2260, 'UI_racetwo').setScale(3);

            racenumber.anims.play('race_two');
            racenumber2.anims.play('race_two');
            racenumber.on('animationcomplete', () => {
                this.time.addEvent({ // delete the UI after 1.2 sec
                    delay: 1200,
                    callback: () => {
                        racenumber.destroy(true);
                        racenumber2.destroy(true);
                    },
                    loop: false
                })
            })
        }
        else { // Final Race
            let racenumber = this.add.sprite(-3250, -3260, 'UI_racefinal').setScale(2.5);
            let racenumber2 = this.add.sprite(-2250, -2260, 'UI_racefinal').setScale(2.5);

            racenumber.anims.play('race_final');
            racenumber2.anims.play('race_final');
            racenumber.on('animationcomplete', () => {
                this.time.addEvent({ // delete the UI after 1.2 sec
                    delay: 1200,
                    callback: () => {
                        racenumber.destroy(true);
                        racenumber2.destroy(true);
                    },
                    loop: false
                })
            })
        }

        // Play the countdown animation
        let countdown = this.add.sprite(-3260, -3350, 'start_light').setScale(1);
        let countdown2 = this.add.sprite(-2260, -2350, 'start_light').setScale(1);
        countdown.anims.play('countdown');
        countdown2.anims.play('countdown');
        this.bgm = this.sound.add('bgm', { volume: 0.3 });
        countdown.on('animationcomplete', () => {
            countdown.destroy(true);
            countdown2.destroy(true);
            // Players can now move
            this.playerMove = true;
            this.player2Move = true;

            // Play bgm
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

            // Make Timer run when the race starts.
            this.timer = this.time.addEvent({
                loop: true
            })

            // Make Timer2 run when the race starts.
            this.timer2 = this.time.addEvent({
                loop: true
            })

        })

        // Collect total time for each player to determine who's winner.
        this.playerTotalTime = 0;
        this.player2TotalTime = 0;

        // display the result only once
        this.result = true;

        // delay before game starts
        this.time.addEvent({
            delay: 1000, // 1 second 
            callback: () => {
                // Play countdown sound
                this.raceStart = this.sound.add('raceStart', { volume: 0.5 });
                this.raceStart.play();
            },
            loop: false
        })

        // To prevent players entering finish line repeatedly.
        this.lineEnter = false;
        this.lineEnter2 = false;

        // delay for entering goal line
        this.time.addEvent({
            delay: 15000, // 15 seconds 
            callback: () => {
                this.lineEnter = true;
            },
            loop: true
        })

        // delay for entering goal line
        this.time.addEvent({
            delay: 15000, // 15 seconds 
            callback: () => {
                this.lineEnter2 = true;
            },
            loop: true
        })

        this.oil_effect = false;
        this.water_effect = false;
        // delay for playing sound for oil 
        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.oil_effect = true;
                this.water_effect = true;
            },
            loop: true
        })

        this.wrongWay = false;
        // delay for UI wrong way animation
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.wrongWay = true;
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

            /////////////////////////////
            // player1 picking up item //
            /////////////////////////////

            // bodyA = item_box
            if (bodyA.label == 'item_box' && bodyB.label == 'player1') {
                var item = Phaser.Math.Between(1, 4);
                if (this.player.item_slot == 0 && this.player.item_slot2 == 0) {            // if slots are empty
                    this.player.item_slot = item;
                } else if (this.player.item_slot != 0 && this.player.item_slot2 == 0) {     // if slot1 is filled but slot2 isnt
                    this.player.item_slot2 = item;
                } else {                                                                    // all slots full
                    // do nothing, since all item slots are full
                    // console.log('item slots full');
                }
                this.sound.play('itemCollect');
                var x = bodyA.position.x;   // retrieve the coordinates of the item box
                var y = bodyA.position.y;
                bodyA.gameObject.destroy();

                // Play Item Collecting Animation
                let item_collectingAnim = this.add.sprite(x, y, "item_collecting").setScale(2);
                item_collectingAnim.anims.play('item_collecting');
                item_collectingAnim.on('animationcomplete', () => {
                    item_collectingAnim.destroy(true);
                })

                // call these functions to activate powerups
                //this.speedBoost('p1');    // activate speedboost powerup
                //this.hammerATK('p1');     // activate hammer attack powerup
                //this.bananaSlot = true;   // give player1 the banana item
                //this.honeySlot = true;    // give player1 the honey item
                this.respawnBox(x, y);
            }

            // bodyB = item_box
            if (bodyB.label == 'item_box' && bodyA.label == 'player1') {
                var item = Phaser.Math.Between(1, 4);
                if (this.player.item_slot == 0 && this.player.item_slot2 == 0) {            // if slots are empty
                    this.player.item_slot = item;
                } else if (this.player.item_slot != 0 && this.player.item_slot2 == 0) {     // if slot1 is filled but slot2 isnt
                    this.player.item_slot2 = item;
                } else {                                                                    // all slots full
                    // do nothing, since all item slots are full
                    // console.log('item slots full');
                }
                this.sound.play('itemCollect');
                var x = bodyB.position.x;   // retrieve the coordinates of the item box
                var y = bodyB.position.y;
                bodyB.gameObject.destroy();

                // Play Item Collecting Animation
                let item_collectingAnim = this.add.sprite(x, y, "item_collecting").setScale(2);
                item_collectingAnim.anims.play('item_collecting');
                item_collectingAnim.on('animationcomplete', () => {
                    item_collectingAnim.destroy(true);
                })
                this.respawnBox(x, y);
            }

            /////////////////////////////
            // player2 picking up item //
            /////////////////////////////

            // bodyA = item_box
            if (bodyA.label == 'item_box' && bodyB.label == 'player2') {
                var item = Phaser.Math.Between(1, 4);
                if (this.player2.item_slot == 0 && this.player2.item_slot2 == 0) {            // if slots are empty
                    this.player2.item_slot = item;
                } else if (this.player2.item_slot != 0 && this.player2.item_slot2 == 0) {     // if slot1 is filled but slot2 isnt
                    this.player2.item_slot2 = item;
                } else {                                                                    // all slots full
                    // do nothing, since all item slots are full
                    // console.log('item slots full');
                }
                this.sound.play('itemCollect');
                var x = bodyA.position.x;   // retrieve box coordinates
                var y = bodyA.position.y;
                bodyA.gameObject.destroy();

                // Play Item Collecting Animation
                let item_collectingAnim = this.add.sprite(x, y, "item_collecting").setScale(2);
                item_collectingAnim.anims.play('item_collecting');
                item_collectingAnim.on('animationcomplete', () => {
                    item_collectingAnim.destroy(true);
                })
                this.respawnBox(x, y);
            }

            // player2 picking up item
            // bodyB = item_box
            if (bodyB.label == 'item_box' && bodyA.label == 'player2') {
                var item = Phaser.Math.Between(1, 4);
                if (this.player2.item_slot == 0 && this.player2.item_slot2 == 0) {            // if slots are empty
                    this.player2.item_slot = item;
                } else if (this.player2.item_slot != 0 && this.player2.item_slot2 == 0) {     // if slot1 is filled but slot2 isnt
                    this.player2.item_slot2 = item;
                } else {                                                                    // all slots full
                    // do nothing, since all item slots are full
                    // console.log('item slots full');
                }
                this.sound.play('itemCollect');
                var x = bodyB.position.x;   // retrieve box coordinates
                var y = bodyB.position.y;
                bodyB.gameObject.destroy();

                // Play Item Collecting Animation
                let item_collectingAnim = this.add.sprite(x, y, "item_collecting").setScale(2);
                item_collectingAnim.anims.play('item_collecting');
                item_collectingAnim.on('animationcomplete', () => {
                    item_collectingAnim.destroy(true);
                })
                this.respawnBox(x, y);
            }

            // player1 colliding with banana
            if ((bodyA.label == 'banana' && bodyB.label == 'player1') || (bodyB.label == 'banana' && bodyA.label == 'player1')) {
                if (bodyA.label == 'player1') {
                    this.bananaHit('p1', this.player.rotation);
                    bodyB.gameObject.destroy();
                } else {
                    this.bananaHit('p1', this.player.rotation);
                    bodyA.gameObject.destroy();
                }
            }

            // player1 colliding with honey
            if ((bodyA.label == 'honey' && bodyB.label == 'player1') || (bodyB.label == 'honey' && bodyA.label == 'player1')) {
                if (bodyA.label == 'player1') {
                    this.honeyHit('p1');
                    bodyB.gameObject.destroy();
                } else {
                    this.honeyHit('p1');
                    bodyA.gameObject.destroy();
                }
            }

            // player2 colliding with banana
            if ((bodyA.label == 'banana' && bodyB.label == 'player2') || (bodyB.label == 'banana' && bodyA.label == 'player2')) {
                if (bodyA.label == 'player2') {
                    this.bananaHit('p2', this.player2.rotation);
                    bodyB.gameObject.destroy();
                } else {
                    this.bananaHit('p2', this.player2.rotation);
                    bodyA.gameObject.destroy();
                }
            }

            // player2 colliding with honey
            if ((bodyA.label == 'honey' && bodyB.label == 'player2') || (bodyB.label == 'honey' && bodyA.label == 'player2')) {
                if (bodyA.label == 'player2') {
                    this.honeyHit('p2');
                    bodyB.gameObject.destroy();
                } else {
                    this.honeyHit('p2');
                    bodyA.gameObject.destroy();
                }
            }
        }, this);
    }

    // function that spawns item box with given x and y coordinates
    respawnBox(x, y) {
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

    // function that deploys the banana with given coordinates
    // Checks where the player is facing (rotation value) and plant behind 
    bananaSpawn(x, y, z) { // z = rotation value
        this.sound.play("plantingBan");
        z = z / 6.3; // one 360 degrees rotation is about 6.3 
        if (z < 0) {
            z = z % 1; // remove whole number
            //console.log("z: " + z);
            if (z <= 0 && z > -0.125) { // Counter-Clockwise rotation check. Divided into 8 sections.
                x = x + 65;
                y = y + 145;
            }
            else if (z <= -0.125 && z > -0.25) {
                x = x + 145;
                y = y + 65;
            }
            else if (z <= -0.25 && z > -0.375) {
                x = x + 65;
                y = y - 145;
            }
            else if (z <= -0.375 && z > -0.5) {
                x = x + 65;
                y = y - 145;
            }
            else if (z <= -0.5 && z > -0.625) {
                x = x - 65;
                y = y - 145;
            }
            else if (z <= -0.625 && z > -0.75) {
                x = x - 145;
                y = y - 65;
            }
            else if (z <= -0.75 && z > -0.875) {
                x = x - 145;
                y = y + 65;
            }
            else {
                x = x - 65;
                y = y + 145;
            }
        }
        else { // positive rotation
            z = z % 1; // remove whole number
            //console.log("z: " + z);
            if (z >= 0 && z < 0.125) { // Clockwise rotation check. Divided into 8 sections.
                x = x - 65;
                y = y + 145;
            }
            else if (z >= 0.125 && z < 0.25) {
                x = x - 145;
                y = y + 65;
            }
            else if (z >= 0.25 && z < 0.375) {
                x = x - 145;
                y = y - 65;
            }
            else if (z >= 0.375 && z < 0.5) {
                x = x - 65;
                y = y - 145;
            }
            else if (z >= 0.5 && z < 0.625) {
                x = x + 65;
                y = y - 145;
            }
            else if (z >= 0.625 && z < 0.75) {
                x = x + 65;
                y = y - 145;
            }
            else if (z >= 0.75 && z < 0.875) {
                x = x + 145;
                y = y + 65;
            }
            else {
                x = x + 65;
                y = y + 145;
            }
        }
        this.bananaSprite = this.matter.add.sprite(x, y, 'banana').setScale(3).setStatic(true).setSensor(true);
        this.bananaSprite.body.label = 'banana';
        //console.log(this.bananaSprite);
    }

    // function that causes player to spin out after hitting banana
    bananaHit(player, number) {
        // Play the banana hit sound
        this.bananaSound = this.sound.add('steppingBan', { volume: 1.5 });
        this.bananaSound.play();

        if (player == 'p1') {
            this.banana = true;
            var prevRotation1 = number; // save the previous rotation value before getting hit by banana to prevent changing offset 
        } else {
            this.banana2 = true;
            var prevRotation2 = number;
        }
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (player == 'p1') {
                    this.banana = false;
                    this.player.rotation = prevRotation1;
                } else {
                    this.banana2 = false;
                    this.player2.rotation = prevRotation2;
                }
            },
            loop: false
        })
    }

    // function that deploys the honey with given coordinates
    // Spawn function is same as banana Spawn.
    honeySpawn(x, y, z) {
        this.sound.play("plantingHon");
        z = z / 6.3;
        if (z < 0) {
            z = z % 1; // remove whole number
            // console.log("z: " + z);
            if (z <= 0 && z > -0.125) { // Counter-Clockwise rotation check. Divided into 8 sections.
                x = x + 65;
                y = y + 145;
            }
            else if (z <= -0.125 && z > -0.25) {
                x = x + 145;
                y = y + 65;
            }
            else if (z <= -0.25 && z > -0.375) {
                x = x + 65;
                y = y - 145;
            }
            else if (z <= -0.375 && z > -0.5) {
                x = x + 65;
                y = y - 145;
            }
            else if (z <= -0.5 && z > -0.625) {
                x = x - 65;
                y = y - 145;
            }
            else if (z <= -0.625 && z > -0.75) {
                x = x - 145;
                y = y - 65;
            }
            else if (z <= -0.75 && z > -0.875) {
                x = x - 145;
                y = y + 65;
            }
            else {
                x = x - 65;
                y = y + 145;
            }
        }
        else { // positive rotation
            z = z % 1; // remove whole number
            // console.log("z: " + z);
            if (z >= 0 && z < 0.125) { // Clockwise rotation check. Divided into 8 sections.
                x = x - 65;
                y = y + 145;
            }
            else if (z >= 0.125 && z < 0.25) {
                x = x - 145;
                y = y + 65;
            }
            else if (z >= 0.25 && z < 0.375) {
                x = x - 145;
                y = y - 65;
            }
            else if (z >= 0.375 && z < 0.5) {
                x = x - 65;
                y = y - 145;
            }
            else if (z >= 0.5 && z < 0.625) {
                x = x + 65;
                y = y - 145;
            }
            else if (z >= 0.625 && z < 0.75) {
                x = x + 65;
                y = y - 145;
            }
            else if (z >= 0.75 && z < 0.875) {
                x = x + 145;
                y = y + 65;
            }
            else {
                x = x + 65;
                y = y + 145;
            }
        }
        this.honeySprite = this.matter.add.sprite(x, y, 'honey').setScale(2.5).setStatic(true).setSensor(true);
        this.honeySprite.body.label = 'honey';
        //console.log(this.honeySprite);
    }

    // function that causes player to slow down in honey
    honeyHit(player) {
        // Play the honey hit sound
        this.honeySound = this.sound.add('steppingHon', { volume: 1.5 });
        this.honeySound.play();

        if (player == 'p1') {
            this.honey = true;
        } else {
            this.honey2 = true;
        }
        this.time.addEvent({
            delay: 1500,
            callback: () => {
                if (player == 'p1') {
                    this.honey = false;
                } else {
                    this.honey2 = false;
                }
            },
            loop: false
        })
    }

    // function that stuns player's enemy
    hammerATK(player) {
        // Play the hammer sound
        this.hammerSound = this.sound.add('usingHammer', { volume: 0.5 });
        this.hammerSound.play();

        if (player == 'p1') {
            this.hammer = true;
        } else {
            this.hammer2 = true;
        }
        this.time.addEvent({
            delay: 500,
            callback: () => {
                // Play hit sound
                this.hammerHit = this.sound.add('gettingHammerHit', { volume: 0.75 });
                this.hammerHit.play();
            },
            loop: false
        })
        // Stun for 1 second
        this.time.addEvent({
            delay: 1000,
            callback: () => {
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
        // Go back to main menu when game is over
        if ((this.playerDone && this.player2Done) && (Phaser.Input.Keyboard.JustDown(keyONE))) {
            this.bgm.stop();
            this.scene.start("menuScene");
        }

        if ((this.playerDone && this.player2Done) && this.result) { // Both players have finished race, move on. 
            console.log("Both players have finished.")
            this.displayResult();
            this.result = false; // Only display result once
        }
        //console.log(this.acceleration_play)
        if (this.playerMove) {
            // Update stopwatch when game starts.
            this.displayPlayerTime();
            var speedsquared = (this.player.body.velocity.x * this.player.body.velocity.x) + (this.player.body.velocity.y * this.player.body.velocity.y);

            ///////////////////////
            // Player 1 Movement //
            ///////////////////////

            // Got help from https://codepen.io/Samid737/pen/GdVZeX
            // and also from https://anexia.com/blog/en/introduction-to-the-phaser-framework/
            //console.log(this.carSpeed);
            // sets maximum forward speed to 5
            if (this.carSpeed >= 5 && this.boost == false && this.honey == false) {
                this.carSpeed = 5;
                this.player.setVelocityX(Math.sin(this.player.rotation) * 5);
                this.player.setVelocityY(-Math.cos(this.player.rotation) * 5);
            }

            // if slot1 filled
            if (this.player.item_slot != 0 && Phaser.Input.Keyboard.JustDown(keyT)) {
                if (this.player.item_slot == 1) {           // speed boost
                    this.speedBoost('p1');
                    this.player.item_slot = 0;
                } else if (this.player.item_slot == 2) {    // hammer attack
                    this.hammerATK('p1');
                    this.player.item_slot = 0;
                } else if (this.player.item_slot == 3) {    // banana drop
                    this.bananaSlot = true;
                    this.player.item_slot = 0;
                } else if (this.player.item_slot == 4) {    // honey drop
                    this.honeySlot = true;
                    this.player.item_slot = 0;
                }
                else { }
            }

            // if slot2 is filled
            if (this.player.item_slot2 != 0 && Phaser.Input.Keyboard.JustDown(keyY)) {
                if (this.player.item_slot2 == 1) {
                    this.speedBoost('p1');
                    this.player.item_slot2 = 0;
                } else if (this.player.item_slot2 == 2) {
                    this.hammerATK('p1');
                    this.player.item_slot2 = 0;
                } else if (this.player.item_slot2 == 3) {
                    this.bananaSlot = true;
                    this.player.item_slot2 = 0;
                } else if (this.player.item_slot2 == 4) {
                    this.honeySlot = true;
                    this.player.item_slot2 = 0;
                }
                else { }
            }

            // player1 activating speedboost
            if (this.boost == true) {
                this.carSpeed = 7.5;
                this.player.setVelocityX(Math.sin(this.player.rotation) * 7.5);
                this.player.setVelocityY(-Math.cos(this.player.rotation) * 7.5);

                // Play the boost sound
                this.boost = this.sound.add('boost', { volume: 0.75 });
                this.boost.play();

                // Play the boost animation
                this.player.anims.play('player1_boost');
                this.time.addEvent({
                    delay: 1700,
                    callback: () => {
                        this.player.anims.load('player1_boost', 0);
                    },
                    loop: false
                })

            }

            // player1 activating hammerATK
            if (this.hammer == true) {
                this.carSpeed2 = 0;
                this.player2.setVelocityX(0);
                this.player2.setVelocityY(0);
                this.SteeringWheel2.rotation = 0;
                // Play the sound
                //this.sound.play("gettingHammerHit");
                // Play the animation 
                let hammerHitAnim = this.add.sprite(this.player2.x + 30, this.player2.y - 10, 'hammer').setScale(4);
                hammerHitAnim.anims.play('hammer_hit');
                hammerHitAnim.on('animationcomplete', () => {
                    hammerHitAnim.destroy(true);
                })
            }

            // player1 deploying banana
            if (this.bananaSlot == true) {
                this.bananaSpawn(this.player.x, this.player.y, this.player.rotation);
                this.bananaSlot = false;
            }

            // player1 hitting banana
            if (this.banana == true) {
                this.player.setAngularVelocity(50);
            }

            // player1 deploying honey
            if (this.honeySlot == true) {
                this.honeySpawn(this.player.x, this.player.y, this.player.rotation);
                this.honeySlot = false;
            }

            // player1 hitting honey
            if (this.honey == true) {
                //console.log('stuck by honey!');
                this.carSpeed = 1;
                this.player.setVelocityX(1.4);
                this.player.setVelocityY(1.4);
                this.player.setAngularVelocity(this.SteeringWheel.rotation * 0.01 * Math.exp(-speedsquared / 100));
            }

            // sets maximum reverse speed to -5
            if (this.carSpeed <= -5) {
                this.carSpeed = -5;
                this.player.setVelocityX(Math.sin(this.player.rotation) * 5);
                this.player.setVelocityY(-Math.cos(this.player.rotation) * 5);
            }

            // Car Steering
            if (this.carSpeed <= 0.04 && this.carSpeed >= 0 && !keyS.isDown) {
                this.carSpeed = 0;
                this.SteeringWheel.rotation = 0;
            } else {
                if (keyA.isDown && this.SteeringWheel.rotation > -0.3) {
                    this.SteeringWheel.rotation -= 0.02;
                }

                if (keyD.isDown && this.SteeringWheel.rotation < 0.3) {
                    this.SteeringWheel.rotation += 0.02;
                }
            }

            // Car acceleration and deceleration
            if (keyW.isDown) {
                this.carSpeed += 0.05;
            }
            else {
                if (this.carSpeed >= 0) {
                    this.carSpeed -= 0.01;
                }
            }

            if (keyS.isDown) {
                this.carSpeed -= 0.05;
            }
            else {
                if (this.carSpeed <= 0) {
                    this.carSpeed += 0.01;
                }
            }

            // Prevents car from spinning like crazy lol
            if (!keyA.isDown && !keyD.isDown) {
                this.SteeringWheel.rotation = 0;
            }

            // if the car isnt hit by the banana or honey, then it rotates normally
            if (this.banana == false && this.honey == false) {
                this.player.setAngularVelocity(this.SteeringWheel.rotation * 0.15 * Math.exp(-speedsquared / 100));
            }

            // no drift 
            this.player.setVelocityX(Math.sin(this.player.rotation) * this.carSpeed);
            this.player.setVelocityY(-Math.cos(this.player.rotation) * this.carSpeed);

            // Making UI Item visible on Item slots 
            if (this.player.item_slot != 0) {
                if (this.player.item_slot == 1) { // boost
                    if (this.drawImage) {
                        this.player.item_slotUI = this.add.image(-3135, -3450, 'UI_boost').setScale(1.75);
                        this.drawImage = false;
                    }
                }
                else if (this.player.item_slot == 2) { // hammer
                    if (this.drawImage) {
                        this.player.item_slotUI = this.add.image(-3135, -3450, 'UI_hammer').setScale(1.75);
                        this.drawImage = false;
                    }
                }
                else if (this.player.item_slot == 3) { // banana
                    if (this.drawImage) {
                        this.player.item_slotUI = this.add.image(-3135, -3450, 'UI_banana').setScale(2.5);
                        this.drawImage = false;
                    }
                }
                else { // honey
                    if (this.drawImage) {
                        this.player.item_slotUI = this.add.image(-3135, -3450, 'UI_honey').setScale(1.4);
                        this.drawImage = false;
                    }
                }
            }
            else { // delete the image when used
                this.player.item_slotUI.destroy(true);
                this.drawImage = true;

            }
            if (this.player.item_slot2 != 0) {
                if (this.player.item_slot2 == 1) { // boost
                    if (this.drawImage2) {
                        this.player.item_slotUI2 = this.add.image(-3060, -3450, 'UI_boost').setScale(1.75);
                        this.drawImage2 = false;
                    }
                }
                else if (this.player.item_slot2 == 2) { // hammer
                    if (this.drawImage2) {
                        this.player.item_slotUI2 = this.add.image(-3060, -3450, 'UI_hammer').setScale(1.75);
                        this.drawImage2 = false;
                    }
                }
                else if (this.player.item_slot2 == 3) { // banana
                    if (this.drawImage2) {
                        this.player.item_slotUI2 = this.add.image(-3060, -3450, 'UI_banana').setScale(2.5);
                        this.drawImage2 = false;
                    }
                }
                else { // honey
                    if (this.drawImage2) {
                        this.player.item_slotUI2 = this.add.image(-3060, -3450, 'UI_honey').setScale(1.4);
                        this.drawImage2 = false;
                    }
                }
            }
            else {// delete the image when used
                this.player.item_slotUI2.destroy(true);
                this.drawImage2 = true;
            }

            // Water, oil on the track that slow down player
            if ((this.player.x < -580 && this.player.x > -780) && (this.player.y < 1090 && this.player.y > 926)) {
                if (this.oil_effect) { // Same effect from honey item
                    this.sound.play("waterWalk");
                    this.carSpeed = 1;
                    this.player.setVelocityX(1.4);
                    this.player.setVelocityY(1.4);
                    this.player.setAngularVelocity(this.SteeringWheel.rotation * 0.01 * Math.exp(-speedsquared / 100));
                    this.oil_effect = false;
                }
            }
            if ((this.player.x < 1000 && this.player.x > 930) && (this.player.y < -620 && this.player.y > -760)) {
                if (this.water_effect) { // Same effect from honey item
                    this.sound.play("waterWalk");
                    this.carSpeed = 1;
                    this.player.setVelocityX(1.4);
                    this.player.setVelocityY(1.4);
                    this.player.setAngularVelocity(this.SteeringWheel.rotation * 0.01 * Math.exp(-speedsquared / 100));
                    this.water_effect = false;
                }
            }

            // Change animation for speed meter
            this.carSpeedAnim = this.carSpeed;
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

            // Divide map into small rectangles to track player's position on the map.
            if ((this.player.x >= -830 && this.player.x <= 850) && (this.player.y >= 850 && this.player.y <= 1200)) {
                if (this.player_waypoint == 4 || this.player_waypoint == 5) { // check if player is coming from right direction
                    this.player_waypoint = 5;
                }
            }
            else if ((this.player.x >= 400 && this.player.x <= 850) && (this.player.y > 400 && this.player.y <= 850)) { // to goal
                if (this.player_waypoint == 5 || this.player_waypoint == 6) {
                    this.player_waypoint = 6;
                }
            }
            else if ((this.player.x >= 400 && this.player.x <= 850) && (this.player.y < 350 && this.player.y >= 0)) {
                if (this.player_waypoint == 6 || this.player_waypoint == 1) {
                    this.player_waypoint = 1;
                }
            }
            else if ((this.player.x >= 780 && this.player.x <= 1200) && (this.player.y >= -940 && this.player.y <= 180)) {
                if (this.player_waypoint == 1 || this.player_waypoint == 2) {
                    this.player_waypoint = 2;
                }
            }
            else if ((this.player.x >= -830 && this.player.x <= 970) && (this.player.y >= -1220 && this.player.y <= -940)) {
                if (this.player_waypoint == 2 || this.player_waypoint == 3) {
                    this.player_waypoint = 3;
                }
            }
            else if ((this.player.x >= -800 && this.player.x <= -450) && (this.player.y <= 850 && this.player.y >= -940)) {
                if (this.player_waypoint == 3 || this.player_waypoint == 4) {
                    this.player_waypoint = 4;
                }
            }
            else {

            }

            if (this.lineEnter) {
                if ((this.player.x >= 400 && this.player.x <= 850) && (this.player.y <= 400 && this.player.y >= 350)) { // goal line
                    if (this.player_waypoint == 6) {
                        this.player_lap += 1;
                        this.lineEnter = false;
                        if (this.player_lap == 2) { // Lap 2
                            this.sound.play("lapTwo"); // Play effect and audio
                            this.UI1_lapcount.anims.load('lap_count', 1);
                            let UI1_laptwo = this.add.sprite(-3260, -3350, 'UI_laptwo').setScale(2.5);
                            UI1_laptwo.anims.play("lap_two");
                            UI1_laptwo.on('animationcomplete', () => {
                                UI1_laptwo.destroy(true);
                            })
                        }
                        if (this.player_lap == 3) { // Last lap
                            this.sound.play("finalLap"); // Play effect and audio
                            this.UI1_lapcount.anims.load('lap_count', 2);
                            let UI1_lapfinal = this.add.sprite(-3260, -3350, 'UI_lapfinal').setScale(2.5);
                            UI1_lapfinal.anims.play("lap_final");
                            UI1_lapfinal.on('animationcomplete', () => {
                                UI1_lapfinal.destroy(true);
                            })
                        }
                        if (this.player_lap == 4) { // Player1 finished race
                            this.sound.play("raceEnd");
                            this.playerMove = false; // Player1 can't move anymore.
                            this.playerDone = true; // Indicate player1 has finished.
                            console.log("Player1 has finished");
                        }
                    }

                }
            }
        }
        // Codes for player2 movement are exactly identical with player 1 movement with different variable name.
        if (this.player2Move) {
            // Update stopwatch when game starts.
            this.displayPlayer2Time();
            var speedsquared2 = (this.player2.body.velocity.x * this.player2.body.velocity.x) + (this.player2.body.velocity.y * this.player2.body.velocity.y);

            ///////////////////////
            // Player 2 Movement //
            ///////////////////////

            // console.log(this.carSpeed2);
            // sets maximum forward speed to 5
            if (this.carSpeed2 >= 5 && this.boost2 == false && this.honey2 == false) {
                this.carSpeed2 = 5;
                this.player2.setVelocityX(Math.sin(this.player2.rotation) * 5);
                this.player2.setVelocityY(-Math.cos(this.player2.rotation) * 5);
            }

            // if slot1 is filled
            if (this.player2.item_slot != 0 && Phaser.Input.Keyboard.JustDown(keyO)) {
                if (this.player2.item_slot == 1) {           // speed boost
                    this.speedBoost('p2');
                    this.player2.item_slot = 0;
                } else if (this.player2.item_slot == 2) {    // hammer attack
                    this.hammerATK('p2');
                    this.player2.item_slot = 0;
                } else if (this.player2.item_slot == 3) {    // banana drop
                    this.bananaSlot2 = true;
                    this.player2.item_slot = 0;
                } else if (this.player2.item_slot == 4) {    // honey drop
                    this.honeySlot2 = true;
                    this.player2.item_slot = 0;
                }
                else { }
            }

            // if slot2 is filled
            if (this.player2.item_slot2 != 0 && Phaser.Input.Keyboard.JustDown(keyP)) {
                if (this.player2.item_slot2 == 1) {
                    this.speedBoost('p2');
                    this.player2.item_slot2 = 0;
                } else if (this.player2.item_slot2 == 2) {
                    this.hammerATK('p2');
                    this.player2.item_slot2 = 0;
                } else if (this.player2.item_slot2 == 3) {
                    this.bananaSlot2 = true;
                    this.player2.item_slot2 = 0;
                } else if (this.player2.item_slot2 == 4) {
                    this.honeySlot2 = true;
                    this.player2.item_slot2 = 0;
                }
                else { }
            }

            // player2 activating speedboost
            if (this.boost2 == true) {
                this.carSpeed2 = 7.5;
                this.player2.setVelocityX(Math.sin(this.player2.rotation) * 7.5);
                this.player2.setVelocityY(-Math.cos(this.player2.rotation) * 7.5);

                // Play the boost sound
                this.boost2 = this.sound.add('boost', { volume: 0.75 });
                this.boost2.play();

                // Play the boost animation
                this.player2.anims.play('player2_boost');
                this.time.addEvent({
                    delay: 1700,
                    callback: () => {
                        this.player2.anims.load('player2_boost', 0);
                    },
                    loop: false
                })
            }

            // player2 activating hammerATK
            if (this.hammer2 == true) {
                this.carSpeed = 0;
                this.player.setVelocityX(0);
                this.player.setVelocityY(0);
                this.SteeringWheel.rotation = 0;

                let hammerHitAnim = this.add.sprite(this.player.x + 30, this.player.y - 10, 'hammer').setScale(4);
                hammerHitAnim.anims.play('hammer_hit');
                hammerHitAnim.on('animationcomplete', () => {
                    hammerHitAnim.destroy(true);
                })
            }

            // player2 deploying banana
            if (this.bananaSlot2 == true) {
                this.bananaSpawn(this.player2.x, this.player2.y, this.player2.rotation);
                this.bananaSlot2 = false;
            }

            // player2 hitting banana
            if (this.banana2 == true) {
                this.player2.setAngularVelocity(50);
            }

            // player2 deploying honey
            if (this.honeySlot2 == true) {
                this.honeySpawn(this.player2.x, this.player2.y, this.player2.rotation);
                this.honeySlot2 = false;
            }

            // player2 hitting honey
            if (this.honey2 == true) {
                //console.log('stuck by honey!');
                this.carSpeed2 = 1;
                this.player2.setVelocityX(1.4);
                this.player2.setVelocityY(1.4);
                this.player2.setAngularVelocity(this.SteeringWheel2.rotation * 0.01 * Math.exp(-speedsquared2 / 100));
            }

            // sets maximum reverse speed to -5
            if (this.carSpeed2 <= -5) {
                this.carSpeed2 = -5;
                this.player2.setVelocityX(Math.sin(this.player2.rotation) * 5);
                this.player2.setVelocityY(-Math.cos(this.player2.rotation) * 5);
            }

            // Car Steering
            if (this.carSpeed2 <= 0.04 && this.carSpeed2 >= 0 && !keyDOWN.isDown) {
                this.carSpeed2 = 0;
                this.SteeringWheel2.rotation = 0;
            } else {
                if (keyLEFT.isDown && this.SteeringWheel2.rotation > -0.3) {
                    this.SteeringWheel2.rotation -= 0.02;
                }

                if (keyRIGHT.isDown && this.SteeringWheel2.rotation < 0.3) {
                    this.SteeringWheel2.rotation += 0.02;
                }
            }

            // Car acceleration and deceleration
            if (keyUP.isDown) {
                this.carSpeed2 += 0.05;
            }
            else {
                if (this.carSpeed2 >= 0) {
                    this.carSpeed2 -= 0.01;
                }
            }

            if (keyDOWN.isDown) {
                this.carSpeed2 -= 0.05;
            }
            else {
                if (this.carSpeed2 <= 0) {
                    this.carSpeed2 += 0.01;
                }
            }

            // Prevents car from spinning like crazy lol
            if (!keyLEFT.isDown && !keyRIGHT.isDown) {
                this.SteeringWheel2.rotation = 0;
            }

            // if not hit by banana or honey, rotatation is normal
            if (this.banana2 == false && this.honey2 == false) {
                this.player2.setAngularVelocity(this.SteeringWheel2.rotation * 0.15 * Math.exp(-speedsquared2 / 100));
            }

            // no drift 
            this.player2.setVelocityX(Math.sin(this.player2.rotation) * this.carSpeed2);
            this.player2.setVelocityY(-Math.cos(this.player2.rotation) * this.carSpeed2);

            // UI Item Slots
            if (this.player2.item_slot != 0) {
                if (this.player2.item_slot == 1) { // boost
                    if (this.drawImage3) {
                        this.player2.item_slotUI = this.add.image(-2135, -2450, 'UI_boost').setScale(1.75);
                        this.drawImage3 = false;
                    }
                }
                else if (this.player2.item_slot == 2) { // hammer
                    if (this.drawImage3) {
                        this.player2.item_slotUI = this.add.image(-2135, -2450, 'UI_hammer').setScale(1.75);
                        this.drawImage3 = false;
                    }
                }
                else if (this.player2.item_slot == 3) { // banana
                    if (this.drawImage3) {
                        this.player2.item_slotUI = this.add.image(-2135, -2450, 'UI_banana').setScale(2.5);
                        this.drawImage3 = false;
                    }
                }
                else { // honey
                    if (this.drawImage3) {
                        this.player2.item_slotUI = this.add.image(-2135, -2450, 'UI_honey').setScale(1.4);
                        this.drawImage3 = false;
                    }
                }
            }
            else { // delete the image
                this.player2.item_slotUI.destroy(true);
                this.drawImage3 = true;

            }
            if (this.player2.item_slot2 != 0) {
                if (this.player2.item_slot2 == 1) { // boost
                    if (this.drawImage4) {
                        this.player2.item_slotUI2 = this.add.image(-2060, -2450, 'UI_boost').setScale(1.75);
                        this.drawImage4 = false;
                    }
                }
                else if (this.player2.item_slot2 == 2) { // hammer
                    if (this.drawImage4) {
                        this.player2.item_slotUI2 = this.add.image(-2060, -2450, 'UI_hammer').setScale(1.75);
                        this.drawImage4 = false;
                    }
                }
                else if (this.player2.item_slot2 == 3) { // banana
                    if (this.drawImage4) {
                        this.player2.item_slotUI2 = this.add.image(-2060, -2450, 'UI_banana').setScale(2.5);
                        this.drawImage4 = false;
                    }
                }
                else { // honey
                    if (this.drawImage4) {
                        this.player2.item_slotUI2 = this.add.image(-2060, -2450, 'UI_honey').setScale(1.4);
                        this.drawImage4 = false;
                    }
                }
            }
            else {
                this.player2.item_slotUI2.destroy(true);
                this.drawImage4 = true;
            }

            // Water, oil on the track that slow down player2
            if ((this.player2.x < -580 && this.player2.x > -780) && (this.player2.y < 1090 && this.player2.y > 926)) {
                if (this.oil_effect) {
                    this.sound.play("waterWalk");
                    this.carSpeed2 = 1;
                    this.player2.setVelocityX(1.4);
                    this.player2.setVelocityY(1.4);
                    this.player2.setAngularVelocity(this.SteeringWheel.rotation * 0.01 * Math.exp(-speedsquared / 100));
                    this.oil_effect = false;
                }
            }
            if ((this.player2.x < 1000 && this.player2.x > 930) && (this.player2.y < -620 && this.player2.y > -760)) {
                if (this.water_effect) {
                    this.sound.play("waterWalk");
                    this.carSpeed2 = 1;
                    this.player2.setVelocityX(1.4);
                    this.player2.setVelocityY(1.4);
                    this.player2.setAngularVelocity(this.SteeringWheel.rotation * 0.01 * Math.exp(-speedsquared / 100));
                    this.water_effect = false;
                }
            }

            this.carSpeed2Anim = this.carSpeed2;

            //console.log(this.carSpeedAnim);
            if (this.carSpeed2 < 0.67 / 2 && this.carSpeed2 > -0.67 / 2) {
                this.UI2_speed.anims.load('speed_increase', 0);
            }
            else if (this.carSpeed2Anim <= -0.67 / 2 && this.carSpeed2 > -1.34 / 2) {
                this.UI2_speed.anims.load('speed_increase', 1);
            }
            else if (this.carSpeed2Anim >= 0.67 / 2 && this.carSpeed2 < 1.34 / 2) {
                this.UI2_speed.anims.load('speed_increase', 1);
            }
            else if (this.carSpeed2Anim <= -1.34 / 2 && this.carSpeed2 > -2.01 / 2) {
                this.UI2_speed.anims.load('speed_increase', 2);
            }
            else if (this.carSpeed2Anim >= 1.34 / 2 && this.carSpeed2 < 2.01 / 2) {
                this.UI2_speed.anims.load('speed_increase', 2);
            }
            else if (this.carSpeed2Anim <= -2.01 / 2 && this.carSpeed2 > -2.68 / 2) {
                this.UI2_speed.anims.load('speed_increase', 3);
            }
            else if (this.carSpeed2Anim >= 2.01 / 2 && this.carSpeed2 < 2.68 / 2) {
                this.UI2_speed.anims.load('speed_increase', 3);
            }
            else if (this.carSpeed2Anim <= -2.68 / 2 && this.carSpeed2 > -3.35 / 2) {
                this.UI2_speed.anims.load('speed_increase', 4);
            }
            else if (this.carSpeed2Anim >= 2.68 / 2 && this.carSpeed2 < 3.35 / 2) {
                this.UI2_speed.anims.load('speed_increase', 4);
            }
            else if (this.carSpeed2Anim <= -3.35 / 2 && this.carSpeed2 > -4.02 / 2) {
                this.UI2_speed.anims.load('speed_increase', 5);
            }
            else if (this.carSpeed2Anim >= 3.35 / 2 && this.carSpeed2 < 4.02 / 2) {
                this.UI2_speed.anims.load('speed_increase', 5);
            }
            else if (this.carSpeed2Anim <= -4.02 / 2 && this.carSpeed2 > -4.69 / 2) {
                this.UI2_speed.anims.load('speed_increase', 6);
            }
            else if (this.carSpeed2Anim >= 4.02 / 2 && this.carSpeed2 < 4.69 / 2) {
                this.UI2_speed.anims.load('speed_increase', 6);
            }
            else if (this.carSpeed2Anim <= -4.69 / 2 && this.carSpeed2 > -5.36 / 2) {
                this.UI2_speed.anims.load('speed_increase', 7);
            }
            else if (this.carSpeed2Anim >= 4.69 / 2 && this.carSpeed2 < 5.36 / 2) {
                this.UI2_speed.anims.load('speed_increase', 7);
            }
            else if (this.carSpeed2Anim <= -5.36 / 2 && this.carSpeed2 > -6.03 / 2) {
                this.UI2_speed.anims.load('speed_increase', 8);
            }
            else if (this.carSpeed2Anim >= 5.36 / 2 && this.carSpeed2 < 6.03 / 2) {
                this.UI2_speed.anims.load('speed_increase', 8);
            }
            else if (this.carSpeed2Anim <= -6.03 / 2 && this.carSpeed2 > -6.7 / 2) {
                this.UI2_speed.anims.load('speed_increase', 9);
            }
            else if (this.carSpeed2Anim >= 6.03 / 2 && this.carSpeed2 < 6.7 / 2) {
                this.UI2_speed.anims.load('speed_increase', 9);
            }
            else if (this.carSpeed2Anim <= -6.7 / 2 && this.carSpeed2 > -7.37 / 2) {
                this.UI2_speed.anims.load('speed_increase', 10);
            }
            else if (this.carSpeed2Anim >= 6.7 / 2 && this.carSpeed2 < 7.37 / 2) {
                this.UI2_speed.anims.load('speed_increase', 10);
            }
            else if (this.carSpeed2Anim <= -7.37 / 2 && this.carSpeed2 > -8.04 / 2) {
                this.UI2_speed.anims.load('speed_increase', 11);
            }
            else if (this.carSpeed2Anim >= 7.37 / 2 && this.carSpeed2 < 8.04 / 2) {
                this.UI2_speed.anims.load('speed_increase', 11);
            }
            else if (this.carSpeed2Anim <= -8.04 / 2 && this.carSpeed2 > -8.71 / 2) {
                this.UI2_speed.anims.load('speed_increase', 12);
            }
            else if (this.carSpeed2Anim >= 8.04 / 2 && this.carSpeed2 < 8.71 / 2) {
                this.UI2_speed.anims.load('speed_increase', 12);
            }
            else if (this.carSpeed2Anim <= -8.71 / 2 && this.carSpeed2 > -9.38 / 2) {
                this.UI2_speed.anims.load('speed_increase', 13);
            }
            else if (this.carSpeed2Anim >= 8.71 / 2 && this.carSpeed2 < 9.38 / 2) {
                this.UI2_speed.anims.load('speed_increase', 13);
            }
            else {
                this.UI2_speed.anims.load('speed_increase', 14);
            }
        }

        if ((this.player2.x >= -830 && this.player2.x <= 850) && (this.player2.y >= 850 && this.player2.y <= 1200)) {
            if (this.player2_waypoint == 4 || this.player2_waypoint == 5) { // check if player2 is coming from right direction
                this.player2_waypoint = 5;
            }
        }
        else if ((this.player2.x >= 400 && this.player2.x <= 850) && (this.player2.y > 400 && this.player2.y <= 850)) { // to goal
            if (this.player2_waypoint == 5 || this.player2_waypoint == 6) {
                this.player2_waypoint = 6;
            }
        }
        else if ((this.player2.x >= 400 && this.player2.x <= 850) && (this.player2.y < 350 && this.player2.y >= 0)) {
            if (this.player2_waypoint == 6 || this.player2_waypoint == 1) {
                this.player2_waypoint = 1;
            }
        }
        else if ((this.player2.x >= 780 && this.player2.x <= 1200) && (this.player2.y >= -940 && this.player2.y <= 180)) {
            if (this.player2_waypoint == 1 || this.player2_waypoint == 2) {
                this.player2_waypoint = 2;
            }
        }
        else if ((this.player2.x >= -830 && this.player2.x <= 970) && (this.player2.y >= -1220 && this.player2.y <= -940)) {
            if (this.player2_waypoint == 2 || this.player2_waypoint == 3) {
                this.player2_waypoint = 3;
            }
        }
        else if ((this.player2.x >= -800 && this.player2.x <= -450) && (this.player2.y <= 850 && this.player2.y >= -940)) {
            if (this.player2_waypoint == 3 || this.player2_waypoint == 4) {
                this.player2_waypoint = 4;
            }
        }
        else {

        }

        if (this.lineEnter2) {
            if ((this.player2.x >= 400 && this.player2.x <= 850) && (this.player2.y <= 400 && this.player2.y >= 350)) { // goal line
                if (this.player2_waypoint == 6) {
                    this.player2_lap += 1;
                    this.lineEnter2 = false;
                    if (this.player2_lap == 2) { // Lap 2
                        this.sound.play("lapTwo");
                        this.UI2_lapcount.anims.load('lap_count', 1);
                        let UI2_laptwo = this.add.sprite(-2260, -2350, 'UI_laptwo').setScale(2.5);
                        UI2_laptwo.anims.play("lap_two");
                        UI2_laptwo.on('animationcomplete', () => {
                            UI2_laptwo.destroy(true);
                        })
                    }
                    if (this.player2_lap == 3) { // Last lap
                        this.sound.play("finalLap");
                        this.UI2_lapcount.anims.load('lap_count', 2);
                        let UI2_lapfinal = this.add.sprite(-2260, -2350, 'UI_lapfinal').setScale(2.5);
                        UI2_lapfinal.anims.play("lap_final");
                        UI2_lapfinal.on('animationcomplete', () => {
                            UI2_lapfinal.destroy(true);
                        })
                    }
                    if (this.player2_lap == 4) { // Player2 has finished the race.
                        this.sound.play("raceEnd");
                        this.player2Move = false;
                        this.player2Done = true;
                        console.log("Player2 has finished");
                    }

                }

            }
        }

        // Tracking who is ahead.
        if (this.player_lap == this.player2_lap) { // only check if players are on same lap.
            if (this.player_waypoint == this.player2_waypoint) { // players are in same box
                if (this.player_waypoint == 1) {
                    if (this.player.y < this.player2.y) { // player 1 is ahead
                        this.UI1_place.anims.load('UI_place', 0);
                        this.UI2_place.anims.load('UI_place', 1);
                    }
                    else { // player 2 is ahead
                        this.UI1_place.anims.load('UI_place', 1);
                        this.UI2_place.anims.load('UI_place', 0);
                    }
                }
                else if (this.player_waypoint == 2) {
                    if (this.player.y < this.player2.y) { // player 1 is ahead
                        this.UI1_place.anims.load('UI_place', 0);
                        this.UI2_place.anims.load('UI_place', 1);
                    }
                    else { // player 2 is ahead
                        this.UI1_place.anims.load('UI_place', 1);
                        this.UI2_place.anims.load('UI_place', 0);
                    }
                }
                else if (this.player_waypoint == 3) {
                    if (this.player.x < this.player2.x) { // player 1 is ahead
                        this.UI1_place.anims.load('UI_place', 0);
                        this.UI2_place.anims.load('UI_place', 1);
                    }
                    else { // player 2 is ahead
                        this.UI1_place.anims.load('UI_place', 1);
                        this.UI2_place.anims.load('UI_place', 0);
                    }
                }
                else if (this.player_waypoint == 4) {
                    if (this.player.y > this.player2.y) { // player 1 is ahead
                        this.UI1_place.anims.load('UI_place', 0);
                        this.UI2_place.anims.load('UI_place', 1);
                    }
                    else { // player 2 is ahead
                        this.UI1_place.anims.load('UI_place', 1);
                        this.UI2_place.anims.load('UI_place', 0);
                    }
                }
                else if (this.player_waypoint == 5) {
                    if (this.player.x > this.player2.x) { // player 1 is ahead
                        this.UI1_place.anims.load('UI_place', 0);
                        this.UI2_place.anims.load('UI_place', 1);
                    }
                    else { // player 2 is ahead
                        this.UI1_place.anims.load('UI_place', 1);
                        this.UI2_place.anims.load('UI_place', 0);
                    }
                }
                else { // waypoint == 6
                    if (this.player.y < this.player2.y) { // player 1 is ahead
                        this.UI1_place.anims.load('UI_place', 0);
                        this.UI2_place.anims.load('UI_place', 1);
                    }
                    else { // player 2 is ahead
                        this.UI1_place.anims.load('UI_place', 1);
                        this.UI2_place.anims.load('UI_place', 0);
                    }
                }
            }
            else if (this.player_waypoint > this.player2_waypoint) { // player 1 is ahead
                this.UI1_place.anims.load('UI_place', 0);
                this.UI2_place.anims.load('UI_place', 1);
            }
            else { // player 2 is ahead
                this.UI1_place.anims.load('UI_place', 1);
                this.UI2_place.anims.load('UI_place', 0);
            }
        }
        else if (this.player_lap > this.player2_lap) { // player 1 has lap lead
            this.UI1_place.anims.load('UI_place', 0);
            this.UI2_place.anims.load('UI_place', 1);
        }
        else { // player 2 has lap lead
            this.UI1_place.anims.load('UI_place', 1);
            this.UI2_place.anims.load('UI_place', 0);
        }
    }

    // Reference: https://docs.idew.org/video-game/project-references/phaser-coding/timers#create-count-up-timer
    // Display time for each player.
    displayPlayerTime() {
        //console.log("passed");
        var time = Math.floor(this.timer.getElapsedSeconds());
        var min = Math.floor(time / 60);
        var sec = time % 60;

        //console.log("min" + min);
        //console.log("sec" + sec);
        //console.log("time " + time);

        if (min < 10) {
            min = '0' + min;
        }
        if (sec < 10) {
            sec = '0' + sec;
        }
        if (this.playerMove) { // Only update timeDisplay when racing is happening. 
            this.timerDisplay.text = min + ':' + sec;
        }
        if (!this.playerDone) { // Track the total race time
            this.playerTotalTime = this.playerTotalTime + this.timer.getElapsedSeconds();
        }
    }

    displayPlayer2Time() {
        //console.log("passed");
        var time = Math.floor(this.timer2.getElapsedSeconds());
        var min = Math.floor(time / 60);
        var sec = time % 60;

        //console.log("min" + min);
        //console.log("sec" + sec);
        //console.log("time " + time);

        if (min < 10) {
            min = '0' + min;
        }
        if (sec < 10) {
            sec = '0' + sec;
        }
        if (this.player2Move) {
            this.timerDisplay2.text = min + ':' + sec;
        }
        if (!this.player2Done) {
            this.player2TotalTime = this.player2TotalTime + this.timer2.getElapsedSeconds();
        }
    }

    displayResult() {
        // stop all the sound effects
        this.bgm.setLoop(false);
        this.bgm.stop();
        this.engineIdle.stop();
        this.time.addEvent({
            delay: 6000,
            callback: () => {
                this.sound.play("raceResult");
                // Display scoreboard
                this.UIscoreboard = this.add.sprite(-3260, -3250, 'UI_scoreboard').setScale(4);
                this.UI2scoreboard = this.add.sprite(-2260, -2250, 'UI_scoreboard').setScale(4);
                this.UIscoreboard.anims.play('scoreboard');
                this.UI2scoreboard.anims.play('scoreboard');
                // Display general result - No effect on race number and winner
                this.first = this.add.image(-3400, -3300, "first").setScale(1);
                this.second = this.add.image(-3400, -3200, "second").setScale(1);
                this.first2 = this.add.image(-2400, -2300, "first").setScale(1);
                this.second2 = this.add.image(-2400, -2200, "second").setScale(1);
                if (this.playerTotalTime < this.player2TotalTime) { // player 1 is winner
                    game.settings.playerWon += 1;
                    // Display result
                    if (game.settings.raceNum == 1) { // Create variable for all so they can be deleted.
                        this.text1 = this.add.text(-3335, -3400, "Race 1", this.timerConfig);
                        this.text2 = this.add.text(-3360, -3310, "Player 1 - ", this.redConfig);
                        this.text3 = this.add.text(-3180, -3310, this.timerDisplay.text, this.generalConfig);
                        this.text4 = this.add.text(-3360, -3210, "Player 2 - ", this.blueConfig);
                        this.text5 = this.add.text(-3180, -3210, this.timerDisplay2.text, this.generalConfig);
                        this.text6 = this.add.text(-2335, -2400, "Race 1", this.timerConfig);
                        this.text7 = this.add.text(-2360, -2310, "Player 1 - ", this.redConfig);
                        this.text8 = this.add.text(-2180, -2310, this.timerDisplay.text, this.generalConfig);
                        this.text9 = this.add.text(-2360, -2210, "Player 2 - ", this.blueConfig);
                        this.text10 = this.add.text(-2180, -2210, this.timerDisplay2.text, this.generalConfig);
                    }
                    else if (game.settings.raceNum == 2) {
                        this.text1 = this.add.text(-3335, -3400, "Race 2", this.timerConfig);
                        this.text2 = this.add.text(-3360, -3310, "Player 1 - ", this.redConfig);
                        this.text3 = this.add.text(-3180, -3310, this.timerDisplay.text, this.generalConfig);
                        this.text4 = this.add.text(-3360, -3210, "Player 2 - ", this.blueConfig);
                        this.text5 = this.add.text(-3180, -3210, this.timerDisplay2.text, this.generalConfig);
                        this.text6 = this.add.text(-2335, -2400, "Race 2", this.timerConfig);
                        this.text7 = this.add.text(-2360, -2310, "Player 1 - ", this.redConfig);
                        this.text8 = this.add.text(-2180, -2310, this.timerDisplay.text, this.generalConfig);
                        this.text9 = this.add.text(-2360, -2210, "Player 2 - ", this.blueConfig);
                        this.text10 = this.add.text(-2180, -2210, this.timerDisplay2.text, this.generalConfig);
                    }
                    else {
                        this.text1 = this.add.text(-3385, -3400, "Final Race", this.timerConfig);
                        this.text2 = this.add.text(-3360, -3310, "Player 1 - ", this.redConfig);
                        this.text3 = this.add.text(-3180, -3310, this.timerDisplay.text, this.generalConfig);
                        this.text4 = this.add.text(-3360, -3210, "Player 2 - ", this.blueConfig);
                        this.text5 = this.add.text(-3180, -3210, this.timerDisplay2.text, this.generalConfig);
                        this.text6 = this.add.text(-2385, -2400, "Final Race", this.timerConfig);
                        this.text7 = this.add.text(-2360, -2310, "Player 1 - ", this.redConfig);
                        this.text8 = this.add.text(-2180, -2310, this.timerDisplay.text, this.generalConfig);
                        this.text9 = this.add.text(-2360, -2210, "Player 2 - ", this.blueConfig);
                        this.text10 = this.add.text(-2180, -2210, this.timerDisplay2.text, this.generalConfig);
                    }
                }
                else { // player 2 is winner
                    game.settings.player2Won += 1;
                    // Display result
                    if (game.settings.raceNum == 1) {
                        this.text1 = this.add.text(-3335, -3400, "Race 1", this.timerConfig);
                        this.text2 = this.add.text(-3360, -3310, "Player 2 - ", this.blueConfig);
                        this.text3 = this.add.text(-3180, -3310, this.timerDisplay2.text, this.generalConfig);
                        this.text4 = this.add.text(-3360, -3210, "Player 1 - ", this.redConfig);
                        this.text5 = this.add.text(-3180, -3210, this.timerDisplay.text, this.generalConfig);
                        this.text6 = this.add.text(-2335, -2400, "Race 1", this.timerConfig);
                        this.text7 = this.add.text(-2360, -2310, "Player 2 - ", this.blueConfig);
                        this.text8 = this.add.text(-2180, -2310, this.timerDisplay2.text, this.generalConfig);
                        this.text9 = this.add.text(-2360, -2210, "Player 1 - ", this.redConfig);
                        this.text10 = this.add.text(-2180, -2210, this.timerDisplay.text, this.generalConfig);
                    }
                    else if (game.settings.raceNum == 2) {
                        this.text1 = this.add.text(-3335, -3400, "Race 2", this.timerConfig);
                        this.text2 = this.add.text(-3360, -3310, "Player 2 - ", this.blueConfig);
                        this.text3 = this.add.text(-3180, -3310, this.timerDisplay2.text, this.generalConfig);
                        this.text4 = this.add.text(-3360, -3210, "Player 1 - ", this.redConfig);
                        this.text5 = this.add.text(-3180, -3210, this.timerDisplay.text, this.generalConfig);
                        this.text6 = this.add.text(-2335, -2400, "Race 2", this.timerConfig);
                        this.text7 = this.add.text(-2360, -2310, "Player 2 - ", this.blueConfig);
                        this.text8 = this.add.text(-2180, -2310, this.timerDisplay2.text, this.generalConfig);
                        this.text9 = this.add.text(-2360, -2210, "Player 1 - ", this.redConfig);
                        this.text10 = this.add.text(-2180, -2210, this.timerDisplay.text, this.generalConfig);
                    }
                    else {
                        this.text1 = this.add.text(-3385, -3400, "Final Race", this.timerConfig);
                        this.text2 = this.add.text(-3360, -3310, "Player 2 - ", this.blueConfig);
                        this.text3 = this.add.text(-3180, -3310, this.timerDisplay2.text, this.generalConfig);
                        this.text4 = this.add.text(-3360, -3210, "Player 1 - ", this.redConfig);
                        this.text5 = this.add.text(-3180, -3210, this.timerDisplay.text, this.generalConfig);
                        this.text6 = this.add.text(-2385, -2400, "Final Race", this.timerConfig);
                        this.text7 = this.add.text(-2360, -2310, "Player 2 - ", this.blueConfig);
                        this.text8 = this.add.text(-2180, -2310, this.timerDisplay2.text, this.generalConfig);
                        this.text9 = this.add.text(-2360, -2210, "Player 1 - ", this.redConfig);
                        this.text10 = this.add.text(-2180, -2210, this.timerDisplay.text, this.generalConfig);
                    }
                }
                this.time.addEvent({
                    delay: 6000,
                    callback: () => {
                        // check if any player has won the match.
                        // Remove the scoreboard
                        this.UIscoreboard.destroy(true);
                        this.UI2scoreboard.destroy(true);
                        this.first.destroy(true);
                        this.second.destroy(true);
                        this.text1.destroy(true);
                        this.text2.destroy(true);
                        this.text3.destroy(true);
                        this.text4.destroy(true);
                        this.text5.destroy(true);
                        this.text6.destroy(true);
                        this.text7.destroy(true);
                        this.text8.destroy(true);
                        this.text9.destroy(true);
                        this.text10.destroy(true);

                        // Race over, increase race number for next race
                        game.settings.raceNum += 1;

                        if (game.settings.playerWon == 2 || game.settings.player2Won == 2) { // Match over, victory scene
                            this.sound.play("raceWon");
                            // Match Victory display
                            if (game.settings.playerWon == 2) { // player 1 won
                                this.winnerAnim = this.add.sprite(-3253, -3280, 'winner').setScale(2.5);
                                this.winnerAnim.anims.play('winner');
                                this.winnerAnim = this.add.sprite(-2253, -2280, 'winner').setScale(2.5);
                                this.winnerAnim.anims.play('winner');
                                this.add.text(-3320, -3180, "Press '1' to", this.textConfig);
                                this.add.text(-3385, -3150, "go back to main menu", this.textConfig);
                                this.add.text(-2320, -2180, "Press '1' to", this.textConfig);
                                this.add.text(-2385, -2150, "go back to main menu", this.textConfig);
                            }
                            else { // player 2 won
                                this.winnerAnim = this.add.sprite(-3253, -3280, 'winner2').setScale(2.5);
                                this.winnerAnim.anims.play('winner2');
                                this.winnerAnim = this.add.sprite(-2253, -2280, 'winner2').setScale(2.5);
                                this.winnerAnim.anims.play('winner2');
                                this.add.text(-3320, -3180, "Press '1' to", this.textConfig);
                                this.add.text(-3385, -3150, "go back to main menu", this.textConfig);
                                this.add.text(-2320, -2180, "Press '1' to", this.textConfig);
                                this.add.text(-2385, -2150, "go back to main menu", this.textConfig);
                            }
                        }
                        else { // Match is not over, next race.
                            this.scene.restart();
                        }
                    },
                    loop: false
                })
            },
            loop: false
        })
    }
}