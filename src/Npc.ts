import Phaser from 'phaser';
import Assets from './Assets';
import Config from './Config';
import LevelScene from './scenes/LevelScene';

export default class Npc {

    public sprite: Phaser.Physics.Arcade.Sprite;
    public speechBubblesSprite: Phaser.GameObjects.Sprite;
    public scriptKey: string;

    constructor(scene: LevelScene, x: number, y: number, name: string, scriptKey: string) {
        const scale = name === 'gloom' ? 2 : 1;
        this.scriptKey = scriptKey;
        this.sprite = scene.physics.add.staticSprite(x, y, Assets[name + 'Sprite']);
        this.sprite.setDisplaySize(
            1.25 * Config.scale.tile * scale,
            1.25 * Config.scale.tile * scale,
        );
        this.sprite.setSize(
            0.5  * Config.scale.tile * scale,
            1.00 * Config.scale.tile * scale,
        );

        scene.anims.create({
            key: name + 'Sprite',
            frames: scene.anims.generateFrameNames(Assets[name + 'Sprite'], {
                prefix: name + '-idle000',
                suffix: '.png',
                start: 0,
                end: 5,
            }),
            frameRate: 4,
            repeat: -1,
        });
        this.sprite.play(name + 'Sprite', true);

        this.speechBubblesSprite = scene.add.sprite(x, y - Config.scale.tile, Assets.speechBubbles);
        this.speechBubblesSprite.setDisplaySize(
            0.75 * Config.scale.tile,
            0.75 * Config.scale.tile,
        );

        scene.anims.create({
            key: Assets.speechBubbles,
            frames: scene.anims.generateFrameNames(Assets.speechBubbles, {
                prefix: 'speechBubble000',
                suffix: '.png',
                start: 0,
                end: 5,
            }),
            frameRate: 3,
            repeat: -1,
        });
        this.speechBubblesSprite.setVisible(false);
    }

}