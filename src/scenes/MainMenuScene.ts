import Phaser from 'phaser';
import State from '../State';
import Config from '../Config';
import Assets from '~/Assets';
import LevelScene from './LevelScene';
import QuoteScene from './QuoteScene';

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
        this.sound.play(Assets.menuAudio, {
            volume: 0.5,
            loop: true,
        });
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
            duration: 800,
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
        this.cameras.main.fadeIn(2000);
    }

    update() {
        const state = State.get();        
        if (state.enter) {
            this.startText.setColor('black');
            this.cameras.main.fadeOut(800);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start(QuoteScene.name, {
                    delay: 7000,
                    quote: `“After a loved one dies, there comes a time when you must move on,\n              not long after they must learn to move on too”`, 
                    callback: (scene: Phaser.Scene) => {
                        scene.scene.start(LevelScene.name);
                    },
                });
            });
        }
    }

}