// game configuration object
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

// main game object
let game = new Phaser.Game(config);

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000,
    mult: 0
}

// reserve keyboard vars
let keyF, keyLEFT, keyRIGHT;
//Multiplayer keyboard vars
let keyW, keyA, keyD;
//Menu Selection keyboard vars
let keyM, keyR;
//Rocket Controls
let keyI, keyO, keyP;
// reserve
var highScore = 0;