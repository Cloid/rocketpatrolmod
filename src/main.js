// game configuration object
// Mods
// Implement a simultaneous two-player mode (50) -control 2 Rockets (2p), or a third player with Spaceships
// Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (25) - the antenna class worth 60 points and 1.5* faster
// Display the time remaining (in seconds) on the screen (15) - Added time in game.
// Track a high score that persists across scenes and display it in the UI (10) - High Score in top right of play
// Create a new scrolling tile sprite for the background (10)
// Implement parallax scrolling (15)


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
// reserve score
var highScore = 0;