// Spaceship prefab
class Spaceship4 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene, displayList, updateList
        this.points = pointValue;   // store pointValue
        this.isFiring2 = false;
    }

    update() {
        // move spaceship left
        
        if(Phaser.Input.Keyboard.JustDown(keyP) && !this.isFiring2){
            this.isFiring2 = true;
        }

        if(this.isFiring2 && this.x >= 0-this.width){
            this.x -= game.settings.spaceshipSpeed;
        }

        // wraparound from left to right edge
        if (this.x <= 0-this.width) {
            this.reset();
        }
    }

    reset() {
        this.isFiring2 = false;
        this.x = game.config.width;
    }
}