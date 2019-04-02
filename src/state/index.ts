/**
 * The full state of the application is stored and managed here.
 */
import { createStore } from 'redux'
import * as UserState from "./user";

export interface IGlobalState {
    user?: UserState.IUserState;
}

export interface IAction {
    type: string;
    [key: string]: any;
}

function dispatch(action: IAction) {
    store.dispatch(action);
}

const INITIAL_STATE: IGlobalState = {
    user: UserState.INITIAL_STATE
};

function reducer(state: IGlobalState | undefined = INITIAL_STATE, action: IAction): IGlobalState {
    console.log("state =", state);
    return {
        user: UserState.reducer(state.user, action)
    };
}

export const User = new UserState.Actions(dispatch);


export const store = createStore(reducer);
