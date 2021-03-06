import Phaser from 'phaser';
import State from '../State';
import Config from '../Config';

import { Choice } from '../Script';

function fixText(text?:string) {
    return '    ' + text + '    ';
}

export default class ChoiceScene extends Phaser.Scene {

    private fade!: Phaser.GameObjects.Rectangle;
    private choices!: Choice[];
    private choiceText!: Phaser.GameObjects.Text[];
    private choiceTextShadows!: Phaser.GameObjects.Text[];
    private selectedChoice!: number;
    private callback!: () => void;
    private currentShadow!: Phaser.Tweens.Tween;

    constructor() {
        super('ChoiceScene');
    }

    create(data: [ Choice[], () => void ]) {
        const [ choices, callback ] = data;
        this.choices = choices;
        this.choiceText = new Array(choices.length);
        this.choiceTextShadows = new Array(choices.length);
        this.callback = callback;
        this.selectedChoice = 0;
        // Handle fade
        this.fade = this.add.rectangle(Config.scale.width / 2, Config.scale.height / 2, Config.scale.width, Config.scale.height, 0x000, 1.0);
        this.fade.alpha = 0;
        this.tweens.add({
            targets: this.fade,
            duration: 1000,
            alpha: 1,
            ease: 'Power2',
        });

        choices.forEach((choice, i) => {
            const text = this.add.text(
                Config.scale.width / 2, 
                Config.scale.height / 2 - (choices.length / 2 * 48) + (i * 48),
                fixText(choice.text), 
                {
                    fontFamily: 'Caveat',
                    fontSize: 32,
                    color: 'white',
                },
            );
            text.setOrigin(0.5, 0.5);
            const textShadow = this.add.text(
                Config.scale.width / 2, 
                Config.scale.height / 2 - (choices.length / 2 * 48) + (i * 48),
                fixText(choice.text), 
                {
                    fontFamily: 'Caveat',
                    fontSize: 36,
                    color: 'white',
                },
            );
            textShadow.setOrigin(0.5, 0.5);
            textShadow.setShadow(0, 0, '#ffffffff', 16);
            textShadow.alpha = 0;
            
            this.choiceText[i] = text;
            this.choiceTextShadows[i] = textShadow;
        });
        this.setShadow();
    }

    setShadow() {
        if (this.currentShadow) {
            for (const shadow of this.choiceTextShadows) {
                shadow.alpha = 0;
            }
            this.tweens.remove(this.currentShadow);
        }
        this.currentShadow = this.tweens.add({
            targets: this.choiceTextShadows[this.selectedChoice],
            alpha: 1,
            yoyo: true,
            duration: 400,
            repeat: -1,
        });
    }

    update() {
        const state = State.get(); 
        if (state.up && state.releasedUp) {
            state.releasedUp = false;
            this.selectedChoice -= 1;
            if (this.selectedChoice < 0) {
                this.selectedChoice += this.choices.length;
            }
            this.setShadow();
        } else if (state.down && state.releasedDown) {
            state.releasedDown = false;
            this.selectedChoice = (this.selectedChoice + 1) % this.choices.length;
            this.setShadow();
        } else if (state.enter && state.releasedEnter) {
            state.releasedEnter = false;
            this.choices[this.selectedChoice].action();
            this.callback();
            this.scene.stop('ChoiceScene');
        }
    }

}