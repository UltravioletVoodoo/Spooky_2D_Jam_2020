import Phaser from 'phaser';
import Assets from './Assets';
import Config from './Config';
import LevelScene from './scenes/LevelScene';

export default class Item {

    public sprite: Phaser.Physics.Arcade.Sprite;
    public itemKey: string;

    constructor(scene: LevelScene, x: number, y: number, itemKey: string, scriptKey?: string) {

        this.sprite = scene.physics.add.staticSprite(x, y, Assets[itemKey + 'Sprite']);
        this.itemKey = itemKey

        this.sprite.setDisplaySize(
            Config.scale.tile,
            Config.scale.tile,
        );
        this.sprite.setSize(
            Config.scale.tile,
            Config.scale.tile,
        );
        this.sprite.setOffset(20);
        scene.anims.create({
            key: itemKey + 'Sprite',
            frames: scene.anims.generateFrameNames(Assets[itemKey + 'Sprite'], {
                prefix: itemKey + '-idle000',
                suffix: '.png',
                start: 0,
                end: 5,
            }),
            frameRate: 4,
            repeat: -1,
        });
        this.sprite.play(itemKey + 'Sprite', true)
    }
}