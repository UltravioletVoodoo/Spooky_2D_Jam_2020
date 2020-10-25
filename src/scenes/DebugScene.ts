import Phaser from 'phaser';
import State from '../State';

export default class DebugScene extends Phaser.Scene {

    private text!: Phaser.GameObjects.Text;

    constructor() {
        super('DebugScene');
    }

    create() {
        this.text = this.add.text(10, 10, "");
        this.scene.bringToTop('DebugScene');
    }

    update() {
        const state = State.get();
        this.text.setText(JSON.stringify({ ...state, 
            debug: {
                fps: this.game.loop.actualFps
            },
        }, null, 2));
    }

}