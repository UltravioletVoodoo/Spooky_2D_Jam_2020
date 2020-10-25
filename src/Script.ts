import Assets from './Assets';
import State from './State';

interface Script {
    [key: string]: {
        character: string,
        text: string,
        left: boolean,
        choices: {
            action: () => void,
            text: string,
        }[]
    }[]
}

// Just continues to the next part of the script
const ContinueDialogueChoices = [{
    action: () => {
        const state = State.get();
        if (state.dialogue) {
            state.dialogue.index += 1;
        }
    },
    text: 'Continue <enter>',
}];

// Exits dialogue
const ExitDialogueChoices = [{
    action: () => {
        const state = State.get();
        if (state.dialogue) {
            state.dialogue = undefined;
        }
    },
    text: 'Leave <enter>',
}];

// Action to go to a script key
function gotoAction(key: string) {
    return () => {
        const state = State.get();
        if (state.dialogue) {
            state.dialogue.scriptKey = key;
        }
    };
}


export default {
 
    testScene: [
        {
            character: Assets.alette,
            left: false,
            text: 'Hello, fellow ghost!',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.gloom,
            left: true,
            text: 'Make your choice',
            choices: [
                {
                    action: gotoAction('yesChoice'), 
                    text: 'yes',
                },
                {
                    action: gotoAction('noChoice'),
                    text: 'no',
                }
            ]
        }
    ],

    yesChoice: [
        {
            character: Assets.aunt,
            left: false,
            text: 'You chose yes.',
            choices: ExitDialogueChoices,
        },
    ],

    noChoice: [
        {
            character: Assets.aunt,
            left: false,
            text: 'You chose no',
            choices: ExitDialogueChoices,
        },
    ],

} as Script;