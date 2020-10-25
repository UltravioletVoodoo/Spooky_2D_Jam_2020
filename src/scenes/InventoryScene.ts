import Phaser from 'phaser';
import Config from '~/Config';
import Item from '~/Item';
import State from '../State';

export default class InventoryScene extends Phaser.Scene {


    constructor() {
        super(InventoryScene.name);
    }

    create() {

    }

    update() {
        const state = State.get();
        let items: string[] = [];

        let numItems: number = 0;
        if (state.items.dogtags) numItems++;
        if (state.items.keys) numItems++;
        if (state.items.locket) numItems++;
        if (state.items.pocketwatch) numItems++;



        if (state.items.dogtags) {
            const xPos = Config.scale.width / 2;
            this.add.image(xPos, 60, 'dogTagsIcon');
        }
        if (state.items.keys) {
            const xPos = Config.scale.width / 2;
            this.add.image(xPos, 60, 'keysIcon');
        }
        if (state.items.locket) {
            const xPos = Config.scale.width / 2;
            this.add.image(xPos, 60, 'locketIcon');
        }
        if (state.items.pocketwatch) {
            const xPos = Config.scale.width / 2;
            this.add.image(xPos, 60, 'pocketwatchIcon');
        }

    }
}