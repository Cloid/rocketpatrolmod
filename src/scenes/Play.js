class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        console.log(game.settings.mult);
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

    
        // white rectangle borders
        //this.add.rectangle(0, 0, 640, 35, 0xFACADE).setOrigin(0, 0);
        //this.add.rectangle(0, 443, 640, 40, 0xFACADE).setOrigin(0, 0);
        //this.add.rectangle(0, 5, 32, 455, 0xFACADE).setOrigin(0, 0);
        //this.add.rectangle(610, 0, 32, 455, 0xFACADE).setOrigin(0, 0);
        // green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2 - 8, 431, 'rocket').setScale(0.5, 0.5).setOrigin(0, 0);

        if(game.settings.mult == 1){
            this.p2Rocket = new Rocket2(this, game.config.width/2 - 40, 431, 'rocket').setScale(0.5, 0.5).setOrigin(0, 0);
            keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
            keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
            keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        }

        if(game.settings.mult == 2){
            // add 3rd player, spaceships (x3)
            keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
            keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
            keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
            this.ship01 = new Spaceship2(this, game.config.width + 192, 132, 'spaceship', 0, 30).setOrigin(0,0);
            this.ship02 = new Spaceship3(this, game.config.width + 96, 196, 'spaceship', 0, 20).setOrigin(0,0);
            this.ship03 = new Spaceship4(this, game.config.width, 260, 'spaceship', 0, 10).setOrigin(0,0);
        } else {
            // add spaceships (x3)
            this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 30).setOrigin(0,0);
            this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20).setOrigin(0,0);
            this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10).setOrigin(0,0);
        }


        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);



 

        

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        //this.cameras.main.setBounds(0, 0, game.widthInPixels, game.heightInPixels);
        //this.cameras.main.setZoom(1);

        //this.cameras.main.startFollow(this.p1Rocket);

        //cam.pan(500, 500, 2000,);
           // this.cameras.main.zoomTo(-1, 5000);

        // player 1 score
        this.p1Score = 0;
        this.hScore = highScore;

        if(game.settings.gameTimer == 60000){
            this.timeMe = 60;

        } else{
            this.timeMe = 45;
        }


        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(400, 54,"HS: " + this.hScore, scoreConfig);

        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        //this.timeMid = this.add.text(225, 54, Math.floor(this.timeMe/1000), scoreConfig);

       this.timeMid = this.add.text(225, 54, this.timeMe-this.clock.getElapsedSeconds(), scoreConfig);


    }

    update() {
        // check key input for restart / menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            highScore = this.p1Score;
            console.log(highScore);
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;  // scroll tile sprite

        if (!this.gameOver) {         
            
            if(game.settings.mult == 1){
                this.p2Rocket.update();
            }
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        }             
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        
        if (game.settings.mult == 1) {


            if (this.checkCollision(this.p2Rocket, this.ship03)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship03);
            }
            if (this.checkCollision(this.p2Rocket, this.ship02)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship02);
            }
            if (this.checkCollision(this.p2Rocket, this.ship01)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship01);
            }

        }

        if(this.hScore <= this.p1Score){
            this.scoreRight.setText("HS: " + this.p1Score) ;
        }
        //this.timeMe-=16.666;
        //this.timeMe-=this.clock.getElapsed()        ;
        //this.timeMid.setText(Math.floor(this.timeMe/1000));

        this.timeMid.setText(Math.floor(this.timeMe-this.clock.getElapsedSeconds()));


    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        // play sound
        this.sound.play('sfx_explosion');  
    }
}