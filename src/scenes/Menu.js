class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {

    }

    create() {
        // menu display
        let menuConfig = {
            fontFamily: 'BIZ UDMincho Medium',
            fontSize: '28px',
            color: "#FFFFFF",
            align: 'right',
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

        this.add.text(centerX, centerY - textSpacer, 'Final Game Project', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - textSpacer/3, 'press 1 to go to play scene', menuConfig).setOrigin(0.5);

        // define keys
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyONE)){
            this.scene.start("playScene");
        }
    }
}