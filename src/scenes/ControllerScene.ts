import Phaser from 'phaser';
import LevelScene from './LevelScene';
import DebugScene from './DebugScene';
import PostFxScene from './PostFxScene';
import Config from '../Config';
import State from '../State';
import InventoryScene from './InventoryScene';

const KeyCodes = Phaser.Input.Keyboard.KeyCodes;

interface Keys {
    [key: string]: Phaser.Input.Keyboard.Key;
}

export default class ControllerScene extends Phaser.Scene {

    private keys!: Keys;

    constructor() {
        super(ControllerScene.name);
    }

    create() {
        this.keys = this.input.keyboard.addKeys({
            // wasd
            w: KeyCodes.W,
            a: KeyCodes.A,
            s: KeyCodes.S,
            d: KeyCodes.D,

            // arrow
            up: KeyCodes.UP,
            left: KeyCodes.LEFT,
            down: KeyCodes.DOWN,
            right: KeyCodes.RIGHT,

            // other controls
            enter: KeyCodes.ENTER,
            space: KeyCodes.SPACE,
            escape: KeyCodes.ESC,
            backspace: KeyCodes.BACKSPACE,
        }) as Keys;

        // Launch other scenes
        this.scene.launch(LevelScene.name);
        this.scene.launch(PostFxScene.name);
        this.scene.launch(InventoryScene.name);
        if (Config.debug) {
            this.scene.launch(DebugScene.name);
        }
    }

    update() {
        const state = State.get();
        state.up = !(this.keys.w.isUp && this.keys.up.isUp);
        state.down = !(this.keys.s.isUp && this.keys.down.isUp);
        state.left = !(this.keys.a.isUp && this.keys.left.isUp);
        state.right = !(this.keys.d.isUp && this.keys.right.isUp);
        state.enter = (this.keys.space.isDown || this.keys.enter.isDown);
        state.back = (this.keys.escape.isDown || this.keys.backspace.isDown);
        state.releasedEnter = state.releasedEnter || !state.enter;
        state.releasedUp = state.releasedUp || !state.up;
        state.releasedDown = state.releasedDown || !state.down;
        state.direction = new Phaser.Math.Vector2(
            (state.right ? 1 : 0) - (state.left ? 1 : 0),
            (state.down ? 1 : 0) - (state.up ? 1 : 0),
        ).normalize();
    }

}