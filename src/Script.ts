import Assets from './Assets';
import State from './State';

export interface Choice {
    action: () => void,
    text?: string,
}

interface Script {
    [key: string]: {
        character: string,
        left: boolean,
        text: string,
        choices: () => Choice[],
    }[],
}

// Just continues to the next part of the script
const ContinueDialogueChoices = () => [{
    action: () => {
        const state = State.get();
        if (state.dialogue) {
            state.dialogue.index += 1;
        }
    },
    text: 'Continue <enter>',
}];

// Exits dialogue
const ExitDialogueChoices = () => [{
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
            state.dialogue.index = 0;
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
            choices: () => {
                return [
                    {
                        action: gotoAction('yesChoice'),
                        text: 'yes',
                    },
                    {
                        action: gotoAction('noChoice'),
                        text: 'no',
                    }
                ]
            },
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

    //
    // INTERNAL
    //
    wakeUp: [
        {
            character: Assets.alette,
            left: false,
            text: 'Where am I? Who did this to me? I need to go home, my\nfamily must be worried.',
            choices: ExitDialogueChoices,
        },
    ],

    findDogtags: [
        {
            character: Assets.alette,
            left: false,
            text: 'Uncle’s dogtag. Auntie must be confused. Come to think of it,\nI’m rather confused, myself. Uncle died not long ago, and\nAuntie died before he did… I should return to Aunt Azalea\nand figure out what’s going on here. I need to go home.',
            choices: ExitDialogueChoices,
        },
    ],

    //
    // AUNT
    //
    meetAunt: [
        {
            character: Assets.aunt,
            left: true,
            text: 'Oh, I was wondering when you would come back for a visit.\nHow nice to see you again.',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.alette,
            left: false,
            text: 'Hi, Aunt Azalea. How is your garden?',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.aunt,
            left: true,
            text: 'Oh it’s good. If only my husband were here, I could show it\nto him. Would you find him for me, darling? He should be\naround here somewhere.',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.alette,
            left: false,
            text: 'Sure, Auntie. I’ll look for him.',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.aunt,
            left: true,
            text: 'Thank you, my love.',
            choices: ExitDialogueChoices,
        },
    ],

    returnToAunt: [
        {
            character: Assets.aunt,
            left: true,
            text: 'Did you find him?',
            choices: () => {
                const state = State.get();
                if (state.items['dogtags']) {
                    return [
                        {
                            action: gotoAction('yesChoiceAunt'),
                            text: 'yes',
                        },
                        {
                            action: gotoAction('noChoiceAunt'),
                            text: 'no',
                        }
                    ];
                }
                else {
                    return ExitDialogueChoices();
                }
            },
        },
    ],

    yesChoiceAunt: [
        {
            character: Assets.aunt,
            left: true,
            text: 'You did?',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.alette,
            left: false,
            text: 'Well, actually, not exactly. I hate to be the one to tell\nyou this, but Uncle passed away not long ago. I found his\ndogtags over by his grave.',
            choices: () => {
                return [
                    {
                        action: gotoAction('auntReaction'),
                    }
                ]
            },
        },
    ],

    noChoiceAunt: [
        {
            character: Assets.alette,
            left: true,
            text: 'No, Auntie. I hate to be the one to tell you this, but Uncle\npassed away not long ago. I found his dogtags over by his\ngrave.',
            choices: () => {
                return [
                    {
                        action: gotoAction('auntReaction'),
                    }
                ]
            },
        },
    ],

    auntReaction: [
        {
            character: Assets.aunt,
            left: true,
            text: 'Passed away? Oh no. We shall live here together then. I’ll find\nhis grave and walk to see him every day.',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.alette,
            left: false,
            text: 'You and I could walk that way together. I’m planning on\nheading out and returning home.',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.aunt,
            left: true,
            text: 'But you’re dead, sweetheart. The Gloom won’t let you leave.',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.alette,
            left: false,
            text: 'The Gloom? I don’t believe you. I have to go.',
            choices: ExitDialogueChoices,
        },
    ],

    //
    // GRANDPA
    //
    meetGrandpa: [
        {
            character: Assets.grandpa,
            left: true,
            text: 'Don’t bother me, I’m busy.',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.alette,
            left: false,
            text: 'What are you doing? Maybe I could help.',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.grandpa,
            left: true,
            text: 'I’m looking for my pocket watch. Kids these days, you probably\ndon’t even know what that is! It’s very special to me, my wife\ngave it to me before she died.',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.alette,
            left: false,
            text: 'I can help you look for it.',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.grandpa,
            left: true,
            text: 'Hmmph.',
            choices: ExitDialogueChoices,
        },
    ],

    returnToGrandpa: [
        {
            character: Assets.grandpa,
            left: true,
            text: 'Did you find it?',
            choices: () => {
                const state = State.get();
                if (state.items['pocketwatch']) {
                    return [
                        {
                            action: gotoAction('yesChoiceGrandpa'),
                            text: 'yes',
                        },
                        {
                            action: () => {
                                const state = State.get();
                                if (state.dialogue) {
                                    state.dialogue = undefined;
                                }
                            },
                            text: 'no',
                        }
                    ];
                }
                else {
                    return ExitDialogueChoices();
                }
            },
        },
    ],

    yesChoiceGrandpa: [
        {
            character: Assets.alette,
            left: false,
            text: 'I did.',
            choices: () => {
                return [
                    {
                        action: gotoAction('grandpaReaction'),
                    }
                ]
            },
        },
    ],

    grandpaReaction: [
        {
            character: Assets.grandpa,
            left: true,
            text: 'Oh, thank you, Alette! I guess you kids aren’t so bad after all.\nYour grandma would be proud.',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.alette,
            left: false,
            text: 'Where is Grandma?',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.grandpa,
            left: true,
            text: 'She ventured out of the graveyard, despite mine and The\nGloom’s wishes. I know she’ll come back; she must have lost\ntrack of time.',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.alette,
            left: false,
            text: 'What’s up with The Gloom, anyways? I need to get home but\nhe won’t let me leave.',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.grandpa,
            left: true,
            text: 'Hrmph, The Gloom. I ain’t afraid of him! He sure is\nmaddening, though.',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.alette,
            left: false,
            text: 'Well I best be going.',
            choices: ExitDialogueChoices,
        },
    ],

    //
    // SISTER
    //
    meetSister: [
        {
            character: Assets.alette,
            left: false,
            text: 'Camilla? You poor thing, you died too young. I heard you have\nthe key. I’d really like to go home to our family, would you let\nme borrow it, please?',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.sister,
            left: true,
            text: 'Alette!\nNo, my key! You must stay here, and spend time with me!\nOur mother is gone, of her I was fond.\nWithout her I’m scared of what lingers beyond.',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.alette,
            left: false,
            text: 'Wait here, I’ll see if I can find her.',
            choices: ExitDialogueChoices,
        },
    ],

    returnToSister: [
        {
            character: Assets.sister,
            left: true,
            text: 'Did you find her?',
            choices: () => {
                const state = State.get();
                if (state.items['mothersCharm']) {
                    return [
                        {
                            action: gotoAction('yesChoiceSister'),
                            text: 'yes',
                        },
                        {
                            action: () => {
                                const state = State.get();
                                if (state.dialogue) {
                                    state.dialogue = undefined;
                                }
                            },
                            text: 'no',
                        }
                    ]
                }
                else {
                    return ExitDialogueChoices();
                }
            },
        },
    ],

    yesChoiceSister: [
        {
            character: Assets.alette,
            left: false,
            text: 'Camilla, mother isn’t here, but I found this locket that\nbelonged to her. Maybe this will give you some comfort.',
            choices: () => {
                return [
                    {
                        action: gotoAction('sisterReaction'),
                    },
                ]
            },
        },
    ],

    sisterReaction: [
        {
            character: Assets.sister,
            left: true,
            text: 'Oh Alette, I should have known.\nIt breaks my heart to feel alone.',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.alette,
            left: false,
            text: 'It will be okay, Camilla. My children must also be feeling alone\nright now. I need the key so I can go home to them. You can\nstay here until you are ready to move on, but I can’t stay here\nany longer.',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.sister,
            left: true,
            text: 'No one should feel alone.\nHere, take the key, but it’s only a loan.',
            choices: ExitDialogueChoices,
        },
    ],

    //
    // GLOOM
    //
    meetGloom: [
        {
            character: Assets.gloom,
            left: true,
            text: 'Why are you leaving so soon? Where are you off to?',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.alette,
            left: false,
            text: 'Who are you? I need to go home.',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.gloom,
            left: true,
            text: 'You are home.',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.alette,
            left: false,
            text: 'I have to get back to my family.',
            choices: ExitDialogueChoices,
        },
    ],

    returnToGloom: [
        {
            character: Assets.gloom,
            left: true,
            text: 'You are persistent, aren’t you? Well, you won’t escape without\na key, and that key is protected by Camilla. I wouldn’t cross\nCamilla, if I were you!',
            choices: ExitDialogueChoices,
        },
    ],

    leaveGloom: [
        {
            character: Assets.gloom,
            left: true,
            text: 'Alette, please don’t go. This is where you belong, we can stay\nhere together!',
            choices: ContinueDialogueChoices,
        },
        {
            character: Assets.alette,
            left: false,
            text: 'I belong with my family.',
            choices: ExitDialogueChoices,
        },
    ],

    noKey: [
        {
            character: Assets.alette,
            left: false,
            text: 'The gate is locked. I need a key.',
            choices: ExitDialogueChoices,
        }
    ]

} as Script;