import Phaser from 'phaser';
import Assets from './Assets';
import Config from './Config';
import CreditScene from './scenes/CreditScene';
import DialogueScene from './scenes/DialogueScene';
import LevelScene from './scenes/LevelScene';
import QuoteScene from './scenes/QuoteScene';
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

        this.scene.time.delayedCall(800, () => {
            if (!state.wokenUp) {
                state.wokenUp = true;
                state.dialogue = {
                    scriptKey: 'wakeUp',
                    index: 0,
                };
                this.scene.scene.pause('LevelScene');
                this.scene.scene.launch('DialogueScene');
            }
        });
    }

    update() {
        const state = State.get();
        let actualVelocity = (state.sprint && state.sprintTime < 500) ? Velocity + Velocity * 1.5 * (500 - state.sprintTime) / 500 : Velocity;
        const directionVector = state.direction;

        if (state.level.x === 1 && state.level.y === 3 && this.sprite.x > 1200 && state.right && state.items.key == 0) {
            this.sprite.x = 1200;
            state.dialogue = {
                scriptKey: 'noKey',
                index: 0,
            };
            this.scene.scene.pause('LevelScene');
            this.scene.scene.launch('DialogueScene');
        }

        // Ensure we cannot exceed player velocity
        if (directionVector.length() > 0) {
            this.sprite.setMaxVelocity(
                actualVelocity * Math.abs(directionVector.x),
                actualVelocity * Math.abs(directionVector.y),
            );
        }

        
        if (state.level.x === 2 && state.level.y === 3 && this.sprite.x > 1000) {
            this.scene.scene.start('QuoteScene', {
                delay: 8000,
                quote: [
                    `Alette, having escaped the clutches of the graveyard,`,
                    `finally returned home. What she found was shocking!`,
                    `Her family was not as she left them; her children`,
                    `were grown and had children of their own.`,
                ].join('\n'),
                callback: (scene: Phaser.Scene) => {
                    scene.scene.start('QuoteScene', {
                        delay: 8000,
                        quote: [
                            `She turned around to find The Gloom,`,
                            `who suddenly looked familiar. He was her husband,`,
                            `the last person to visit her grave`,
                            `before moving into a grave himself.`
                        ].join('\n'),
                        callback: (scene: Phaser.Scene) => {
                            scene.scene.start('QuoteScene', {
                                delay: 8000,
                                quote: [
                                    `The Gloom believed that as long as he`,
                                    `could keep people in the graveyard,`,
                                    `they wouldn’t move on and leave him there alone.`,
                                    `Alette told the gloom:`,
                                ].join('\n'),
                                callback: (scene: Phaser.Scene) => {
                                    scene.scene.start('QuoteScene', {
                                        delay: 2000,
                                        quote: [
                                            `"It's time to move on"`
                                        ].join('\n'),
                                        callback: (scene: Phaser.Scene) => {
                                            scene.scene.start('QuoteScene', {
                                                delay: 2000,
                                                quote: [
                                                    `And that's what they did.`
                                                ].join('\n'),
                                                callback: (scene: Phaser.Scene) => {
                                                    scene.scene.start('CreditScene');
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                },
            });
            /*
            Alette, having escaped the clutches of the graveyard, finally returned home. What she found was shocking. Her family was not as she left them; her children were grown and had children of their own.
She turns around to find The Gloom, who suddenly looks familiar. He was her husband, the last person to keep visiting her grave before he died himself. The Gloom believed that as long as he could keep people in the graveyard, they wouldn’t move on and leave him there alone.
Alette convinces The Gloom that it is their time, and they finally, truly, pass on.
*/

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
                        scriptKey: state.visited[npc.name] ? npc.scriptKeyReturn : npc.scriptKey,
                        index: 0,
                    };
                    this.scene.scene.pause('LevelScene');
                    this.scene.scene.launch('DialogueScene');
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