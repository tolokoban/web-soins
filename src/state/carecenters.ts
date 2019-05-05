import { IAction, ICarecenter } from "../types"

const PREFIX = "carecenter:";

export default {
    INITIAL_STATE: [],

    reducer(state: ICarecenter[], action: IAction): ICarecenter[] {
        const { type } = action;
        if (!type.startsWith(PREFIX)) return state;

        const command = action.type.substr(PREFIX.length);
        switch (command) {
            case "add": return add(state, action.carecenter);
            case "update": return update(state, action.carecenter);
            default: throw Error(`Unknown action "${type}"!`);
        }
    },

    addCarecenter(carecenter: string): IAction {
        return { type: "carecenter:add", carecenter };
    },

    updateCarecenter(carecenter: string): IAction {
        return { type: "carecenter:update", carecenter };
    }
}


function add(state: ICarecenter[], carecenter: ICarecenter): ICarecenter[] {
    const newState = state.slice();
    newState.push(carecenter);
    return newState;
}


function update(state: ICarecenter[], carecenter: ICarecenter): ICarecenter[] {
    return state.map(
        item => item.id === carecenter.id ? Object.assign(item, carecenter) : item);
}
