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
    items: { dogtags: false, pocketwatch: false, locket: false, keys: false };
    dialogue?: {
        scriptKey: string,
        index: number,
    },
}

function createDefaultState(): State {
    return {
        level: { x: 0, y: 0 },
        player: { x: Config.scale.width / 2, y: Config.scale.height / 2 },
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
        items: { dogtags: false, pocketwatch: false, locket: false, keys: false },

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