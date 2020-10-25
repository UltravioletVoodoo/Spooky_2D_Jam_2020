import Phaser from 'phaser';
import State from '../State';
import Config from '../Config';
import Assets from '~/Assets';
import LevelScene from './LevelScene';

export default class MainMenuScene extends Phaser.Scene {

    private startText!: Phaser.GameObjects.Text;
    private startTextShadow!: Phaser.GameObjects.Text;

    constructor() {
        super(MainMenuScene.name);
    }

    preload() {
        Assets.preload(this);
    }

    create() {
        this.add.image(Config.scale.width / 2, Config.scale.height / 2, Assets.mainMenu);
        this.startTextShadow = this.add.text(
            Config.scale.width / 2, 
            Config.scale.height * 0.45,
            ' press < space > to start ',
            {
                fontFamily: 'Caveat',
                fontSize: 48,
                color: 'white',
            },
        );
        this.startTextShadow.setOrigin(0.5, 0.5);
        this.startTextShadow.setShadow(0, 0, '#ffffffff', 16);
        this.startTextShadow.alpha = 0;
        this.tweens.add({
            targets: this.startTextShadow,
            alpha: 1,
            yoyo: true,
            duration: 400,
            repeat: -1,
        });
        this.startText = this.add.text(
            Config.scale.width / 2, 
            Config.scale.height * 0.45,
            ' press < space > to start ',
            {
                fontFamily: 'Caveat',
                fontSize: 48,
                color: 'white',
            },
        );
        this.startText.setOrigin(0.5, 0.5);
    }

    update() {
        const state = State.get();
        if (state.enter) {
            this.startText.setColor('black');
            this.cameras.main.fadeOut(800);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start(LevelScene.name);
            });
        }
    }

}