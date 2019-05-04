import { IAction, ICareCenter, ICareCenterState } from "../types"

const PREFIX = "carecenter:";

export default {
    INITIAL_STATE: [],

    reducer(state: ICareCenterState, action: IAction):ICareCenterState {
        const { type } = action;
        if (!type.startsWith(PREFIX)) return state;

        const command = action.type.substr(PREFIX.length);
        switch( command ) {
            case "add": return add( state, action.carecenter );
            case "update": return update( state, action.carecenter );
            default: throw Error(`Unknown action "${type}"!`);
        }
    },

    addCareCenter(carecenter: string): IAction {
        return { type: "carecenter:add", carecenter };
    },

    updateCareCenter(carecenter: string): IAction {
        return { type: "carecenter:update", carecenter };
    }
}


function add(state: ICareCenterState, carecenter: ICareCenter):ICareCenterState {
    const newState = state.slice();
    newState.push( carecenter );
    return newState;
}


function update(state: ICareCenterState, carecenter: ICareCenter):ICareCenterState {
    return state.map(
        item => item.id === carecenter.id ? Object.assign( item, carecenter ) : item );
}
