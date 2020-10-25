import Phaser from 'phaser';
import Assets from '~/Assets';
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
        if (state.items.key) numItems++;
        if (state.items.locket) numItems++;
        if (state.items.pocketwatch) numItems++;



        if (state.items.dogtags) {
            const xPos = Config.scale.width / 2;
            this.add.image(xPos, 60, Assets.dogTagsIcon);
        }
        if (state.items.key) {
            const xPos = Config.scale.width / 2;
            this.add.image(xPos, 60, Assets.keyIcon);
        }
        if (state.items.locket) {
            const xPos = Config.scale.width / 2;
            this.add.image(xPos, 60, Assets.mothersCharmIcon);
        }
        if (state.items.pocketwatch) {
            const xPos = Config.scale.width / 2;
            this.add.image(xPos, 60, Assets.pocketwatchAtlas);
        }

    }
}