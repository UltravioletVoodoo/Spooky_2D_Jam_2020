import Phaser from 'phaser';
import Assets from './Assets';
import Config from './Config';
import DialogueScene from './scenes/DialogueScene';
import LevelScene from './scenes/LevelScene';
import State from './State';

const Scale = Config.scale.tile * 1.25 / 120;
const Velocity = 250;
const Acceleration = Infinity;
const Drag = 0.8;
const NpcActivationDistance = 150;
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
            20,
            20,
        );
        this.sprite.setDamping(true);
        this.sprite.setDrag(Drag);

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
        const actualVelocity = (state.sprint && state.sprintTime < 1000) ? Velocity * 2 : Velocity;
        const directionVector = state.direction;

        // Ensure we cannot exceed player velocity
        if (directionVector.length() > 0) {
            this.sprite.setMaxVelocity(
                actualVelocity * Math.abs(directionVector.x),
                actualVelocity * Math.abs(directionVector.y),
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
            this.sprite.body.offset.x = 70;
        } else if (directionVector.x < 0) { 
            this.sprite.play(Animations.left, true);
            this.sprite.scaleX = Scale;
            this.sprite.body.offset.x = 50;
        } else if (directionVector.y > 0) { 
            this.sprite.play(Animations.down, true);
            this.sprite.scaleX = Scale;
            this.sprite.body.offset.x = 50;
        } else if (directionVector.y < 0) { 
            this.sprite.play(Animations.up, true); 
            this.sprite.scaleX = Scale;
            this.sprite.body.offset.x = 50;
        }

        // Handle npcs
        let visitedNpc = false;
        for (const npc of this.scene.npcs) {
            if (npc.sprite.body.position.distance(this.sprite.body.position) < NpcActivationDistance && !visitedNpc) {
                visitedNpc = true;
                npc.speechBubblesSprite.setVisible(true);
                if (state.enter && state.releasedEnter) {
                    state.releasedEnter = false;
                    state.dialogue = {
                        scriptKey: npc.scriptKey,
                        index: 0,
                    };
                    this.scene.scene.pause(LevelScene.name);
                    this.scene.scene.launch(DialogueScene.name);
                }

            } else {
                npc.sprite.setTint(0xffffff);
                npc.speechBubblesSprite.play(Assets.speechBubbles);
                npc.speechBubblesSprite.setVisible(false);
            }
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