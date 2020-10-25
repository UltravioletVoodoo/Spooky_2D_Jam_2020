import Phaser from 'phaser';
import LevelScene from './LevelScene';
import Config from '../Config';
import Assets from '../Assets';
import State from '../State';
import Script from '../Script';
import ChoiceScene from './ChoiceScene';

const CharacterLeftX = Config.scale.width * 0.12;
const CharacterRightX = Config.scale.width * 0.88;
const TransitionTime = 500;

const CharacterNames = {
    [Assets.alette]: 'Alette',
    [Assets.aunt]: 'Aunt Azalea',
    [Assets.grandpa]: 'Grandpa Eugene',
    [Assets.sister]: 'Little Sister Camilla',
    [Assets.gloom]: 'The Gloom',
};

function fixText(text) {
    return (text +'\n').replace(/\n/, '    \n');
}

export default class DialogueScene extends Phaser.Scene {

    private fade!: Phaser.GameObjects.Rectangle;
    private character!: Phaser.GameObjects.Image;
    private dialogueBox!: Phaser.GameObjects.Image;
    private characterText!: Phaser.GameObjects.Text;
    private dialogueText!: Phaser.GameObjects.Text;

    constructor() {
        super('DialogueScene');
    }

    create() {
        // Handle fade
        this.fade = this.add.rectangle(Config.scale.width / 2, Config.scale.height / 2, Config.scale.width, Config.scale.height, 0x000, 0.5);
        this.fade.alpha = 0;
        this.tweens.add({
            targets: this.fade,
            duration: TransitionTime,
            alpha: 1,
            ease: 'Power2',
        });

        const state = State.get();
        if (!state.dialogue) {
            throw new Error('Something went wrong!');
        }
        const script = Script[state.dialogue.scriptKey][state.dialogue.index];
        
        // Handle Character
        this.character = this.add.image(
            script.left ? CharacterLeftX : CharacterRightX, 
            Config.scale.height / 2 - 50, 
            script.character
        );
        this.character.setScale(0.75);
        this.character.scaleX = script.left ? -Math.abs(this.character.scaleX) : Math.abs(this.character.scaleX);
        this.character.alpha = 0;
        this.tweens.add({
            targets: this.character,
            duration: TransitionTime * 2,
            alpha: 0.9,
            ease: 'Power2',
            delay: TransitionTime,
        });
        this.tweens.add({
            targets: this.character,
            duration: 2000,
            y: Config.scale.height / 2 - 35,
            repeat: -1,
            ease: 'Sine',
            yoyo: true,
        });

        this.dialogueBox = this.add.image(Config.scale.width / 2, Config.scale.height * 1.5, Assets.dialogue);
        this.dialogueBox.alpha = 0.9;
        this.tweens.add({
            targets: this.dialogueBox,
            y: Config.scale.height * 0.75,
            duration: TransitionTime,
            ease: 'Power2',
        });

        this.characterText = this.add.text(
            Config.scale.width * 0.23, Config.scale.height * 0.63,
            fixText(CharacterNames[script.character]),
            {
                fontFamily: 'Caveat',
                fontSize: 48,
                fontWeight: 'bold',
                color: 'black',
            },
        );
        this.characterText.setShadow(2, 2, 'rgb(0, 0, 0, 0.4)', 0);
        this.characterText.alpha = 0;
        
        this.dialogueText = this.add.text(
            Config.scale.width * 0.24, Config.scale.height * 0.70, 
            fixText(script.text),
            {
                fontFamily: 'Caveat',
                fontSize: 32,
                color: 'black',
            },
        );
        this.dialogueText.alpha = 0;
        this.tweens.add({
            targets: [ this.dialogueText, this.characterText ],
            duration: TransitionTime,
            delay: TransitionTime,
            alpha: 1,
        });
    }

    nextDialogue() {
        const state = State.get();
        if (!state.dialogue) {
            return;
        }
        const script = Script[state.dialogue.scriptKey][state.dialogue.index];
        this.time.delayedCall(TransitionTime, () => {
            this.character.setX(script.left ? CharacterLeftX : CharacterRightX);
            this.character.setTexture(script.character);
            this.character.scaleX = script.left ? -Math.abs(this.character.scaleX) : Math.abs(this.character.scaleX);
            this.characterText.setText(fixText(CharacterNames[script.character]));
            this.dialogueText.setText(fixText(script.text));
        });
        this.add.tween({
            targets: [ this.character, this.characterText, this.dialogueText ],
            alpha: 0,
            duration: TransitionTime,
            ease: 'Power2',
        });
        this.add.tween({
            targets: [ this.characterText, this.dialogueText ],
            alpha: 1,
            duration: TransitionTime,
            ease: 'Power2',
            delay: TransitionTime,
        });
        this.add.tween({
            targets: [ this.character ],
            alpha: 1,
            duration: TransitionTime * 2,
            ease: 'Power2',
            delay: TransitionTime * 1.5,
        });
    }

    update() {
        const state = State.get();
        // Dialogue over
        if (!state.dialogue) {
            // Handle fade
            this.tweens.add({
                targets: this.fade,
                duration: TransitionTime / 2,
                ease: 'Power2',
                alpha: 0,
                delay: TransitionTime / 2,
            })

            this.add.tween({
                targets: [ this.character, this.characterText, this.dialogueText ],
                duration: TransitionTime / 2,
                ease: 'Power2',
                alpha: 0,
            });

            // Handle dialogue box
            this.tweens.add({
                targets: this.dialogueBox,
                y: Config.scale.height * 1.5,
                duration: TransitionTime * 2,
                ease: 'Power2',
                delay: TransitionTime / 2,
            });
            this.time.delayedCall(TransitionTime, () => {
                this.scene.resume('LevelScene');
                this.scene.stop('DialogueScene');
            });
            return;
        }
        // Handle input
        if (state.enter && state.releasedEnter) {
            state.releasedEnter = false;
            let script = Script[state.dialogue.scriptKey][state.dialogue.index];
            let choices = script.choices();
            if (choices.length == 1) {
                choices[0].action();
                this.nextDialogue();
            } else {
                this.scene.pause('DialogueScene');
                console.log(choices);
                this.scene.launch('ChoiceScene', [ choices, () => {
                    this.scene.resume('DialogueScene');
                    this.nextDialogue();
                }]);
            }
        }


    }

}