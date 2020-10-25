import Config from './Config';

const StateKey = 'state';

export interface State {
    level: { x: number, y: number };
    player: { x: number, y: number };
    up: boolean,
    down: boolean,
    left: boolean,
    right: boolean,
    enter: boolean,
    back: boolean,
    direction: Phaser.Math.Vector2,
    releasedEnter: boolean,
    releasedUp: boolean,
    releasedDown: boolean,
    inTransition: boolean,
    sprint: boolean,
    sprintTime: number,
    items: { dogtags: boolean, pocketwatch: boolean, mothersCharm: boolean, key: boolean };
    dialogue?: {
        scriptKey: string,
        index: number,
    },
}

function createDefaultState(): State {
    return {
        level: { x: 0, y: 1 },
        player: { x: 1050, y: 525 },
        up: false,
        down: false,
        left: false,
        right: false,
        enter: false,
        back: false,
        releasedEnter: false,
        releasedUp: false,
        releasedDown: false,
        direction: new Phaser.Math.Vector2(0, 0),
        inTransition: false,
        sprint: false,
        sprintTime: 0,
        items: { dogtags: false, pocketwatch: false, mothersCharm: false, key: true },

        /* temp */
        dialogue: {
            scriptKey: 'testScene',
            index: 0,
        },
    };
}

class StateManager {

    private state!: State;

    constructor() {
        this.load();
    }

    get() {
        return this.state;
    }

    load() {
        const jsonState = localStorage.getItem(StateKey);
        if (jsonState == null) {
            this.state = createDefaultState();
        } else {
            this.state = JSON.parse(jsonState);
        }
    }

    save() {
        localStorage.setItem(StateKey, JSON.stringify(this.state));
    }

}

export default new StateManager();