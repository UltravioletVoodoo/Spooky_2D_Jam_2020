import Config from './Config';

const StateKey = 'state';

export interface State {
    level: { x: number, y: number };
    player: { x: number, y: number };
    wokenUp: boolean,
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
    visited: {
        [name: string]: boolean,
    },
    items: { dogtags: number, pocketwatch: number, mothersCharm: number, key: number }; //0=do not have, 1=seen, 2=has
    dialogue?: {
        scriptKey: string,
        index: number,
    },
}

function createDefaultState(): State {
    return {
        level: { x: 0, y: 1 },
        player: { x: 1050, y: 525 },
        wokenUp: false,
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
        visited: {
            aunt: false,
            grandpa: false,
            sister: false,
        },
        items: { dogtags: 0, pocketwatch: 0, mothersCharm: 0, key: 0 },
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

    reset() {
        this.state = createDefaultState();
    }

}

export default new StateManager();