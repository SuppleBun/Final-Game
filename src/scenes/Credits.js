class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {

    }
   
    create() {
        // Credits title display
        let titleConfig = {
            fontFamily: 'Impact',
            fontSize: '65px',
            color: '#ffffff',
            align: 'right',
            stroke: '#000000',
            strokeThickness: 6,
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWith: 0
        }

        // Description display
        let optionsConfig = {
            fontFamily: 'Impact',
            fontSize: '30px',
            color: '#ffffff',
            align: 'right',
            stroke: '#000000',
            strokeThickness: 6,
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWith: 0
        }

        // display menu text
        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;
        let textSpacer = 100;

        this.add.text(centerX, centerY - textSpacer, 'Credits', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 10, 'Created by Tekkaden', optionsConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 55, 'Mingun Cho, Joonsu Jun, Sean Kang', optionsConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 100, 'UCSC Spring 2020 CMPM/ARTG 120', optionsConfig).setOrigin(0.5);

        // define keys
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    }

    update() {
        // Press 1 to go to menu
        if (Phaser.Input.Keyboard.JustDown(keyONE)) {
            this.scene.start("menuScene");
        }
    }
}