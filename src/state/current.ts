import { IAction, IStateCurrent } from "../types"

const PREFIX = "current:"
const INITIAL_STATE: IStateCurrent = {}

export default {
    INITIAL_STATE,

    reducer(state: IStateCurrent, action: IAction): IStateCurrent {
        const { type } = action
        if (!type.startsWith(PREFIX)) return state

        const command = action.type.substr(PREFIX.length)
        switch (command) {
            case "set": return set(state, action.current)
            default: throw Error(`Unknown action "${type}"!`)
        }
    },

    set(current: IStateCurrent): IAction {
        return { type: "current:set", current }
    }
}

function set(state: IStateCurrent, current: IStateCurrent): IStateCurrent {
    return {
        ...state,
        ...current
    }
}
