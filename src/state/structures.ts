import { IAction, IStructure } from "../types"

const PREFIX = "structure:";

export default {
    INITIAL_STATE: [],

    reducer(state: IStructure[], action: IAction): IStructure[] {
        const { type } = action;
        if (!type.startsWith(PREFIX)) return state;

        const command = action.type.substr(PREFIX.length);
        switch (command) {
            case "set": return set(state, action.structures);
            case "add": return add(state, action.structure);
            case "update": return update(state, action.structure);
            default: throw Error(`Unknown action "${type}"!`);
        }
    },

    setStructures(structures: IStructure[]): IAction {
        return { type: "structure:set", structures };
    },

    addStructure(structure: IStructure): IAction {
        return { type: "structure:add", structure };
    },

    updateStructure(structure: IStructure): IAction {
        return { type: "structure:update", structure };
    }
}

function set(state: IStructure[], structures: IStructure[]): IStructure[] {
    return structures.slice();
}

function add(state: IStructure[], structure: IStructure): IStructure[] {
    const newState = state.slice();
    newState.push(structure);
    return newState;
}

function update(state: IStructure[], structure: IStructure): IStructure[] {
    return state.map(
        item => item.id === structure.id ? Object.assign(item, structure) : item);
}
