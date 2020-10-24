import Config from './Config';

export interface State {
    level: { x: number, y: number };
}

const DefaultState: State = {
    level: { x: 0, y: 0 },
}

const StateKey = 'state';
let state: State? = null;

export function get(): State {
    if (!state) {
        load();
    }
    return state as State;
}

export function load() {
    state = JSON.parse(localStorage.getItem(StateKey) || JSON.stringify(DefaultState)) as State;
}

export function save() {
    localStorage.setItem(StateKey, JSON.stringify(state));
}

export default {
    get,
    load,
    save,
    DefaultState,
};