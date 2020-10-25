import Phaser from 'phaser';
import Config from '../Config';
import Assets from '~/Assets';
import LevelScene from './LevelScene';
import DialogueScene from './DialogueScene';
import MainMenuScene from './MainMenuScene';
import State from '~/State';

export default class CreditScene extends Phaser.Scene {

    constructor() {
        super(CreditScene.name);
    }

    preload() {
        Assets.preload(this);
    }

    create() {
        let themeSound = this.sound.get(Assets.themeAudio);
        if (themeSound != null && themeSound.isPlaying) {
            this.sound.stopAll();
            this.sound.play(Assets.menuAudio, {
                volume: 0.5,
                loop: true,
            });
        }
        const image = this.add.image(this.scale.width / 2, this.scale.height / 2, Assets.credits1);
        this.cameras.main.fadeIn(2000);
        this.time.delayedCall(2000, () => {
            this.time.delayedCall(6000, () => {
                this.cameras.main.fadeOut(2000);
                this.time.delayedCall(2000, () => {
                    image.setTexture(Assets.credits2);
                    this.cameras.main.fadeIn(2000);
                    this.time.delayedCall(2000, () => {
                        this.time.delayedCall(6000, () => {
                            this.cameras.main.fadeOut(2000);
                            this.time.delayedCall(4000, () => {
                                State.reset();
                                this.scene.stop(LevelScene.name);
                                this.scene.stop(DialogueScene.name);
                                this.scene.start(MainMenuScene.name);
                            });
                        });
                    });
                });
            })
        });
    }

}