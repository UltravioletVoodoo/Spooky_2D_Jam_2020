import Phaser from 'phaser';
import Config from '../Config';
import Assets from '~/Assets';

export default class CreditScene extends Phaser.Scene {

    constructor() {
        super(CreditScene.name);
    }

    preload() {
        Assets.preload(this);
    }

    create(data: { quote: string, delay: number, callback: (scene: Phaser.Scene) => void }) {
        
    }

    update() {}

}