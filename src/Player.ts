import Phaser from 'phaser';
import Assets from './Assets';
import Config from './Config';
import LevelScene from './scenes/LevelScene';
import State from './State';

const Velocity = 250;
const Acceleration = Infinity;
const Drag = 0.8;
const Animations = {
    idle: 'player-idle000',
    runUp: 'player-run-up000',
    runDown: 'player-run-down000',
    runLeft: 'player-run-left000',
    runRight: 'player-run-right000',
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
        this.sprite.setDamping(true);
        this.sprite.setDisplaySize(Config.scale.tile, Config.scale.tile);
        this.sprite.setDrag(Drag);
        this.sprite.body.setSize(Config.scale.tile * 0.75, Config.scale.tile * 0.75);

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
        if (directionVector.x > 0) { this.sprite.play(Animations.runRight, true); } else
        if (directionVector.x < 0) { this.sprite.play(Animations.runLeft, true);  } else
        if (directionVector.y > 0) { this.sprite.play(Animations.runDown, true);  } else
        if (directionVector.y < 0) { this.sprite.play(Animations.runUp, true);    } else
        { this.sprite.play(Animations.idle, true); }

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