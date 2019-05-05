import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import State from "./state"
import Intl from "./tfw/intl";
import { IUser } from "./types"

import App from "./App";

export default function(user: IUser) {
    const root = document.getElementById("root");
    ReactDOM.render(
        <Provider store={State.store}><App user={user} /></Provider>,
        root);
    State.dispatch(State.User.setLanguage(Intl.lang));
    State.dispatch(State.User.setNickname(user.nickname));
}
