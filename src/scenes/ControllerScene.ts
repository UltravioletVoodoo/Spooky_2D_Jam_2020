import Phaser from 'phaser';
import MainMenuScene from './MainMenuScene';
import DebugScene from './DebugScene';
import PostFxScene from './PostFxScene';
import Config from '../Config';
import State from '../State';
import LevelScene from './LevelScene';
import CreditScene from './CreditScene';
import Assets from '~/Assets';

const KeyCodes = Phaser.Input.Keyboard.KeyCodes;

interface Keys {
    [key: string]: Phaser.Input.Keyboard.Key;
}

export default class ControllerScene extends Phaser.Scene {

    private keys!: Keys;

    constructor() {
        super('ControllerScene');
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

            // shift
            sprint: KeyCodes.SHIFT,

            // other controls
            enter: KeyCodes.ENTER,
            space: KeyCodes.SPACE,
            escape: KeyCodes.ESC,
            backspace: KeyCodes.BACKSPACE,

            debug1: KeyCodes.ONE,
            debug2: KeyCodes.TWO,
        }) as Keys;

        // Dummy text
        this.add.text(0, 0, 'load my font', { fontFamily: 'Caveat', color: 'black' });

        // Launch other scenes
        this.scene.launch('PostFxScene');
        if (Config.debug) {
            this.scene.launch('DebugScene');
        }
        this.time.delayedCall(0, () => {
            this.scene.launch('MainMenuScene');
            this.scene.launch('PostFxScene');
            if (Config.debug) {
                this.scene.launch('DebugScene');
            }
        });
    }

    update(_, delta) {
        const state = State.get();
        state.up = !(this.keys.w.isUp && this.keys.up.isUp);
        state.down = !(this.keys.s.isUp && this.keys.down.isUp);
        state.left = !(this.keys.a.isUp && this.keys.left.isUp);
        state.right = !(this.keys.d.isUp && this.keys.right.isUp);
        state.enter = (this.keys.space.isDown || this.keys.enter.isDown);
        state.back = (this.keys.escape.isDown || this.keys.backspace.isDown);
        state.sprint = (this.keys.sprint.isDown);
        if (state.sprintTime === 0 && state.sprint && this.scene.isActive('LevelScene')) {
            this.sound.play(Assets.ghostAudio);
        }
        if (state.sprint) {
            state.sprintTime = Math.min(600, state.sprintTime + delta);
        } else {
            state.sprintTime = Math.max(0, state.sprintTime - delta * 2);
        }
        state.releasedEnter = state.releasedEnter || !state.enter;
        state.releasedUp = state.releasedUp || !state.up;
        state.releasedDown = state.releasedDown || !state.down;
        state.direction = new Phaser.Math.Vector2(
            (state.right ? 1 : 0) - (state.left ? 1 : 0),
            (state.down ? 1 : 0) - (state.up ? 1 : 0),
        ).normalize();

        if (Config.debug) {
            if (this.keys.debug1.isDown) {
                this.scene.stop('MainMenuScene');
                this.scene.launch('LevelScene');
            }
            if (this.keys.debug2.isDown) {
                this.scene.stop('MainMenuScene');
                this.scene.launch('CreditScene');
            }
        }

    }

}