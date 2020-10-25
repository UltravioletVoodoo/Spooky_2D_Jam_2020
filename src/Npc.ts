import Phaser from 'phaser';
import Assets from './Assets';
import Config from './Config';
import LevelScene from './scenes/LevelScene';

export default class Npc {

    public sprite: Phaser.Physics.Arcade.Sprite;

    constructor(scene: LevelScene, x: number, y: number, name: string) {
        const scale = name === 'gloom' ? 2 : 1;
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
    }

}