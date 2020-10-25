import Phaser from 'phaser';
import Config from '../Config';
import Assets from '~/Assets';

function fixText(text) {
    return text.replace(/(\n|$)/g, '    $1');
}

export default class QuoteScene extends Phaser.Scene {

    constructor() {
        super(QuoteScene.name);
    }

    preload() {
        Assets.preload(this);
    }

    create(data: { quote: string, delay: number, callback: (scene: Phaser.Scene) => void }) {
        const text = this.add.text(
            Config.scale.width / 2, 
            Config.scale.height * 0.45,
            fixText(data.quote),
            {
                fontFamily: 'Caveat',
                fontSize: 48,
                color: 'white',
                align: 'center',
            },
        );
        text.setOrigin(0.5, 0.5);
        this.cameras.main.fadeIn(1000);
        this.time.delayedCall(data.delay, () => {
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => data.callback(this));
        });
    }

    update() {}

}