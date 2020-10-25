import Phaser from 'phaser';
import Assets from './Assets';
import Config from './Main';
import LevelScene from './scenes/LevelScene';
import State from './State';


export default class Enemy {

    public sprite: Phaser.Physics.Arcade.Sprite;
    private aggroDistance: number;
    private speed: number;

    constructor(scene: LevelScene, x: number, y: number) {
        this.sprite = scene.physics.add.sprite(x, y, 'gloomSprite');
        this.aggroDistance = 200;
        this.speed = 1;

        this.sprite.setOffset(105, 120);

        scene.anims.create({
            key: 'gloomSprite',
            frames: scene.anims.generateFrameNames(Assets.gloomSprite, {
                prefix: 'gloom-idle000',
                suffix: '.png',
                start: 0,
                end: 5,
            }),
            frameRate: 4,
            repeat: -1,
        });
        this.sprite.play('gloomSprite', true);
    }

    update() {
        const state = State.get()

        const dx = state.player.x - this.sprite.x
        const dy = state.player.y - this.sprite.y

        if (Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) <= this.aggroDistance) {
            this.sprite.setTint(0xff0000)
            if (Math.abs(dx) > Math.abs(dy)) {
                if (dx > 0) {
                    this.sprite.x += this.speed
                } else {
                    this.sprite.x -= this.speed
                }
            } else {
                if (dy > 0) {
                    this.sprite.y += this.speed
                } else {
                    this.sprite.y -= this.speed
                }
            }
        } else {
            this.sprite.setTint(0xffffff)
        }
    }
}