import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import * as State from "./state"
import Intl from "./tfw/intl";

import App from "./App";

export default function(user) {
    const root = document.getElementById("root");
    ReactDOM.render(
        <Provider store={State.store}><App /></Provider>,
        root);
    State.User.setLanguage(Intl.lang);
    State.User.setNickname(user.nickname);
}
