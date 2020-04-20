class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('starfield', './assets/space-bg.jpg');
        this.load.image('debris', './assets/space-debris.png');
        this.load.image('spaceship', './assets/spaceship.png');
    }

    create() {
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.debris = this.add.tileSprite(0, 0, 640, 480, 'debris').setOrigin(0, 0);

        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 30).setOrigin(0,0);


        // menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '25px',
            backgroundColor: '#FACADE',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2-150;
        let textSpacer = 64;
        this.add.text(centerX, centerY- textSpacer, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '20px';
        this.add.text(centerX, centerY, 'Use ←→ arrows to move & ^ key to Fire', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY+textSpacer, '2P: Use A D to move & W to Fire', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY+textSpacer+textSpacer, '3P: Use I O P to shoot Spaceships', menuConfig).setOrigin(0.5);

        menuConfig.backgroundColor = '#EEE8AA';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY + textSpacer + textSpacer + textSpacer, '(1P) Press ← for Easy or → for Hard', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer + textSpacer + textSpacer + textSpacer, 'Press M for 2P', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer + textSpacer + textSpacer + textSpacer + textSpacer, 'Press R for 3P', menuConfig).setOrigin(0.5);


        
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        this.starfield.tilePositionX -= 3;  // scroll tile sprite
        this.debris.tilePositionX -= 1;  // scroll tile sprite

        this.ship01.update();           // update spaceships (x3)
        this.ship02.update();
        this.ship03.update();

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
                mult: 0
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");    
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000, 
                mult: 0
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene"); 
        }

        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000,
                mult: 1
            }

            this.sound.play('sfx_select');
            this.scene.start("playScene");    
        }

        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000,
                mult: 2
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");    
        }
    }
}