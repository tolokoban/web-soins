/**
 * The full state of the application is stored and managed here.
 */
import { createStore } from 'redux'
import User from "./user";
import Organization from "./organization"
import CareCenter from "./care-center"
import { IState, IAction } from "../types"

function dispatch(action: IAction) {
    store.dispatch(action);
}

const INITIAL_STATE: IState = {
    user: User.INITIAL_STATE
};

function reducer(state: IState | undefined = INITIAL_STATE, action: IAction): IState {
    console.log("state =", state);
    return {
        user: User.reducer(state.user, action)
    };
}

const store = createStore(reducer);

export default {
    store, dispatch,
    User
}
