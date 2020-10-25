import Phaser from 'phaser';
import Config from '../Config';
import Assets from '../Assets';

export default class PostFxScene extends Phaser.Scene {

    constructor() {
        super('PostFxScene');
    }

    preload() {
        this.load.glsl(Assets.shader, Assets.shader);
    }

    create() {
        this.add.shader(
            Assets.shader, 
            Config.scale.width / 2, Config.scale.height / 2, 
            Config.scale.width, Config.scale.height,
        );
    }

}