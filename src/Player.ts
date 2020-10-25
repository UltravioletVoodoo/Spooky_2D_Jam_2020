import Phaser from 'phaser';
import Assets from './Assets';
import Config from './Config';
import LevelScene from './scenes/LevelScene';
import State from './State';

const Scale = Config.scale.tile * 1.25 / 120;
const Velocity = 250;
const Acceleration = Infinity;
const Drag = 0.8;
const Animations = {
    down: 'alette-down000',
    left: 'alette-left000',
    up:   'alette-up000',
};

export default class Player {

    private scene: LevelScene;
    public sprite: Phaser.Physics.Arcade.Sprite;

    constructor(scene: LevelScene) {
        const state = State.get();
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(
            state.player.x,
            state.player.y,
            Assets.player,
        );
        this.sprite.setDisplaySize(
            1.25 * Config.scale.tile,
            1.25 * Config.scale.tile,
        );
        this.sprite.setSize(
            0.5  * Config.scale.tile,
            1.00 * Config.scale.tile,
        );
        this.sprite.setDamping(true);
        this.sprite.setDrag(Drag);
        console.log(this.sprite.body.offset);

        for (const name of Object.keys(Animations)) {
            scene.anims.create({
                key: Animations[name],
                frames: scene.anims.generateFrameNames(Assets.player, {
                    prefix: Animations[name],
                    suffix: '.png',
                    start: 0,
                    end: 4,
                }),
                frameRate: 4,
                repeat: -1,
            });
        }
        this.sprite.play(Animations.down, true);
    }

    update() {
        const state = State.get();
        const directionVector = state.direction;

        // Ensure we cannot exceed player velocity
        if (directionVector.length() > 0) {
            this.sprite.setMaxVelocity(
                Velocity * Math.abs(directionVector.x),
                Velocity * Math.abs(directionVector.y),
            );
        }

        // Accelerate in the correct directions
        this.sprite.setAcceleration(
            Acceleration * directionVector.x,
            Acceleration * directionVector.y,
        );

        // Animate player
        if (directionVector.x > 0) { 
            this.sprite.play(Animations.left, true); 
            this.sprite.scaleX = -Scale;
            this.sprite.body.offset.x = 80;
        } else if (directionVector.x < 0) { 
            this.sprite.play(Animations.left, true);
            this.sprite.scaleX = Scale;
            this.sprite.body.offset.x = 40;
        } else if (directionVector.y > 0) { 
            this.sprite.play(Animations.down, true);
            this.sprite.scaleX = Scale;
            this.sprite.body.offset.x = 40;
        } else if (directionVector.y < 0) { 
            this.sprite.play(Animations.up, true); 
            this.sprite.scaleX = Scale;
            this.sprite.body.offset.x = 40;
        }

        // Handle transitions
        if (!state.inTransition) {
            const state = State.get();
            if (this.sprite.y < 0) {
                this.scene.transition(() => {
                    this.sprite.y = Config.scale.height;
                    state.level.y -= 1;
                });
            } else if (this.sprite.y > Config.scale.height) {
                this.scene.transition(() => {
                    this.sprite.y = 0;
                    state.level.y += 1;
                });
            } else if (this.sprite.x < 0) {
                this.scene.transition(() => {
                    this.sprite.x = Config.scale.width;
                    state.level.x -= 1;
                });
            } else if (this.sprite.x > Config.scale.width) {
                this.scene.transition(() => {
                    this.sprite.x = 0;
                    state.level.x += 1;
                });
            }
        }

        this.updateState();
    }

    updateState() {
        const state = State.get();
        state.player = {
            x: this.sprite.x,
            y: this.sprite.y,
        };
    }

}