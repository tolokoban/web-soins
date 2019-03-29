/**
 * The full state of the application is stored and managed here.
 */
import { createStore } from 'redux'
import * as UserState from "./user"

const REDUCERS: { [name: string]: any } = {
    user: UserState.reducer
}

export interface IGlobalState {
    user?: UserState.IUserState;
}

export interface IAction {
    type: string;
    [key: string]: any;
}

const INITIAL_STATE: IGlobalState = {};

function reducer(state: IGlobalState | undefined = INITIAL_STATE, action: IAction): IGlobalState {
    const newState: IGlobalState = {};
    for (const attName of Object.keys(REDUCERS)) {
        const subReducer = REDUCERS[attName];
        newState[attName] = subReducer(state[attName], action);
    }
    return newState;
}

function dispatch(action: IAction) {
    gStore.dispatch(action);
}

const gStore = createStore(reducer);

export const User = new UserState.Actions(dispatch);
